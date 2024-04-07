import React from 'react'
import SingleSidePitchLineGroup from './SingleSidePitchLineGroup'

export type SingleSidedChartProps = {
  height: number,
}

const SingleSidedChart: React.FC<SingleSidedChartProps> = (props) => {
  const {height} = props
  const width = height * .66

  return (
    <svg
      height={height}
      width={width}
    >
      <rect 
        x={0}
        y={0}
        fill={'#00a330'}
        height={height}
        width={width}
      />
      <SingleSidePitchLineGroup height={height} width={width}/>
    </svg>
  )
}

export default SingleSidedChart