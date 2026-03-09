import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface Props {
    width?: number;
    height?: number;
}

export const SelectedCircleSvg: React.FC<Props> = ({
    width = 43,
    height = 43,
}) => {
    const scaleX = width / 43;
    const scaleY = height / 43;
    const cx = 21.5 * scaleX;
    const cy = 21.5 * scaleY;

    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
            <Circle cx={cx} cy={cy} r={21.5 * scaleX} fill="#007AFF" fillOpacity={0.05} />
            <Circle cx={cx} cy={cy} r={16.5 * scaleX} fill="#007AFF" fillOpacity={0.2} />
            <Circle cx={cx} cy={cy} r={11.5 * scaleX} fill="#007AFF" fillOpacity={0.5} />
            <Circle cx={cx} cy={cy} r={7.5 * scaleX} fill="#007AFF" fillOpacity={0.8} />
        </Svg>
    );
};
