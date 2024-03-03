import { Group } from '@visx/group';
import React from 'react'

export type PlayerGroupProps = {
  d: {name: string, radius: number, isNameShowing: boolean | undefined},
  x: number,
  dx: number,
  y: number,
  dy: number,
  isDragging: boolean,
  dragMove: any,
  dragStart: any,
  dragEnd: any,
  isShowingName: Function,
  homeColorScale: Function
}

const PlayerGroup: React.FC<PlayerGroupProps> = (props) => {
  const {d, isDragging, dragEnd, dragMove, dragStart, isShowingName, homeColorScale, x, y, dx, dy} = props
  return (
      <Group>
      <circle
          key={`dot-${d.name}`}
          cx={x}
          cy={y}
          r={isDragging ? d.radius + 1 : d.radius}
          fill={isDragging ? 'url(#stroke)' : homeColorScale(d.name)}
          transform={`translate(${dx}, ${dy})`}
          fillOpacity={0.9}
          stroke={isDragging ? 'white' : 'transparent'}
          strokeWidth={2}
          onMouseMove={dragMove}
          onMouseUp={dragEnd}
          onMouseDown={dragStart}
          onTouchStart={dragStart}
          onTouchMove={dragMove}
          onTouchEnd={dragEnd}
          onMouseOver={() => isShowingName(d, true)}
          onMouseOut={() => isShowingName(d, false)}
      />
      {d.isNameShowing && <text 
          x={x} 
          y={y !== undefined ? y + d.radius * 2.5 : 0}
          dominantBaseline={'middle'}
          textAnchor={'middle'}
          transform={`translate(${dx}, ${dy})`}
          onMouseMove={dragMove}
          onMouseUp={dragEnd}
          onMouseDown={dragStart}
          onTouchStart={dragStart}
          onTouchMove={dragMove}
          onTouchEnd={dragEnd}
          cursor={'pointer'}
          fill={'white'}
      >
          {d.name}
      </text>}
    </Group>
  )
}

export default PlayerGroup