import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

/**
 * iOS-style navigation/location arrow icon.
 * Figma node 1:3369 "Play" – 31×19 rotated -42.75deg.
 * Used on the map banner top-left.
 */
export const NavigationArrowIcon: React.FC<Props> = ({
  width = 31,
  height = 19,
  color = '#007AFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 31 19" fill="none">
    <Path
      d="M15.5 0L31 19L15.5 13.5L0 19L15.5 0Z"
      fill={color}
    />
  </Svg>
);
