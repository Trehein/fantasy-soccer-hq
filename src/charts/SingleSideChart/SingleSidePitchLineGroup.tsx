import React from 'react'
import { Group } from '@visx/group'
import { Arc } from '@visx/shape';

export type SingleSidePitchLineGroupProps = {
  height: number,
  width: number
}

const SingleSidePitchLineGroup: React.FC<SingleSidePitchLineGroupProps> = (props) => {
  const { height, width } = props

  console.log('height', height)
  console.log('width', width)

  const pitchHeight = height * .96
  const margin = {
    top: height * .02,
    left: width * .03,
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
          strokeWidth={2.5}
          fill={'none'}
      />
      {/* half */}
      <line
          x1={0}
          y1={height * .5 - margin.top * .5}
          x2={width - margin.left * 2}
          y2={height * .5 - margin.top * .5}
          stroke={'white'}
          strokeWidth={2.5}
      />
      {/* kickoff circle */}
      <circle
          cx={width * .5 - margin.left}
          cy={pitchHeight * .5 + margin.top * .5}
          fill={'white'}
          r={pitchHeight * .0075}
      />
      {/* center circle */}
      <circle
          cx={width * .5 - margin.left}
          cy={pitchHeight * .5 + margin.top * .5}
          fill={'none'}
          stroke={'white'}
          strokeWidth={2.5}
          r={pitchHeight * .1}
      />
      {/* top goal area*/}
      <rect
        x={width * .5 - margin.left - (width * .1)}
        y={0}
        height={pitchHeight * .06}
        width={width * .2}
        stroke={'white'}
        strokeWidth={2.5}
        fill={'none'}
      />
      {/* top goal*/}
      <rect
          x={width * .5 - margin.left - (width * .2)}
          y={0}
          height={pitchHeight * .13}
          width={width * .4}
          stroke={'white'}
          strokeWidth={3}
          fill={'none'}
      />
      {/* bottom goal area*/}
      <rect
        x={width * .5 - margin.left - (width * .1)}
        y={pitchHeight - pitchHeight * .06}
        height={pitchHeight * .06}
        width={width * .2}
        stroke={'white'}
        strokeWidth={2.5}
        fill={'none'}
      />
      {/* bottom goal*/}
      <rect
          x={width * .5 - margin.left - (width * .2)}
          y={pitchHeight - pitchHeight * .13}
          height={pitchHeight * .13}
          width={width * .4}
          stroke={'white'}
          strokeWidth={3}
          fill={'none'}
      />
      {/* top left corner */}
      <path d={`M ${cornerRadius} 0 
        A ${cornerRadius} ${cornerRadius} 0 0 1 0 ${cornerRadius}`
      } stroke="white" fill='none' strokeWidth={2} />
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

export default SingleSidePitchLineGroup