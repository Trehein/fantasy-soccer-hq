import { ScaleSVG } from '@visx/responsive'
import React, { useEffect, useMemo, useState } from 'react'
import HeadToHeadPitchLineGroup from './HeadToHeadPitchLineGroup'
import { playerData, PlayerInfo } from '../../data/playerData'
import { TeamEnum } from '../../data/TeamEnum'
import { scaleOrdinal } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { Drag, raise } from '@visx/drag';
import { Group } from '@visx/group';

export type HeadToHeadChartProps = {
    width: number,
    awayTeam: TeamEnum,
    homeTeam: TeamEnum
}

const colors = [
    '#025aac',
    '#02cff9',
    '#02efff',
    '#03aeed',
    '#0384d7',
    '#edfdff',
    '#ab31ff',
    '#5924d7',
    '#d145ff',
    '#1a02b1',
    '#e582ff',
    '#ff00d4',
    '#270eff',
    '#827ce2',
  ];

const HeadToHeadChart: React.FC<HeadToHeadChartProps> = (props) => {
    const { width, awayTeam, homeTeam } = props
    const height = width * (2/3)

    const starterBall = {
        r: 5,
        x: width * .5,
        y: height * .5
    }

    const getPlayers = (club: TeamEnum) => {
        return playerData.filter((player: PlayerInfo) => { 
                return player.club === club
            })
    }

    const mapAwayPlayerLocations = (players: Array<PlayerInfo>) => {
        const mappedPlayers = players.map((player: PlayerInfo, i: number) => {
            return {
                ...player,
                x: width * .85,
                y: height * .15 + i * (height * 0.15)
            }
        })
        return mappedPlayers
    }

    const mapHomePlayerLocations = (players: Array<PlayerInfo>) => {
        const mappedPlayers = players.map((player: PlayerInfo, i: number) => {
            return {
                ...player,
                radius: height * .015,
                x: width * .15,
                y: height * .04 + i * (height * .04)
            }
        })
        return mappedPlayers
    }

    const [homePlayers, setHomePlayers] = useState(mapHomePlayerLocations(getPlayers(homeTeam)))
    const [awayPlayers, setAwayPlayers] = useState(mapAwayPlayerLocations(getPlayers(awayTeam)))
    const [ball, setBall] = useState([starterBall])

    const homeColorScale = useMemo(
        () =>
          scaleOrdinal({
            range: colors,
            domain: homePlayers.map((d) => d.name),
          }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [width, height],
      );

    useEffect(() => {
        setAwayPlayers(mapAwayPlayerLocations(getPlayers(awayTeam)))
        setHomePlayers(mapHomePlayerLocations(getPlayers(homeTeam)))
    }, [height])

    console.log(homePlayers)
    console.log(awayPlayers)
    return (
        height !== undefined ? 

        <ScaleSVG
            height={height}
            width={width}
        >
            <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />
            <rect 
                x={0}
                y={0}
                fill={'green'}
                height={height}
                width={width}
            />
            <HeadToHeadPitchLineGroup 
                height={height}
                width={width}
            />
            {homePlayers.map((d, i) => (
                <Drag
                    key={`drag-${d.name}`}
                    width={width}
                    height={height}
                    x={d.x}
                    y={d.y}
                    onDragStart={() => {

                    setHomePlayers(raise(homePlayers, i));
                    }}
                >
                    {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
                        <Group>
                            <circle
                                key={`dot-${d.name}`}
                                cx={x}
                                cy={y}
                                r={isDragging ? d.radius + 1 : d.radius}
                                fill={isDragging ? 'url(#stroke)' : homeColorScale(d.name)}
                                transform={`translate(${dx}, ${dy})`}
                                fillOpacity={0.9}
                                stroke={isDragging ? 'white' : 'transparent'}
                                strokeWidth={2}
                                onMouseMove={dragMove}
                                onMouseUp={dragEnd}
                                onMouseDown={dragStart}
                                onTouchStart={dragStart}
                                onTouchMove={dragMove}
                                onTouchEnd={dragEnd}
                            />
                            <text 
                                x={x} 
                                y={y !== undefined ? y + d.radius * 2.5 : 0}
                                dominantBaseline={'middle'}
                                textAnchor={'middle'}
                                transform={`translate(${dx}, ${dy})`}
                                onMouseMove={dragMove}
                                onMouseUp={dragEnd}
                                onMouseDown={dragStart}
                                onTouchStart={dragStart}
                                onTouchMove={dragMove}
                                onTouchEnd={dragEnd}
                                cursor={'pointer'}
                                fill={'white'}
                            >
                                {d.name}
                            </text>
                        </Group>
                    )}
                </Drag>
            ))}
        </ScaleSVG>
        :
        <></>
    )
}

export default HeadToHeadChart