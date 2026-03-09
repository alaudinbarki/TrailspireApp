import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface Props {
    width?: number;
    height?: number;
}

export const MapIconSvg: React.FC<Props> = ({ width = 180, height = 180 }) => {
    const viewSize = 180;
    const cx = 90;
    const cy = 90;

    return (
        <Svg width={width} height={height} viewBox={`0 0 ${viewSize} ${viewSize}`} fill="none">
            <Circle cx={cx} cy={cy} r={18} fill="#1583FB" fillOpacity={0.1} />
            <Circle cx={cx} cy={cy} r={17.875} stroke="#1583FB" strokeOpacity={0.8} strokeWidth={0.25} />

            <Circle cx={cx} cy={cy} r={30.5} fill="#1583FB" fillOpacity={0.1} />
            <Circle cx={cx} cy={cy} r={30.375} stroke="#1583FB" strokeOpacity={0.8} strokeWidth={0.25} />

            <Circle cx={cx} cy={cy} r={47.5} fill="#1583FB" fillOpacity={0.1} />
            <Circle cx={cx} cy={cy} r={47.375} stroke="#1583FB" strokeOpacity={0.8} strokeWidth={0.25} />

            <Circle cx={cx} cy={cy} r={70} fill="#1583FB" fillOpacity={0.1} />
            <Circle cx={cx} cy={cy} r={69.875} stroke="#1583FB" strokeOpacity={0.8} strokeWidth={0.25} />

            <Circle cx={cx} cy={cy} r={90} fill="#1583FB" fillOpacity={0.1} />
            <Circle cx={cx} cy={cy} r={89.875} stroke="#1583FB" strokeOpacity={0.8} strokeWidth={0.25} />

            <Circle cx={cx} cy={cy} r={8} fill="#007AFF" />
        </Svg>
    );
};
