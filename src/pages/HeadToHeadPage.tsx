import React from 'react'
import HeadToHeadChartController from '../charts/HeadToHeadChart/HeadToHeadChartController'

const HeadToHeadPage: React.FC = () => {
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <HeadToHeadChartController />
        </div>
    )
}

export default HeadToHeadPage