import React from 'react'
import { IconContext } from 'react-icons'
import { BiFootball } from 'react-icons/bi'

export type BallState = {
  r: number,
  cx: number,
  cy: number,
  isBeingDragged: boolean
}

export type BallProps = {
  ballState: BallState,
  setBallState: Function
}

const Ball: React.FC<BallProps> = (props) => {
  const {ballState, setBallState} = props
  return (
    <IconContext.Provider value={{ color: "black", size: `${ballState.r}px` }}>
        <g 
            transform={`translate(${ballState.cx} ${ballState.cy})`}
            onMouseDown={() => {setBallState({...ballState, isBeingDragged: true})}}
            onMouseUp={() => {setBallState({...ballState, isBeingDragged: false})}}
            onMouseOut={() => {setBallState({...ballState, isBeingDragged: false})}}
            onMouseMove={(e) => {
                if (ballState.isBeingDragged) {
                  setBallState({...ballState, cx: e.nativeEvent.offsetX - (ballState.r * .5), cy: e.nativeEvent.offsetY - (ballState.r * .5)})
                }
            }}
        >
            <circle 
                r={ballState.r * .5}
                cx={(ballState.r * .5)}
                cy={(ballState.r * .5)}
                fill={'white'}
            />
            <BiFootball />
        </g>
    </IconContext.Provider>
  )
}

export default Ball