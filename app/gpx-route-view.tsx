import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
    Path,
    Rect,
    Circle,
    Line,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    G,
} from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

/* ─── Frosted dark button background ─────────────────────────── */
function GlassBtn({
    size = 44,
    borderRadius = 15,
    children,
    style,
}: {
    size?: number | { w: number; h: number };
    borderRadius?: number;
    children?: React.ReactNode;
    style?: any;
}) {
    const w = typeof size === 'number' ? size : size.w;
    const h = typeof size === 'number' ? size : size.h;
    return (
        <View
            style={[
                {
                    width: w,
                    height: h,
                    borderRadius,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 16,
                    elevation: 6,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

/* ─── Elevation Profile Chart ────────────────────────────────── */
const CHART_W = SCREEN_W - 52; // horizontal padding
const BAR_AREA_H = 52;
const CHART_TICK_EXT = 16;

function ElevationChart() {
    const plotW = CHART_W;
    const plotH = BAR_AREA_H;
    const cursorX = plotW * 0.66;
    const cursorY = 10;
    const y100 = plotH * 0.66;
    const y200 = plotH * 0.33;
    const y300 = 0;

    const segments = [
        { x: 8, w: 58, h: 8, color: '#FDCB3B' },
        { x: 66, w: 34, h: 16, color: '#E72C29' },
        { x: 86, w: 7, h: 16, color: '#970300' },
        { x: 100, w: 38, h: 26, color: '#E72C29' },
        { x: 138, w: 10, h: 26, color: '#9EBEF1' },
        { x: 148, w: 18, h: 26, color: '#D9D9D9' },
        { x: 166, w: 8, h: 32, color: '#FDCB3B' },
        { x: 174, w: 24, h: 38, color: '#E72C29' },
        { x: 184, w: 4, h: 38, color: '#970300' },
        { x: 191, w: 2, h: 38, color: '#000000' },
        { x: 198, w: 32, h: 38, color: '#D9D9D9' },
        { x: 230, w: 45, h: 35, color: '#A3DBBC' },
    ];

    const curvePath = `
      M 0 ${plotH - 1}
      C 36 ${plotH - 5}, 76 ${plotH - 14}, 114 ${plotH - 28}
      C 130 ${plotH - 34}, 146 ${plotH - 34}, 160 ${plotH - 34}
      C 178 ${plotH - 34}, 194 ${plotH - 42}, 214 ${plotH - 42}
      C 228 ${plotH - 42}, 236 ${plotH - 40}, 242 ${plotH - 30}
      C 250 ${plotH - 18}, 262 ${plotH - 8}, 274 ${plotH - 8}
      C 286 ${plotH - 8}, 296 ${plotH - 2}, ${plotW} ${plotH - 1}
    `.trim();

    const scaleX = plotW / 305;

    return (
        <View style={{
            backgroundColor: '#F2F2F2',
            borderRadius: 20,
        }}>
            {/* Y-axis labels */}
            <View style={styles.chartRow}>
                <View style={{ flex: 1 }}>
                    <Svg width={plotW} height={BAR_AREA_H + CHART_TICK_EXT + 10}>
                        <Defs>
                            <ClipPath id="profileClip">
                                <Path d={`${curvePath} L ${plotW} ${plotH} L 0 ${plotH} Z`} />
                            </ClipPath>
                            <ClipPath id="plotRectClip">
                                <Rect x={0} y={0} width={plotW} height={plotH} />
                            </ClipPath>
                        </Defs>

                        {/* Dashed grid lines */}
                        <Line
                            x1={0} y1={y200}
                            x2={plotW} y2={y200}
                            stroke="#999" strokeWidth={0.5} strokeDasharray="4,4"
                        />
                        <Line
                            x1={0} y1={y100}
                            x2={plotW} y2={y100}
                            stroke="#999" strokeWidth={0.5} strokeDasharray="4,4"
                        />
                        <Line
                            x1={0} y1={y300}
                            x2={plotW} y2={y300}
                            stroke="#999" strokeWidth={0.5} strokeDasharray="4,4"
                        />
                        <Line
                            x1={0} y1={plotH}
                            x2={plotW} y2={plotH}
                            stroke="#999" strokeWidth={0.5}
                        />

                        {/* Coloured bars */}
                        <G clipPath="url(#plotRectClip)">
                            {segments.map((seg, i) => (
                                <Rect
                                    key={i}
                                    x={seg.x * scaleX}
                                    y={0}
                                    width={seg.w * scaleX}
                                    height={plotH}
                                    fill={seg.color}
                                    clipPath="url(#profileClip)"
                                />
                            ))}
                        </G>

                        {/* White outline curve border */}
                        <Path
                            d={curvePath}
                            fill="none"
                            stroke="#F2F2F2"
                            strokeWidth={5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Blue elevation curve */}
                        <Path
                            d={curvePath}
                            fill="none"
                            stroke="#007AFF"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Vertical cursor line */}
                        <Line
                            x1={cursorX} y1={0}
                            x2={cursorX} y2={plotH + 16}
                            stroke="#007AFF"
                            strokeWidth={2.5}
                        />

                        {/* Cursor circle (white fill + blue border) */}
                        <Circle
                            cx={cursorX}
                            cy={cursorY}
                            r={8}
                            fill="#F2F2F2"
                            stroke="#007AFF"
                            strokeWidth={2}
                        />

                        {/* Bottom end ticks */}
                        <Line x1={0} y1={plotH} x2={0} y2={plotH + 16} stroke="#999" strokeWidth={0.5} />
                        <Line x1={plotW} y1={plotH} x2={plotW} y2={plotH + 16} stroke="#999" strokeWidth={0.5} />
                    </Svg>

                    {/* X-axis labels */}
                    <View style={styles.xAxis}>
                        <Text style={styles.axisLabel}>0 KM</Text>
                        <Text style={[styles.axisLabel, { color: '#282828', fontWeight: '500' }]}>0.5%</Text>
                        <Text style={styles.axisLabel}>16,6 KM</Text>
                    </View>
                </View>

                {/* Y-axis labels (right side) */}
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>300 M</Text>
                    <Text style={styles.axisLabel}>200 M</Text>
                    <Text style={styles.axisLabel}>100 M</Text>
                    <Text style={styles.axisLabel}>0 M</Text>
                </View>
            </View>
        </View>
    );
}

/* ─── Slider ──────────────────────────────────────────────────── */
function RouteSlider() {
    const trackW = SCREEN_W - 48;
    const fillW = trackW * 0.48;
    return (
        <View style={styles.sliderWrap}>
            <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: fillW }]} />
                <View style={[styles.sliderThumb, { left: fillW - 10 }]} />
            </View>
        </View>
    );
}

/* ─── Screen ──────────────────────────────────────────────────── */
export default function GpxRouteViewScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const topButtonOffset = Math.max(16, insets.top + 8);
    const editButtonBottom = Math.max(44, insets.bottom + 28);


    return (
        <View style={styles.screen}>
            <Stack.Screen options={{ headerShown: false }} />
            <Svg
                pointerEvents="none"
                style={styles.screenGradient}
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <Defs>
                    <LinearGradient id="screenBgGradient" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                        <Stop offset="0" stopColor="#9CE6FF" />
                        <Stop offset="0.2025" stopColor="#A6CEDB" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100" height="100" fill="url(#screenBgGradient)" />
            </Svg>

            {/* ── 3D Map Background ─────────────────────────────────── */}
            <View style={styles.mapContainer}>
                <Image
                    source={require('../assets/images/feed/details_map.png')}
                    style={styles.mapBg}
                    resizeMode='cover'
                />

                {/* Top-left: share button */}
                <TouchableOpacity
                    style={[styles.topLeftBtn, { top: topButtonOffset }]}
                    activeOpacity={0.75}
                    onPress={() => { }}
                >
                    <GlassBtn>
                        <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" style={styles.iconSvg}>
                            <Path
                                d="M8.25 5.5L11 2.75L13.75 5.5M11 2.75V14.667M5.5 8.25C4.12 8.25 3 9.37 3 10.75V17.417C3 18.797 4.12 19.917 5.5 19.917H16.5C17.88 19.917 19 18.797 19 17.417V10.75C19 9.37 17.88 8.25 16.5 8.25"
                                stroke="#1F1F1F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </GlassBtn>
                </TouchableOpacity>

                {/* Top-right: close button */}
                <TouchableOpacity
                    style={[styles.topRightClose, { top: topButtonOffset }]}
                    activeOpacity={0.75}
                    onPress={() => router.back()}
                >
                    <GlassBtn>
                        <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={styles.iconSvg}>
                            <Path
                                d="M2 2L14 14M14 2L2 14"
                                stroke="#1F1F1F"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </Svg>
                    </GlassBtn>
                </TouchableOpacity>

                {/* Top-right: route/trace button (below close) */}
                <TouchableOpacity
                    style={[styles.topRightRoute, { top: topButtonOffset + 54 }]}
                    activeOpacity={0.75}
                    onPress={() => { }}
                >
                    <GlassBtn>
                        {/* Route trace icon */}
                        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" style={styles.iconSvg}>
                            <Circle cx={5} cy={19} r={3} stroke="#1F1F1F" strokeWidth="1.5" />
                            <Circle cx={19} cy={5} r={3} stroke="#1F1F1F" strokeWidth="1.5" />
                            <Path
                                d="M5 16C5 16 5 12 9 10C13 8 15 14 19 8"
                                stroke="#1F1F1F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </Svg>
                    </GlassBtn>
                </TouchableOpacity>

                {/* "Edit" button — bottom right of map */}
                <TouchableOpacity
                    style={[styles.editBtn, { bottom: editButtonBottom }]}
                    activeOpacity={0.75}
                    onPress={() => router.push('/photo-preview-flow')}
                >
                    <GlassBtn size={{ w: 85, h: 44 }} borderRadius={15}>
                        <Text style={styles.editBtnText}>Edit</Text>
                    </GlassBtn>
                </TouchableOpacity>
            </View>

            {/* ── Bottom Sheet ──────────────────────────────────────── */}
            <View style={[styles.sheet, { paddingBottom: Math.max(10, insets.bottom + 8) }]}>
                {/* Drag handle */}
                <View style={styles.dragHandle} />

                {/* Title row */}
                <View style={styles.titleRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.titleText}>Oslo, Norway</Text>
                        <Text style={styles.subtitleText}>Gravel Cycling · 16.05.2026 · 9:18 AM</Text>
                    </View>
                    <TouchableOpacity style={styles.gpxDownloadBtn} activeOpacity={0.8} onPress={() => { }}>
                        <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                            <Path
                                d="M7 1V10M7 10L4 7M7 10L10 7M2 12H12"
                                stroke="#F2F2F2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text style={styles.gpxDownloadText}>GPX</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats row */}
                <View style={{
                    backgroundColor: 'rgba(242, 242, 242, 1)',
                    padding: 12,
                    // marginBottom: 12,
                    marginTop: 5,
                    marginHorizontal: -10,
                    borderRadius: 20,
                }}>
                    <View style={styles.statsRow}>
                        {/* Cycling icon box */}
                        <View style={styles.activityIconBox}>
                            <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                                {/* Simple bicycle icon */}
                                <Circle cx={7} cy={20} r={5} stroke="#007AFF" strokeWidth="1.8" fill="none" />
                                <Circle cx={21} cy={20} r={5} stroke="#007AFF" strokeWidth="1.8" fill="none" />
                                <Path
                                    d="M7 20L12 10H18L21 20M12 10L15 16M18 10L14 7"
                                    stroke="#007AFF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.distanceText}>87,3 km</Text>
                            <Text style={styles.elevationSubText}>250 mt elevation</Text>
                        </View>

                        {/* Gradient legend */}
                        <View style={styles.legend}>
                            {[
                                { color: '#000000', label: '> 15%' },
                                { color: '#970200', label: '9%-14.9%' },
                                { color: '#E72C29', label: '6%-8.9%' },
                                { color: '#FDCB3B', label: '3%-5.9%' },
                                { color: '#9EBEF1', label: '1.1%-2.9%' },
                                { color: '#D9D9D9', label: '0%-1%' },
                            ].map((item) => (
                                <View key={item.label} style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendLabel}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Sub stats */}
                    <Text style={styles.subStatsText}>3 h 14 min  ·  ↑ 220 m  ·  ↓ 220 m</Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Elevation profile */}
                    <ElevationChart />
                </View>

                {/* Slider */}
                <View style={{
                    backgroundColor: 'rgba(242, 242, 242, 1)',
                    padding: 12,
                    marginTop: 8,
                    marginHorizontal: -10,
                    borderRadius: 20,
                    paddingBottom: 24,
                }}>
                    <RouteSlider />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#9CE6FF',
    },
    screenGradient: {
        ...StyleSheet.absoluteFillObject,
    },

    // ── Map ─────────────────────────────────────────────────────
    mapContainer: {
        flex: 1,
        zIndex: 3,
        paddingTop: 150
    },
    mapBg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    topLeftBtn: {
        position: 'absolute',
        top: 56,
        left: 16,
    },
    topRightClose: {
        position: 'absolute',
        top: 56,
        right: 16,
    },
    topRightRoute: {
        position: 'absolute',
        top: 110,
        right: 16,
    },
    editBtn: {
        position: 'absolute',
        right: 16,
    },
    editBtnText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#282828',
    },
    iconSvg: {
        backgroundColor: 'transparent',
    },

    // ── Sheet ────────────────────────────────────────────────────
    sheet: {
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 18,
        paddingTop: 8,
        marginTop: -30,
        zIndex: 5,
    },
    dragHandle: {
        alignSelf: 'center',
        width: 46,
        height: 5,
        borderRadius: 10,
        backgroundColor: '#616264',
        marginBottom: 0,
    },

    // ── Title row ────────────────────────────────────────────────
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    titleText: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '600',
        color: '#282828',
        lineHeight: 20,
    },
    subtitleText: {
        fontFamily: 'Inter',
        fontSize: 13,
        fontWeight: '500',
        color: '#007AFF',
        lineHeight: 18,
        // marginTop: 2,
    },
    gpxDownloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282828',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 8,
        gap: 6,
    },
    gpxDownloadText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#F2F2F2',
    },

    // ── Stats row ────────────────────────────────────────────────
    statsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    activityIconBox: {
        width: 44,
        height: 44,
        backgroundColor: '#CFD0D1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceText: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '600',
        color: '#007AFF',
        lineHeight: 29,
    },
    elevationSubText: {
        fontFamily: 'Inter',
        fontSize: 13,
        fontWeight: '500',
        color: '#282828',
        lineHeight: 18,
    },

    // ── Legend ───────────────────────────────────────────────────
    legend: {
        gap: 1,
        alignItems: 'flex-start',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
    },
    legendLabel: {
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: '500',
        color: '#676767',
        lineHeight: 14,
    },

    subStatsText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '500',
        color: '#676767',
        marginBottom: 10,
    },

    divider: {
        height: 0.5,
        backgroundColor: '#999',
        marginBottom: 5,
    },

    // ── Chart ────────────────────────────────────────────────────
    chartRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    yAxisLabels: {
        justifyContent: 'space-between',
        height: BAR_AREA_H + 2,
        paddingBottom: 0,
        marginLeft: 4,
        paddingTop: 1,
        alignItems: 'flex-end',
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    axisLabel: {
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: '500',
        color: '#676767',
    },

    // ── Slider ───────────────────────────────────────────────────
    sliderWrap: {
        marginTop: 8,
        paddingHorizontal: 4,
    },
    sliderTrack: {
        height: 6,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        position: 'relative',
    },
    sliderFill: {
        height: 6,
        backgroundColor: '#007AFF',
        borderRadius: 20,
    },
    sliderThumb: {
        position: 'absolute',
        top: -7,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        borderWidth: 2,
        borderColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
});
