import { ParentSize } from '@visx/responsive'
import React from 'react'
import HeadToHeadChart from './HeadToHeadChart'

const HeadToHeadChartController: React.FC = () => {
    return (
        <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth }) => (
                <HeadToHeadChart
                    width={visWidth} 
                />
            )}
        </ParentSize> 
        )
}

export default HeadToHeadChartController