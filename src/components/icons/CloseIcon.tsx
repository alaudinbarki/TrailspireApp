import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
    width?: number;
    height?: number;
    color?: string;
}

export const CloseIcon: React.FC<Props> = ({
    width = 18,
    height = 18,
    color = '#F2F2F2',
}) => (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
        <Path
            d="M16.7938 2.65166L2.65165 16.7938C2.16846 17.277 1.36707 17.277 0.883883 16.7938C0.400694 16.3106 0.400694 15.5092 0.883883 15.026L15.026 0.883893C15.5092 0.400704 16.3106 0.400704 16.7938 0.883893C17.277 1.36708 17.277 2.16847 16.7938 2.65166Z"
            fill={color}
        />
        <Path
            d="M16.7938 16.7938C16.3106 17.277 15.5092 17.277 15.026 16.7938L0.883883 2.65171C0.400694 2.16852 0.400694 1.36713 0.883883 0.883939C1.36707 0.400749 2.16846 0.400749 2.65165 0.883939L16.7938 15.0261C17.277 15.5093 17.277 16.3107 16.7938 16.7938Z"
            fill={color}
        />
    </Svg>
);