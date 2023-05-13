import { ScaleSVG } from '@visx/responsive'
import React from 'react'
import HeadToHeadPitchLineGroup from './HeadToHeadPitchLineGroup'

export type HeadToHeadChartProps = {
    width: number
}

const HeadToHeadChart: React.FC<HeadToHeadChartProps> = (props) => {
    const { width } = props
    const height = width * (2/3)

    return (
        <ScaleSVG
            height={height}
            width={width}
        >
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
        </ScaleSVG>
    )
}

export default HeadToHeadChart