import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
    width?: number;
    height?: number;
    color?: string;
}

export const ConfirmCheckIcon: React.FC<Props> = ({
    width = 24,
    height = 16,
    color = '#D9D9D9',
}) => (
    <Svg width={width} height={height} viewBox="0 0 24 16" fill="none">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7352 14.1824C10.7507 14.1687 10.7659 14.1544 10.7808 14.1395L22.7132 2.20711C23.1037 1.81658 23.1037 1.18342 22.7132 0.792893C22.3227 0.402369 21.6895 0.402369 21.299 0.792893L9.98528 12.1066L2.20711 4.32843C1.81658 3.9379 1.18342 3.9379 0.792893 4.32843C0.402369 4.71895 0.402368 5.35212 0.792893 5.74264L9.27817 14.2279C9.6687 14.6184 10.3019 14.6184 10.6924 14.2279C10.7072 14.2131 10.7215 14.1979 10.7352 14.1824Z"
            fill={color}
            stroke={color}
            strokeLinecap="round"
        />
    </Svg>
);