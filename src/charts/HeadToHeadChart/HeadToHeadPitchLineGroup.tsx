import { Group } from '@visx/group'
import { Arc } from '@visx/shape';
import React from 'react'

export type HeadToHeadPitchLineGroupProps = {
    height: number,
    width: number
}

const HeadToHeadPitchLineGroup: React.FC<HeadToHeadPitchLineGroupProps> = (props) => {
    const { height, width } = props
    const pitchHeight = height * .7
    const margin = {
      top: height * .15,
      left: width * .15,
    };
    const cornerRadius = width * .0165

    return (
        <Group top={margin.top} left={margin.left}>
            {/* bounds */}
            <rect
                x={0}
                y={0}
                height={pitchHeight}
                width={width - margin.left * 2}
                stroke={'white'}
                strokeWidth={3}
                fill={'none'}
            />
            {/* half */}
            <line
                x1={width * .5 - margin.left}
                y1={0}
                x2={width * .5 - margin.left}
                y2={pitchHeight}
                stroke={'white'}
                strokeWidth={3}
            />
            {/* kickoff circle */}
            <circle
                cx={width * .5 - margin.left}
                cy={pitchHeight * .5}
                fill={'white'}
                r={pitchHeight * .01}
            />
            {/* center circle */}
            <circle
                cx={width * .5 - margin.left}
                cy={pitchHeight * .5}
                fill={'none'}
                stroke={'white'}
                strokeWidth={3}
                r={pitchHeight * .15}
            />
            {/* right goal area*/}
            <rect
                x={width - margin.left * 2 - width * .04}
                y={pitchHeight * .325}
                height={pitchHeight - (pitchHeight * .325 * 2)}
                width={width * .04}
                stroke={'white'}
                strokeWidth={3}
                fill={'none'}
            />
            {/* right penalty area*/}
            <rect
                x={width - margin.left * 2 - width * .115}
                y={pitchHeight * .175}
                height={pitchHeight - (pitchHeight * .175 * 2)}
                width={width * .115}
                stroke={'white'}
                strokeWidth={3}
                fill={'none'}
            />
            {/* right penalty spot */}
            <circle
                fill={'white'}
                r={pitchHeight * .0075}
                cx={width - margin.left * 2 - width * .075}
                cy={pitchHeight * .5}
            />
            {/* left penalty area*/}
            <rect
                x={0}
                y={pitchHeight * .175}
                height={pitchHeight - (pitchHeight * .175 * 2)}
                width={width * .115}
                stroke={'white'}
                strokeWidth={3}
                fill={'none'}
            />
            {/* left goal area*/}
            <rect
                x={0}
                y={pitchHeight * .325}
                height={pitchHeight - (pitchHeight * .325 * 2)}
                width={width * .04}
                stroke={'white'}
                strokeWidth={3}
                fill={'none'}
            />
            {/* left penalty spot */}
            <circle
                fill={'white'}
                r={pitchHeight * .0075}
                cx={width * .075}
                cy={pitchHeight * .5}
            />
            {/* top left corner */}
            <path d={`M ${cornerRadius} 0 
                A ${cornerRadius} ${cornerRadius} 0 0 1 0 ${cornerRadius}`
            } stroke="white" fill='none' strokeWidth={2}

            />
            {/* top right corner */}
            <Group left={width - margin.left * 2}>
                <Arc
                startAngle={3.1}
                endAngle={4.65}
                outerRadius={cornerRadius}
                innerRadius={cornerRadius}
                padAngle={0}
                cornerRadius={0}
                fill={"none"}
                stroke={'white'}
                strokeWidth={2}
                />
            </Group>
            {/* bottom left corner */}
            <Group top={pitchHeight}>
                <Arc
                startAngle={0}
                endAngle={1.5}
                outerRadius={cornerRadius}
                innerRadius={cornerRadius}
                padAngle={0}
                cornerRadius={0}
                fill={"none"}
                stroke={'white'}
                strokeWidth={2}
                />
            </Group>
            {/* bottom right corner */}
            <Group top={pitchHeight} left={width - margin.left * 2}>
                <Arc
                startAngle={0}
                endAngle={-1.5}
                outerRadius={cornerRadius}
                innerRadius={cornerRadius}
                padAngle={0}
                cornerRadius={0}
                fill={"none"}
                stroke={'white'}
                strokeWidth={2}
                />
            </Group>
        </Group>
    )
}

export default HeadToHeadPitchLineGroup