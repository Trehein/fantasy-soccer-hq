import { ParentSize } from '@visx/responsive'
import React from 'react'
import HeadToHeadChart from './HeadToHeadChart'
import { TeamEnum } from '../../data/TeamEnum'

export type HeadToHeadChartControllerProps = {
    homeTeam: TeamEnum,
    awayTeam: TeamEnum
}

const HeadToHeadChartController: React.FC<HeadToHeadChartControllerProps> = (props) => {
    const { awayTeam, homeTeam } = props

    return (
        <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth }) => (
                <HeadToHeadChart
                    width={visWidth}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                />
            )}
        </ParentSize> 
        )
}

export default HeadToHeadChartController