import React from 'react'
import HeadToHeadChartController from '../charts/HeadToHeadChart/HeadToHeadChartController'
import { TeamEnum } from '../data/TeamEnum'

const HeadToHeadPage: React.FC = () => {
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <HeadToHeadChartController 
                awayTeam={TeamEnum.ManchesterCity}
                homeTeam={TeamEnum.Liverpool}
            />
        </div>
    )
}

export default HeadToHeadPage