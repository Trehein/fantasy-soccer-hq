import { ScaleSVG } from '@visx/responsive'
import React, { useEffect, useMemo, useState } from 'react'
import HeadToHeadPitchLineGroup from './HeadToHeadPitchLineGroup'
import { playerData, PlayerInfo } from '../../data/playerData'
import { TeamEnum } from '../../data/TeamEnum'
import { scaleOrdinal } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { Drag, raise } from '@visx/drag';
import PlayerGroup from '../../components/PlayerGroup'
import { BiFootball } from "react-icons/bi";
import { IconContext } from "react-icons";

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

    // const starterBall = {
    //     r: 5,
    //     x: width * .5,
    //     y: height * .5
    // }

    const getPlayers = (club: TeamEnum) => {
        return playerData.filter((player: PlayerInfo) => { 
                return player.club === club
            })
    }

    const mapAwayPlayerLocations = (players: Array<PlayerInfo>) => {
        const mappedPlayers = players.map((player: PlayerInfo, i: number) => {
            return {
                ...player,
                radius: height * .015,
                x: width * .85,
                y: height * .04 + i * (height * 0.04),
                isNameShowing: false
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
                y: height * .04 + i * (height * .04),
                isNameShowing: false
            }
        })
        return mappedPlayers
    }

    const [players, setPlayers] = useState([...mapHomePlayerLocations(getPlayers(homeTeam)), ...mapAwayPlayerLocations(getPlayers(awayTeam))])
    // const [ball, setBall] = useState([starterBall])


    const homeColorScale = useMemo(
        () =>
          scaleOrdinal({
            range: colors,
            domain: players.map((d) => d.name),
          }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [width, height],
      );

    const isShowingName = (d: any, isShowing: boolean) => {
        const playerIndex = players.findIndex((player: PlayerInfo) => player.name === d.name)
        const updatedPlayers = players
        updatedPlayers[playerIndex].isNameShowing = isShowing
        setPlayers(updatedPlayers)
        return
    }

    const [ballData, setBallData] = useState({
        cx: width * .5,
        cy: height * .5,
        r: height * .04,
        isBeingDragged: false
    })

    useEffect(() => {
        setPlayers([...mapHomePlayerLocations(getPlayers(homeTeam)), ...mapAwayPlayerLocations(getPlayers(awayTeam))])
        setBallData({...ballData, cx: (width * .5) - ((height * .04) * .5), cy: (height * .5) - ((height * .04) * .5), r: height * .04})
        // eslint-disable-next-line
    }, [height, awayTeam, homeTeam])


    console.log(ballData)

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
                fill={'#00a330'}
                height={height * .5}
                width={width}
            />
            <rect
                x={0}
                y={height * .5}
                fill={'#016f27'}
                height={height * .5}
                width={width}
            />
            <HeadToHeadPitchLineGroup 
                height={height}
                width={width}
            />


            {players.map((d, i) => (
                <Drag
                    key={`drag-${d.name}`}
                    width={width}
                    height={height}
                    x={d.x}
                    y={d.y}
                    onDragStart={() => {
                        setPlayers(raise(players, i));
                    }}
                >
                    {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
                        <PlayerGroup 
                            d={{
                                name: d.name,
                                radius: isDragging ? d.radius + 1 : d.radius,
                                isNameShowing: d.isNameShowing
                            }} 
                            x={x ? x : 0} 
                            dx={dx ? dx : 0} 
                            y={y ? y : 0} 
                            dy={dy ? dy : 0} 
                            isDragging={isDragging} 
                            dragMove={dragMove} 
                            dragStart={dragStart}
                            dragEnd={dragEnd} 
                            isShowingName={isShowingName} 
                            homeColorScale={homeColorScale}                        
                        />
                    )}
                </Drag>
            ))}

            {/* ball */}
            <IconContext.Provider value={{ color: "black", size: `${ballData.r}px` }}>
                <g 
                    transform={`translate(${ballData.cx} ${ballData.cy})`}
                    onMouseDown={() => {setBallData({...ballData, isBeingDragged: true})}}
                    onMouseUp={() => {setBallData({...ballData, isBeingDragged: false})}}
                    onMouseOut={() => {setBallData({...ballData, isBeingDragged: false})}}
                    onMouseMove={(e) => {
                        if (ballData.isBeingDragged) {
                            setBallData({...ballData, cx: e.nativeEvent.offsetX - (ballData.r * .5), cy: e.nativeEvent.offsetY - (ballData.r * .5)})
                        }
                    }}
                    // x={ballData.cx}
                >
                    <circle 
                        r={ballData.r * .5}
                        cx={(ballData.r * .5)}
                        cy={(ballData.r * .5)}
                        fill={'white'}
                    />
                    <BiFootball />
                </g>
            </IconContext.Provider>
        </ScaleSVG>
        :
        <></>
    )
}

export default HeadToHeadChart