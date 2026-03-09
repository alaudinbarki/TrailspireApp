import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SharedFeedFilterPanelProps {
    visible: boolean;
    onClose: () => void;
    attached?: boolean;
}

const ACTIVITY_CARDS = [
    'Road Cycling',
    'Gravel Cycling',
    'Mountain bike',
    'Running',
    'Ultra running',
    'Trekking',
    'Hiking',
    "Climbing",
    "Nordic skiing",
    "Ski touring",
    "4x4 adventure",
    "Enduro",
    "Motorbike",
    "Swimming",
    "Paragliding"
];

// const DISTANCES = ['Any', '< 10 km', '10-30 km', '30+ km'];

export function SharedFeedFilterPanel({ visible, onClose, attached = false }: SharedFeedFilterPanelProps) {
    if (!visible) {
        return null;
    }

    return (
        <View style={[styles.container, attached && styles.containerAttached]}>
            <Text style={styles.searchRangeLabel}>Search Range</Text>
            <View style={styles.searchRangeGroup}>
                <View style={styles.searchRangeTrackWrap}>
                    <View style={styles.searchRangeTrack} />
                    <View style={styles.searchRangeProgress} />
                    <View style={styles.searchRangeThumb} />
                </View>
            </View>
            <View style={styles.searchRangeValuesRow}>
                <Text style={styles.searchRangeValue}>5 km</Text>
                <Text style={styles.searchRangeValue}>All</Text>
            </View>

            <Text style={styles.searchRangeLabel}>Activities</Text>
            <View style={styles.activitiesGrid}>
                {ACTIVITY_CARDS.map((item, index) => {
                    const isActive = index === 3;

                    return (
                        <View key={item} style={[styles.activityCard, isActive && styles.activityCardActive]}>
                            <View style={[styles.activityDot, isActive && styles.activityDotActive]} />
                            <Text style={[styles.activityText, isActive && styles.activityTextActive]}>{item}</Text>
                        </View>
                    );
                })}
            </View>

            {/* <Text style={styles.sectionLabel}>Distance</Text>
            <View style={styles.chipsRow}>
                {DISTANCES.map((item, index) => (
                    <View key={item} style={[styles.chip, index === 0 && styles.chipActive]}>
                        <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{item}</Text>
                    </View>
                ))}
            </View> */}

            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.resetBtn} activeOpacity={0.7}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} activeOpacity={0.7} onPress={onClose}>
                    <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginHorizontal: 18,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 14,
    },
    containerAttached: {
        marginTop: 0,
        marginHorizontal: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: 'transparent',
        paddingHorizontal: 18,
        paddingBottom: 18,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#282828',
        marginBottom: 6,
        marginTop: 4,
    },
    searchRangeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#282828',
        marginTop: 12,
        marginBottom: 8,
        lineHeight: 19,
    },
    searchRangeGroup: {
        width: '100%',
        height: 47,
        borderRadius: 15,
        backgroundColor: '#CFD0D1',
        paddingHorizontal: 21,
        justifyContent: 'center',
    },
    searchRangeTrackWrap: {
        position: 'relative',
        height: 24,
        justifyContent: 'center',
    },
    searchRangeValuesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 8,
    },
    searchRangeValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F1F1F',
    },
    searchRangeTrack: {
        width: '100%',
        height: 4,
        borderRadius: 999,
        backgroundColor: '#F2F2F2',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    searchRangeProgress: {
        width: 113,
        height: 4,
        borderRadius: 999,
        backgroundColor: '#007AFF',
        position: 'absolute',
        left: 0,
    },
    searchRangeThumb: {
        width: 21,
        height: 21,
        borderRadius: 10.5,
        backgroundColor: '#007AFF',
        borderWidth: 4,
        borderColor: '#CFD0D1',
        position: 'absolute',
        left: 102,
    },
    activitiesLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#282828',
        marginBottom: 8,
        marginTop: 4,
    },
    activitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 4,
        marginBottom: 6,
    },
    activityCard: {
        width: '32.2%',
        height: 39,
        borderRadius: 15,
        backgroundColor: '#CFD0D1',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
        gap: 7,
    },
    activityCardActive: {
        backgroundColor: '#282828',
    },
    activityDot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#D9D9D9',
    },
    activityDotActive: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#1283FD',
        borderWidth: 1,
        borderColor: '#CFD0D1',
    },
    activityText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#1F1F1F',
    },
    activityTextActive: {
        color: '#F2F2F2',
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 7,
    },
    chip: {
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
    },
    chipActive: {
        backgroundColor: '#282828',
    },
    chipText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#282828',
    },
    chipTextActive: {
        color: '#FFFFFF',
    },
    actionsRow: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    resetBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 10,
        // backgroundColor: 'rgba(40, 40, 40, 0.08)',
    },
    resetText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#282828',
        textDecorationLine: 'underline',
    },
    applyBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 10,
        backgroundColor: '#282828',
    },
    applyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
