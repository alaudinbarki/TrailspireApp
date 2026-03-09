import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const SCALE_X_KEYS = new Set([
    'width',
    'minWidth',
    'maxWidth',
    'left',
    'right',
    'marginLeft',
    'marginRight',
    'paddingLeft',
    'paddingRight',
    'paddingHorizontal',
    'translateX',
    'columnGap',
]);

const SCALE_Y_KEYS = new Set([
    'height',
    'minHeight',
    'maxHeight',
    'top',
    'bottom',
    'marginTop',
    'marginBottom',
    'paddingTop',
    'paddingBottom',
    'paddingVertical',
    'translateY',
]);

const UNIFORM_SCALE_KEYS = new Set([
    'gap',
    'rowGap',
    'margin',
    'marginHorizontal',
    'padding',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'fontSize',
    'lineHeight',
    'letterSpacing',
    'shadowRadius',
]);

const NON_SCALED_NUMERIC_KEYS = new Set([
    'flex',
    'flexGrow',
    'flexShrink',
    'opacity',
    'zIndex',
    'elevation',
    'fontWeight',
    'aspectRatio',
    'shadowOpacity',
]);

let globalScaleEnabled = false;

const getScales = () => {
    const { width, height } = Dimensions.get('window');
    const sx = width / BASE_WIDTH;
    const sy = height / BASE_HEIGHT;
    const su = Math.min(sx, sy);
    return { sx, sy, su };
};

const round = (value: number) => PixelRatio.roundToNearestPixel(value);

const scaleNumericValue = (key: string, value: number) => {
    if (NON_SCALED_NUMERIC_KEYS.has(key)) {
        return value;
    }

    const { sx, sy, su } = getScales();

    if (SCALE_X_KEYS.has(key)) {
        return round(value * sx);
    }

    if (SCALE_Y_KEYS.has(key)) {
        return round(value * sy);
    }

    if (UNIFORM_SCALE_KEYS.has(key)) {
        return round(value * su);
    }

    return value;
};

const scaleShadowOffset = (value: unknown) => {
    if (!value || typeof value !== 'object') {
        return value;
    }

    const offset = value as { width?: number; height?: number };
    const { sx, sy } = getScales();

    return {
        width: typeof offset.width === 'number' ? round(offset.width * sx) : offset.width,
        height: typeof offset.height === 'number' ? round(offset.height * sy) : offset.height,
    };
};

const scaleStyleObject = (style: unknown): unknown => {
    if (Array.isArray(style)) {
        return style.map((entry) => scaleStyleObject(entry));
    }

    if (!style || typeof style !== 'object') {
        return style;
    }

    const output: Record<string, unknown> = {};

    Object.entries(style as Record<string, unknown>).forEach(([key, value]) => {
        if (key === 'transform' && Array.isArray(value)) {
            output[key] = value.map((transformItem) => {
                if (!transformItem || typeof transformItem !== 'object') {
                    return transformItem;
                }

                const itemEntries = Object.entries(transformItem);
                if (itemEntries.length !== 1) {
                    return transformItem;
                }

                const [transformKey, transformValue] = itemEntries[0];
                if (typeof transformValue !== 'number') {
                    return transformItem;
                }

                const scaledValue = scaleNumericValue(transformKey, transformValue);
                return { [transformKey]: scaledValue };
            });
            return;
        }

        if (key === 'shadowOffset') {
            output[key] = scaleShadowOffset(value);
            return;
        }

        if (typeof value === 'number') {
            output[key] = scaleNumericValue(key, value);
            return;
        }

        output[key] = value;
    });

    return output;
};

export const enableGlobalStyleScaling = () => {
    if (globalScaleEnabled) {
        return;
    }

    const originalCreate = StyleSheet.create;

    StyleSheet.create = ((styles: Record<string, unknown>) => {
        const scaledStyles: Record<string, unknown> = {};

        Object.entries(styles).forEach(([styleName, styleValue]) => {
            scaledStyles[styleName] = scaleStyleObject(styleValue);
        });

        return originalCreate(scaledStyles as never);
    }) as typeof StyleSheet.create;

    globalScaleEnabled = true;
};

export const scaleWidth = (value: number) => round(value * getScales().sx);
export const scaleHeight = (value: number) => round(value * getScales().sy);
export const scaleUniform = (value: number) => round(value * getScales().su);
