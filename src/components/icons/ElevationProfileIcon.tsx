import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  variant?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Elevation profile line graph icon - matches Figma stats overlay.
 * Shows a thin line representing elevation changes.
 * Multiple variants to match different card profiles.
 */
export const ElevationProfileIcon: React.FC<Props> = ({
  width = 87,
  height = 10,
  color = '#282828',
  variant = 1,
}) => {
  const paths: Record<number, string> = {
    // Variant 1: steady climb with dip (card 1 - Backcountry Skiing)
    1: 'M0 8 C4 7.5 8 6 12 5.5 C16 5 20 4 24 3.5 C28 3 32 2.5 36 3 C40 3.5 44 2 48 1.5 C52 1 56 0.5 60 1 C64 1.5 68 2 72 1.5 C76 1 80 1.5 84 2 L87 2.5',
    // Variant 2: U-shape valley (card 2 - Hiking)
    2: 'M0 2 C4 2.5 8 3.5 12 5 C16 6.5 20 7.5 24 8 C28 8.5 32 8.5 36 8 C40 7.5 44 6.5 48 5 C52 3.5 56 2.5 60 2 C64 1.5 68 1 72 1 C76 1 80 1.5 84 2 L87 2',
    // Variant 3: sharp peaks (card 3 - Hiking)
    3: 'M0 8 C3 7 6 5 9 6 C12 7 15 3 18 2 C21 1 24 3 27 5 C30 7 33 4 36 2 C39 0.5 42 1 45 3 C48 5 51 7 54 6 C57 5 60 3 63 2 C66 1 69 2 72 4 C75 6 78 7 81 6 C84 5 86 4 87 3',
    // Variant 4: gradual descent (card - Trail Running)
    4: 'M0 1 C6 1.5 12 2 18 2.5 C24 3 30 3.5 36 4 C42 4.5 48 5 54 5.5 C60 6 66 6.5 72 7 C78 7.5 82 8 87 8.5',
    // Variant 5: rolling hills (card - 4x4 Overlanding)
    5: 'M0 5 C5 4 10 3 15 2 C20 1 25 1.5 30 3 C35 4.5 40 6 45 7 C50 8 55 7 60 5 C65 3 70 2 75 3 C80 4 84 5 87 5.5',
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 87 10" fill="none">
      <Path
        d={paths[variant] || paths[1]}
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
