import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Concentric circles / target / radar icon - matches Figma exactly.
 * Used on map (31x31) and search button (43x43).
 * 4 circles with decreasing radius and increasing opacity.
 */
export const TargetCirclesIcon: React.FC<Props> = ({
  width = 31,
  height = 31,
  color = '#000000',
}) => {
  const cx = width / 2;
  const cy = height / 2;
  // Radii proportional to the Figma 31x31 version
  const scale = width / 31;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <Circle cx={cx} cy={cy} r={15.5 * scale} fill={color} fillOpacity={0.05} />
      <Circle cx={cx} cy={cy} r={11.8953 * scale} fill={color} fillOpacity={0.2} />
      <Circle cx={cx} cy={cy} r={8.2907 * scale} fill={color} fillOpacity={0.5} />
      <Circle cx={cx} cy={cy} r={5.40698 * scale} fill="#3F3F3F" fillOpacity={0.8} />
    </Svg>
  );
};
