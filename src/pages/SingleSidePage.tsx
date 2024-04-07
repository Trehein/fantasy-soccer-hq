import React from 'react'
import { TeamEnum } from '../data/TeamEnum'
import SingleSideChartController from '../charts/SingleSideChart/SingleSideChartController'

export const singleSidePageStyles = () => {
    return {
        singleSideChartContainer: {
        },
        pageContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }
    }
}

const SingleSidePage: React.FC = () => {
    const styles = singleSidePageStyles()


    return (
        <div style={styles.pageContainer}>
            <div style={styles.singleSideChartContainer}>
                <SingleSideChartController 
                    // awayTeam={TeamEnum.ManchesterCity}
                    // homeTeam={TeamEnum.Liverpool}
                />
            </div>
        </div>

    )
}

export default SingleSidePage