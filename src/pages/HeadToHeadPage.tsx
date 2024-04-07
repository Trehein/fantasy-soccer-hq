import React from 'react'
import HeadToHeadChartController from '../charts/HeadToHeadChart/HeadToHeadChartController'
import { TeamEnum } from '../data/TeamEnum'

export const headToHeadPageStyles = () => {
    return {
        headToHeadChartContainer: {
            width: '70%',
        },
        pageContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }
    }
}

const HeadToHeadPage: React.FC = () => {
    const styles = headToHeadPageStyles()


    return (
        <div style={styles.pageContainer}>
            <div style={styles.headToHeadChartContainer}>
                <HeadToHeadChartController 
                    awayTeam={TeamEnum.ManchesterCity}
                    homeTeam={TeamEnum.Liverpool}
                />
            </div>
        </div>

    )
}

export default HeadToHeadPage