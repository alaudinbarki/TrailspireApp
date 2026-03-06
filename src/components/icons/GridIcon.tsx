import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

/** 2x2 grid icon for the Explore tab - exact Figma match (4 rounded squares, 5px radius, ~2px gap) */
export const GridIcon: React.FC<Props> = ({
  width = 26,
  height = 26,
  color = '#007AFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 25.74 25.74" fill="none">
    <Rect x={0} y={0} width={11.88} height={11.539} rx={5} fill={color} />
    <Rect x={13.86} y={0} width={11.88} height={11.539} rx={5} fill={color} />
    <Rect x={0} y={14.2} width={11.88} height={11.539} rx={5} fill={color} />
    <Rect x={13.86} y={14.2} width={11.88} height={11.539} rx={5} fill={color} />
  </Svg>
);
