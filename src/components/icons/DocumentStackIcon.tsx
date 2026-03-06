import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Stacked documents/pages icon - exact Figma match (Union, bottom nav).
 * Shows two overlapping rounded rectangles (front page + back page).
 */
export const DocumentStackIcon: React.FC<Props> = ({
  width = 23,
  height = 26,
  color = '#FFFFFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 23.3163 26.5" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.4949 0.25C4.20185 0.25 3.96429 0.487563 3.96429 0.780612C3.96429 1.07366 4.20185 1.31122 4.4949 1.31122H19.352C20.8173 1.31122 22.0051 2.49904 22.0051 3.96429V22.0051C22.0051 22.2982 22.2427 22.5357 22.5357 22.5357C22.8288 22.5357 23.0663 22.2982 23.0663 22.0051V3.96429C23.0663 1.91294 21.4034 0.25 19.352 0.25H4.4949ZM3.43367 3.96429H17.2296C18.4018 3.96429 19.352 4.91454 19.352 6.08673V23.0663C19.352 24.2385 18.4018 25.1888 17.2296 25.1888H3.43367C2.26148 25.1888 1.31122 24.2385 1.31122 23.0663V6.08673C1.31122 4.91454 2.26148 3.96429 3.43367 3.96429ZM0.25 6.08673C0.25 4.32844 1.67538 2.90306 3.43367 2.90306H17.2296C18.9879 2.90306 20.4133 4.32844 20.4133 6.08673V23.0663C20.4133 24.8246 18.9879 26.25 17.2296 26.25H3.43367C1.67538 26.25 0.25 24.8246 0.25 23.0663V6.08673Z"
      fill={color}
      stroke={color}
      strokeWidth={0.5}
      strokeLinecap="round"
    />
  </Svg>
);
