import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { ArrowUpRightIcon } from '../../src/components/icons/ArrowUpRightIcon';
import { MessageBubbleIcon } from '../../src/components/icons/MessageBubbleIcon';
import { MapPinIcon } from '../../src/components/icons/MapPinIcon';
import { ProfileCategoryIcon, type ProfileCategoryIconName } from '../../src/components/icons/ProfileCategoryIcon';
import { SettingsIcon } from '../../src/components/icons/SettingsIcon';
import { TerrainProfileIcon } from '../../src/components/icons/TerrainProfileIcon';

interface ProfilePost {
    id: string;
    image: any;
    height: number;
}

const IMAGES = {
    profile: require('../../assets/images/feed/profile_photo1.png'),
    snow: require('../../assets/images/feed/feed_snow_mountain.png'),
    landscape: require('../../assets/images/feed/feed_landscape.png'),
    adventure: require('../../assets/images/feed/feed_adventure.png'),
    tent: require('../../assets/images/feed/feed_tent.png'),
    iceland: require('../../assets/images/feed/feed_iceland.png'),
    skiing: require('../../assets/images/feed/feed_skiing.png'),
    trailSunset: require('../../assets/images/feed/feed_trail_sunset.png'),
    powder: require('../../assets/images/feed/feed_powder.png'),
    activityMap: require('../../assets/images/feed/activity_map.png'),
};

const STATS = [
    { label: 'Activities', value: '147' },
    { label: 'Following', value: '234' },
    { label: 'Followers', value: '1.2k' },
];

const COLLECTION_AVATARS = [
    require('../../assets/images/feed/friend_avatar_andyros.png'),
    require('../../assets/images/feed/friend_rowbat88.png'),
    require('../../assets/images/feed/friend_jhonny.png'),
    require('../../assets/images/feed/profile_photo2.png'),
];

type CollectionItem = {
    id: string;
    title: string;
    count: number;
    privacy: 'Shared library' | 'Private';
    images: [any, any, any];
    collaborators?: any[];
};


const COLLECTIONS: CollectionItem[] = [
    {
        id: '1',
        title: 'Skitouring Switzerland',
        count: 11,
        privacy: 'Shared library',
        images: [
            require('../../assets/images/feed/collection_preview_2.png'),
            require('../../assets/images/feed/collection_preview_1.png'),
            require('../../assets/images/feed/collection_preview_2.png'),
        ],
        collaborators: [
            require('../../assets/images/feed/friend_avatar_andyros.png'),
            require('../../assets/images/feed/friend_rowbat88.png'),
            require('../../assets/images/feed/friend_jhonny.png'),
            require('../../assets/images/feed/profile_photo2.png'),
        ],
    },
    {
        id: '2',
        title: 'Solo Rides',
        count: 6,
        privacy: 'Private',
        images: [
            require('../../assets/images/feed/collection_preview_1.png'),
            require('../../assets/images/feed/collection_preview_2.png'),
            require('../../assets/images/feed/collection_preview_1.png'),
        ],
    },
    {
        id: '3',
        title: 'Zurich',
        count: 88,
        privacy: 'Shared library',
        images: [
            require('../../assets/images/feed/collection_preview_2.png'),
            require('../../assets/images/feed/collection_preview_1.png'),
            require('../../assets/images/feed/collection_preview_2.png'),
        ],
        collaborators: [
            require('../../assets/images/feed/friend_avatar_andyros.png'),
            require('../../assets/images/feed/friend_rowbat88.png'),
            require('../../assets/images/feed/friend_jhonny.png'),
            require('../../assets/images/feed/profile_photo2.png'),
        ],
    },
    {
        id: '4',
        title: 'Skitouring Dolomites',
        count: 11,
        privacy: 'Private',
        images: [
            require('../../assets/images/feed/collection_preview_1.png'),
            require('../../assets/images/feed/collection_preview_2.png'),
            require('../../assets/images/feed/collection_preview_1.png'),
        ],
    },
];

const NAV_ITEMS = [
    { key: 'all', type: 'text', label: 'All' },
    { key: 'profile-1', type: 'icon', iconName: 'profile-1' as ProfileCategoryIconName },
    { key: 'profile-2', type: 'icon', iconName: 'profile-2' as ProfileCategoryIconName },
    { key: 'profile-3', type: 'icon', iconName: 'profile-3' as ProfileCategoryIconName },
    { key: 'profile-4', type: 'icon', iconName: 'profile-4' as ProfileCategoryIconName },
    { key: 'profile-5', type: 'icon', iconName: 'profile-5' as ProfileCategoryIconName },
    { key: 'profile-6', type: 'icon', iconName: 'profile-6' as ProfileCategoryIconName },
] as const;

const USER_POSTS: ProfilePost[] = [
    { id: '1', image: IMAGES.snow, height: 200 },
    { id: '2', image: IMAGES.landscape, height: 260 },
    { id: '3', image: IMAGES.tent, height: 220 },
    { id: '4', image: IMAGES.adventure, height: 190 },
    { id: '5', image: IMAGES.iceland, height: 250 },
    { id: '6', image: IMAGES.skiing, height: 210 },
];

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
    const [activeNav, setActiveNav] = useState('all');
    const [activeViewMode, setActiveViewMode] = useState<'stats' | 'atlas'>('atlas');
    const followersValue = STATS.find((stat) => stat.label === 'Followers')?.value ?? '0';
    const followingValue = STATS.find((stat) => stat.label === 'Following')?.value ?? '0';

    const postsForGrid = activeTab === 'posts'
        ? USER_POSTS
        : [
            { id: 's1', image: IMAGES.trailSunset, height: 181 },
            { id: 's2', image: IMAGES.powder, height: 115 },
            { id: 's3', image: IMAGES.landscape, height: 230 },
            { id: 's4', image: IMAGES.iceland, height: 114 },
            { id: 's5', image: IMAGES.skiing, height: 181 },
            { id: 's6', image: IMAGES.adventure, height: 115 },
        ];

    const leftPosts = postsForGrid.filter((_, i) => i % 2 === 0);
    const rightPosts = postsForGrid.filter((_, i) => i % 2 === 1);
    const statsActivities = [
        { id: 'a1', date: '16 MAR' },
        { id: 'a2', date: '11 MAR' },
        { id: 'a3', date: '05 MAR' },
        { id: 'a4', date: '01 MAR' },
        { id: 'a5', date: '26 FEB' },
    ];

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(110, insets.bottom + 98) }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profileHeader}>
                    <View style={styles.profileTopRow}>
                        <View style={styles.profileFirstItem}>
                            <View style={styles.profileInfoRow}>
                                <Image source={IMAGES.profile} style={styles.avatar} />

                                <View style={styles.profileInfoTextBlock}>
                                    <Text style={styles.userName}>Ashley Johnson</Text>
                                    <View style={styles.locationRow}>
                                        <MapPinIcon width={12} height={12} color="#007AFF" />
                                        <Text style={styles.locationText}>Oslo, Norway</Text>
                                    </View>

                                </View>

                            </View>

                            <View style={styles.statsRow}>
                                <View style={styles.avatarsRow}>
                                    {COLLECTION_AVATARS.slice(0, 3).map((avatar, idx) => (
                                        <Image
                                            key={`collection-avatar-${idx}`}
                                            source={avatar}
                                            style={[styles.avatarTiny, idx > 0 && { marginLeft: -8 }]}
                                        />
                                    ))}
                                </View>
                                <Text style={styles.followMetaText}>{followersValue} followers - {followingValue} following</Text>
                            </View>
                        </View>

                        <View style={styles.profileSecondItemColumn}>
                            <TouchableOpacity style={styles.settingsButton} activeOpacity={0.8}>
                                <View style={styles.settingsButtonContent}>
                                    <SettingsIcon width={17} height={17} />
                                    <Text style={styles.settingsButtonText}>Settings</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.secondItemBottomRow}>
                                <View style={styles.secondItemCardWrap}>
                                    <TouchableOpacity style={[styles.followChatButton, styles.followButtonPrimary]} activeOpacity={0.8}>
                                        <Svg width={49} height={49} viewBox="0 0 49 49" fill="none">
                                            <Path
                                                d="M21.6009 31.8092C21.1926 31.8092 20.8047 31.6458 20.5189 31.36L14.7409 25.5821C14.1489 24.99 14.1489 24.01 14.7409 23.4179C15.333 22.8259 16.313 22.8259 16.9051 23.4179L21.6009 28.1138L32.0951 17.6196C32.6872 17.0275 33.6672 17.0275 34.2593 17.6196C34.8514 18.2117 34.8514 19.1917 34.2593 19.7838L22.683 31.36C22.3972 31.6458 22.0093 31.8092 21.6009 31.8092Z"
                                                fill="#D9D9D9"
                                            />
                                        </Svg>
                                    </TouchableOpacity>
                                    <Text style={[styles.followChatBelowText, styles.followChatButtonTextPrimary]}>Follow</Text>
                                </View>
                                <View style={styles.secondItemCardWrap}>
                                    <TouchableOpacity
                                        style={[styles.followChatButton, styles.chatButtonSecondary]}
                                        activeOpacity={0.8}
                                        onPress={() => router.push('/messages-list')}
                                    >
                                        <MessageBubbleIcon width={18} height={15} />
                                    </TouchableOpacity>
                                    <Text style={styles.followChatBelowText}>Chat</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.gridComboWrap}>
                    <TouchableOpacity
                        style={[
                            styles.viewSwitchBtn,
                            activeViewMode === 'stats' && styles.viewSwitchBtnActive,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setActiveViewMode('stats')}
                    >
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <Path d="M6.97024 4.25003L8.01024 4.25003C10.0202 4.25003 10.9902 5.18003 10.9902 7.10003L10.9902 18.9C10.9902 19.31 10.6502 19.65 10.2402 19.65C9.83023 19.65 9.49023 19.31 9.49023 18.9L9.49024 7.10003C9.49024 6.09003 9.28024 5.75003 8.01024 5.75003L6.97024 5.75003C5.70024 5.75003 5.49024 6.09003 5.49024 7.10003L5.49023 18.9C5.49023 19.31 5.15023 19.65 4.74023 19.65C4.33023 19.65 3.99023 19.31 3.99023 18.9L3.99024 7.10003C3.99024 5.18003 4.96024 4.25003 6.97024 4.25003Z" fill={activeViewMode === 'stats' ? '#1F1F1F' : '#C4C4C4'} />
                            <Path d="M15.4702 9.25003L16.5102 9.25003C18.5202 9.25003 19.4902 10.18 19.4902 12.1L19.4902 18.9C19.4902 19.31 19.1502 19.65 18.7402 19.65C18.3302 19.65 17.9902 19.31 17.9902 18.9L17.9902 12.1C17.9902 11.09 17.7802 10.75 16.5102 10.75L15.4702 10.75C14.2002 10.75 13.9902 11.09 13.9902 12.1L13.9902 18.9C13.9902 19.31 13.6502 19.65 13.2402 19.65C12.8302 19.65 12.4902 19.31 12.4902 18.9L12.4902 12.1C12.4902 10.18 13.4602 9.25003 15.4702 9.25003Z" fill={activeViewMode === 'stats' ? '#1F1F1F' : '#C4C4C4'} />
                            <Path d="M2 18.25L22 18.25C22.42 18.25 22.75 18.59 22.75 19C22.75 19.41 22.42 19.75 22 19.75L2 19.75C1.59 19.75 1.25 19.41 1.25 19C1.25 18.59 1.58 18.25 2 18.25Z" fill={activeViewMode === 'stats' ? '#1F1F1F' : '#C4C4C4'} />
                        </Svg>
                    </TouchableOpacity>
                    <Svg width={2} height={28} viewBox="0 0 2 28" fill="none">
                        <Path d="M0.75 0.75L0.749999 26.75" stroke="#D9D9D9" strokeWidth={1.5} strokeLinecap="round" />
                    </Svg>
                    <TouchableOpacity
                        style={[
                            styles.viewSwitchBtn,
                            activeViewMode === 'atlas' && styles.viewSwitchBtnActive,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setActiveViewMode('atlas')}
                    >
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <Path d="M9.37 22.75H4.62C2.32 22.75 1.25 21.68 1.25 19.38V14.63C1.25 12.32 2.32 11.25 4.62 11.25H7C7.41 11.25 7.75 11.59 7.75 12V14.37C7.75 15.83 8.17 16.25 9.62 16.25H12C12.41 16.25 12.75 16.59 12.75 17V19.38C12.75 21.68 11.68 22.75 9.37 22.75ZM4.62 12.75C3.17 12.75 2.75 13.17 2.75 14.63V19.38C2.75 20.83 3.17 21.25 4.62 21.25H9.37C10.83 21.25 11.25 20.83 11.25 19.38V17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V12.75H4.62Z" fill={activeViewMode === 'atlas' ? '#1F1F1F' : '#C4C4C4'} />
                            <Path d="M14.37 17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V9.62C6.25 7.32 7.32 6.25 9.62 6.25H12C12.41 6.25 12.75 6.59 12.75 7V9.37C12.75 10.83 13.17 11.25 14.62 11.25H17C17.41 11.25 17.75 11.59 17.75 12V14.37C17.75 16.68 16.68 17.75 14.37 17.75ZM9.62 7.75C8.17 7.75 7.75 8.17 7.75 9.62V14.37C7.75 15.83 8.17 16.25 9.62 16.25H14.37C15.83 16.25 16.25 15.83 16.25 14.37V12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V7.75H9.62Z" fill={activeViewMode === 'atlas' ? '#1F1F1F' : '#C4C4C4'} />
                            <Path d="M19.37 12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V4.62C11.25 2.32 12.32 1.25 14.62 1.25H19.37C21.68 1.25 22.75 2.32 22.75 4.62V9.37C22.75 11.68 21.68 12.75 19.37 12.75ZM14.62 2.75C13.17 2.75 12.75 3.17 12.75 4.62V9.37C12.75 10.83 13.17 11.25 14.62 11.25H19.37C20.83 11.25 21.25 10.83 21.25 9.37V4.62C21.25 3.17 20.83 2.75 19.37 2.75H14.62Z" fill={activeViewMode === 'atlas' ? '#1F1F1F' : '#C4C4C4'} />
                        </Svg>
                    </TouchableOpacity>
                </View>

                <View style={styles.navRow}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.key === activeNav;
                        return (
                            <TouchableOpacity
                                key={item.key}
                                style={[
                                    styles.navButton,
                                    isActive && styles.navButtonActive,
                                ]}
                                activeOpacity={0.8}
                                onPress={() => setActiveNav(item.key)}
                            >
                                {item.type === 'text' ? <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text> : null}
                                {item.type === 'icon' ? (
                                    <ProfileCategoryIcon name={item.iconName} width={18} height={18} />
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {activeViewMode === 'stats' ? (
                    <View style={styles.statsScreenSection}>
                        <Text style={styles.statisticsTitle}>Statistics</Text>

                        <View style={styles.periodTabsWrap}>
                            <Text style={styles.periodTabText}>Week</Text>
                            <Text style={styles.periodTabText}>Month</Text>
                            <View style={styles.periodTabActivePill}>
                                <Text style={styles.periodTabActiveText}>Year</Text>
                            </View>
                            <Text style={styles.periodTabText}>All Time</Text>
                        </View>

                        <View style={styles.yearHeaderRow}>
                            <Text style={styles.yearHeaderText}>2024</Text>
                            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <Path d="M3 6L8 11L13 6" stroke="#007AFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                        <Text style={styles.yearCompareText}>vs. 2023</Text>

                        <View style={styles.lineChartCard}>
                            <View style={[styles.chartGridLine, { top: 8 }]} />
                            <View style={[styles.chartGridLine, { top: 34 }]} />
                            <View style={[styles.chartGridLine, { top: 60 }]} />
                            <View style={[styles.chartGridLine, { top: 86 }]} />
                            <View style={styles.chartGridLineStrong} />

                            <Svg width="100%" height={124} viewBox="0 0 333 124" fill="none" style={styles.lineChartSvg}>
                                <Path d="M1 111C18 110 34 103 46 99C58 95 67 92 82 84C93 77 98 60 112 51C123 44 137 40 150 36C166 31 176 18 188 22C199 26 207 34 220 21C228 14 241 14 255 7C267 2 282 1 299 1" stroke="#007AFF" strokeWidth={4} strokeLinecap="round" />
                                <Path d="M1 112C18 111 34 109 48 106C64 104 74 102 89 100C103 98 119 95 131 90C146 88 160 86 173 83C187 81 202 81 216 77C231 75 245 74 259 70C273 67 289 63 301 58C314 56 324 56 332 54" stroke="#696969" strokeWidth={3} strokeLinecap="round" />
                                <Path d="M232 2V109" stroke="#696969" strokeWidth={1.5} />
                                <Circle cx="232" cy="2" r="6" fill="#007AFF" />
                                <Circle cx="232" cy="58" r="5" fill="#696969" />
                            </Svg>
                            <Text style={styles.blueHoursLabel}>321 hrs</Text>
                            <Text style={styles.grayHoursLabel}>187 hrs</Text>
                        </View>

                        <View style={styles.barsWrap}>
                            <View style={styles.barsGridLineStrong} />
                            <View style={[styles.barsGridLine, { top: 20 }]} />
                            <View style={[styles.barsGridLine, { top: 40 }]} />
                            <View style={[styles.barsGridLine, { top: 60 }]} />

                            <View style={styles.barsRow}>
                                {[
                                    { m: 'Jan', b: 14, g: 20 },
                                    { m: 'Feb', b: 28, g: 18 },
                                    { m: 'Mar', b: 34, g: 20 },
                                    { m: 'Apr', b: 38, g: 18 },
                                    { m: 'May', b: 33, g: 15 },
                                    { m: 'Jun', b: 45, g: 14 },
                                    { m: 'Jul', b: 39, g: 24 },
                                    { m: 'Aug', b: 44, g: 30 },
                                    { m: 'Sep', b: 46, g: 32 },
                                    { m: 'Oct', b: 0, g: 38 },
                                    { m: 'Nov', b: 0, g: 28 },
                                    { m: 'Dec', b: 0, g: 16 },
                                ].map((item) => (
                                    <View key={item.m} style={styles.monthBarItem}>
                                        <View style={styles.monthBarPair}>
                                            <View style={[styles.monthBarGray, { height: item.g }]} />
                                            <View style={[styles.monthBarBlue, { height: item.b }]} />
                                        </View>
                                        <Text style={styles.monthLabel}>{item.m}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.hoursAxisLabelWrap}>
                                <Text style={styles.hoursAxisLabel}>50 hrs</Text>
                                <Text style={styles.hoursAxisLabel}>30 hrs</Text>
                                <Text style={styles.hoursAxisLabel}>20 hrs</Text>
                                <Text style={styles.hoursAxisLabel}>10 hrs</Text>
                            </View>
                        </View>

                        <Text style={styles.summaryTitle}>Summary</Text>
                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryCardLight}>
                                <Text style={styles.summaryCardLabel}>Distance (year)</Text>
                                <Text style={styles.summaryCardValueBlue}>654,52 km</Text>
                                <Text style={styles.summaryCardSub}>215,67 km</Text>
                            </View>
                            <View style={styles.summaryCardBlue}>
                                <Text style={styles.summaryCardLabelBlue}>Time (year)</Text>
                                <Text style={styles.summaryCardValueLight}>321,31 hrs</Text>
                                <Text style={styles.summaryCardSubDark}>187,35 hrs</Text>
                            </View>
                            <View style={styles.summaryCardLight}>
                                <Text style={styles.summaryCardLabel}>Calories (year)</Text>
                                <Text style={styles.summaryCardValueBlue}>3500 kcal</Text>
                            </View>
                            <View style={styles.summaryCardLight}>
                                <Text style={styles.summaryCardLabel}>Average heart rate</Text>
                                <Text style={styles.summaryCardValueBlue}>145 bpm</Text>
                            </View>
                        </View>

                        <View style={styles.statsActivityListWrap}>
                            {statsActivities.map((item) => (
                                <View key={item.id} style={styles.statsActivityCard}>
                                    <View style={styles.statsActivityMapWrap}>
                                        <Image source={IMAGES.activityMap} style={styles.statsActivityMapImg} resizeMode="cover" />
                                        <View style={styles.statsActivityStroke} pointerEvents="none">
                                            <View style={{ transform: [{ rotate: '170deg' }] }}>
                                                <TerrainProfileIcon width={120} height={40} color="#007AFF" />
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.statsOpenPill}
                                            activeOpacity={0.7}
                                            onPress={() => router.push('/gpx-route-view')}
                                        >
                                            <Text style={styles.statsOpenText}>Open</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.statsActivityMetaWrap}>
                                        <Text style={styles.statsActivityDate}>{item.date.replace(' ', '\n')}</Text>
                                        <Text style={styles.statsActivityTitle}>Gravel cycling</Text>
                                        <Text style={styles.statsActivityLocation}>Oslo, Norway</Text>
                                        <Text style={styles.statsActivityDistance}>87 km</Text>
                                    </View>

                                    <View style={styles.statsShareSideWrap}>
                                        <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
                                            <Path d="M17 22V8" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" />
                                            <Path d="M11 14L17 8L23 14" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M9 24V25C9 27.2091 10.7909 29 13 29H21C23.2091 29 25 27.2091 25 25V24" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" />
                                        </Svg>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : null}

                <View style={activeViewMode === 'atlas' ? undefined : styles.hiddenSection}>
                    <Text style={styles.atlasTitle}>Your Atlas</Text>

                    <TouchableOpacity
                        style={styles.atlasHeroWrap}
                        activeOpacity={0.9}
                        onPress={() => router.push('/other-user-profile')}
                    >
                        <Image source={IMAGES.landscape} style={styles.atlasHeroImage} resizeMode="cover" />
                    </TouchableOpacity>

                    <View style={styles.gridStackCard}>

                        <View style={{
                            width: 45, height: 6,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#A0A0A0'
                        }}
                        />
                        <View style={styles.gridContainer}>
                            <View style={styles.gridColumnLeft}>
                                {leftPosts.map((post) => (
                                    <TouchableOpacity
                                        key={post.id}
                                        style={styles.gridCard}
                                        activeOpacity={0.85}
                                        onPress={() => router.push('/activity-detail')}
                                    >
                                        <Image
                                            source={post.image}
                                            style={[styles.gridImage, { height: post.height }]}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.gridColumnRight}>
                                {rightPosts.map((post) => (
                                    <TouchableOpacity
                                        key={post.id}
                                        style={styles.gridCard}
                                        activeOpacity={0.85}
                                        onPress={() => router.push('/activity-detail')}
                                    >
                                        <Image
                                            source={post.image}
                                            style={[styles.gridImage, { height: post.height }]}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#A0A0A0',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
    },
    profileHeader: {
        minHeight: 180,
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        paddingBottom: 14,
    },
    profileTopRow: {
        marginTop: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        columnGap: 10,
    },
    profileFirstItem: {
        flex: 1,
        rowGap: 6,
    },
    avatarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarTiny: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CFD0D1',
    },
    topActionsRow: {
        marginTop: 24,
        paddingHorizontal: 17,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4,
    },
    headerIconButton: {
        width: 49,
        height: 49,
        borderRadius: 15,
        backgroundColor: '#CFD0D1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenterButton: {
        width: 251,
        height: 49,
        borderRadius: 15,
        backgroundColor: '#1F1F1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenterText: {
        color: '#F2F2F2',
        fontSize: 16,
        fontWeight: '700',
    },
    headerDots: {
        color: '#1F1F1F',
        fontSize: 22,
        lineHeight: 22,
    },
    profileInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        flex: 1,
    },
    profileActionColumn: {
        width: 106,
        rowGap: 7,
    },
    profileSecondItemColumn: {
        alignItems: 'flex-end',
        rowGap: 6,
    },
    secondItemBottomRow: {
        flexDirection: 'row',
        columnGap: 6,
    },
    secondItemCardWrap: {
        alignItems: 'center',
        rowGap: 4,
    },
    settingsButton: {
        width: 110,
        height: 36,
        borderRadius: 16,
        backgroundColor: '#CFD0D1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    settingsButtonContent: {
        width: '100%',
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsButtonText: {
        color: '#1E1E1E',
        fontSize: 12,
        fontWeight: '700',
        left: 6,
    },
    followChatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    followChatButton: {
        width: 50,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    followButtonPrimary: {
        backgroundColor: '#1C84F6',
    },
    chatButtonSecondary: {
        backgroundColor: '#CFD0D1',
    },
    followChatButtonText: {
        color: '#1F1F1F',
        fontSize: 12,
        fontWeight: '700',
    },
    followChatButtonTextPrimary: {
        color: '#1F1F1F',
    },
    followChatBelowText: {
        color: '#1F1F1F',
        fontSize: 10,
        fontWeight: '700',
    },
    avatar: {
        width: 71,
        height: 71,
        borderRadius: 30,
    },
    profileInfoTextBlock: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        color: '#1F1F1F',
        fontWeight: '700',
    },
    locationRow: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4,
    },
    locationText: {
        fontSize: 11,
        color: '#007AFF',
        fontWeight: '500',
    },
    statsRow: {
        // marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
    },
    followMetaText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#1F1F1F',
    },
    statItem: {
        alignItems: 'flex-start',
    },
    statValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F1F1F',
    },
    statLabel: {
        fontSize: 10,
        color: '#8C8C8C',
        fontWeight: '500',
    },
    actionRow: {
        marginTop: 10,
        marginHorizontal: 78,
        flexDirection: 'row',
        columnGap: 7,
    },
    actionButton: {
        width: 122,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#CFD0D1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonActive: {
        backgroundColor: '#1F1F1F',
    },
    actionButtonText: {
        color: '#5C5D5E',
        fontSize: 14,
        fontWeight: '700',
    },
    actionButtonTextActive: {
        color: '#F2F2F2',
    },
    navRow: {
        marginTop: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#CFD0D1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIconImage: {
        width: 18,
        height: 18,
    },
    navButtonWide: {
        width: 40,
    },
    navButtonActive: {
        backgroundColor: '#282828',
        borderRadius: 22,
    },
    gridComboWrap: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        columnGap: 4,
    },
    viewSwitchBtn: {
        width: 44,
        height: 44,
        borderRadius: 10,
        // backgroundColor: '#CFD0D1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewSwitchBtnActive: {
        // backgroundColor: '#282828',
        borderRadius: 22,
    },
    navText: {
        color: '#1F1F1F',
        fontSize: 17,
        lineHeight: 18,
    },
    navTextActive: {
        color: '#F2F2F2',
    },
    atlasHeroWrap: {
        marginTop: 6,
        width: '100%',
        borderTopRightRadius: 30
    },
    atlasHeroImage: {
        width: '100%',
        height: 220,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    gridStackCard: {
        marginTop: -18,
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 14,
    },
    atlasTitle: {
        left: 16,
        marginTop: 18,
        fontSize: 16,
        color: '#1F1F1F',
        fontWeight: '700',
        // paddingHorizontal: 12,
    },
    gridContainer: {
        marginTop: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        columnGap: 2,
    },
    gridColumnLeft: {
        flex: 2,
        rowGap: 2,
    },
    gridColumnRight: {
        flex: 1,
        rowGap: 2,
    },
    gridCard: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
    },
    hiddenSection: {
        display: 'none',
    },
    statsScreenSection: {
        marginTop: 12,
        paddingHorizontal: 14,
    },
    statisticsTitle: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 12,
    },
    periodTabsWrap: {
        height: 48,
        borderRadius: 20,
        backgroundColor: '#CFD0D1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    periodTabText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1F1F1F',
    },
    periodTabActivePill: {
        width: 96,
        height: 42,
        borderRadius: 20,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
    },
    periodTabActiveText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D9D9D9',
    },
    yearHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 2,
        columnGap: 4,
    },
    yearHeaderText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#007AFF',
        lineHeight: 26,
    },
    yearCompareText: {
        marginTop: -4,
        marginBottom: 8,
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(31,31,31,0.75)',
    },
    lineChartCard: {
        borderRadius: 15,
        overflow: 'hidden',
        paddingBottom: 8,
        marginBottom: 6,
    },
    chartGridLineStrong: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 2,
        borderTopColor: '#1F1F1F',
    },
    chartGridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.11)',
    },
    lineChartSvg: {
        marginTop: 0,
    },
    blueHoursLabel: {
        position: 'absolute',
        right: 42,
        top: 2,
        fontSize: 11,
        fontWeight: '500',
        color: '#007AFF',
    },
    grayHoursLabel: {
        position: 'absolute',
        right: 42,
        top: 58,
        fontSize: 11,
        fontWeight: '400',
        color: 'rgba(31,31,31,0.58)',
    },
    barsWrap: {
        marginTop: 2,
        paddingTop: 10,
        paddingBottom: 6,
        paddingRight: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#1F1F1F',
    },
    barsGridLineStrong: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 28,
        borderTopWidth: 2,
        borderTopColor: '#1F1F1F',
    },
    barsGridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.11)',
    },
    barsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 0,
    },
    monthBarItem: {
        alignItems: 'center',
        width: 25,
    },
    monthBarPair: {
        height: 96,
        width: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    monthBarGray: {
        width: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#696969',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    monthBarBlue: {
        width: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#007AFF',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    monthLabel: {
        marginTop: 10,
        fontSize: 11,
        color: 'rgba(31,31,31,0.58)',
    },
    hoursAxisLabelWrap: {
        position: 'absolute',
        right: 0,
        top: 8,
        height: 92,
        justifyContent: 'space-between',
    },
    hoursAxisLabel: {
        fontSize: 11,
        color: 'rgba(31,31,31,0.58)',
    },
    summaryTitle: {
        marginTop: 18,
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 12,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
    },
    summaryCardLight: {
        width: '48.5%',
        minHeight: 106,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    summaryCardBlue: {
        width: '48.5%',
        minHeight: 106,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    summaryCardLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F1F1F',
    },
    summaryCardLabelBlue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D9D9D9',
    },
    summaryCardValueBlue: {
        marginTop: 18,
        fontSize: 28,
        lineHeight: 32,
        fontWeight: '700',
        color: '#007AFF',
    },
    summaryCardValueLight: {
        marginTop: 18,
        fontSize: 28,
        lineHeight: 32,
        fontWeight: '700',
        color: '#D9D9D9',
    },
    summaryCardSub: {
        marginTop: 8,
        fontSize: 14,
        color: '#1F1F1F',
    },
    summaryCardSubDark: {
        marginTop: 8,
        fontSize: 14,
        color: '#1F1F1F',
    },
    statsActivityListWrap: {
        marginTop: 16,
        rowGap: 10,
    },
    statsActivityCard: {
        height: 106,
        borderRadius: 30,
        backgroundColor: '#CFD0D1',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: 8,
    },
    statsActivityMapWrap: {
        width: 164,
        height: 91,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
    },
    statsActivityMapImg: {
        width: 164,
        height: 91,
    },
    statsActivityStroke: {
        position: 'absolute',
        left: 12,
        top: 19,
    },
    statsOpenPill: {
        position: 'absolute',
        left: 25,
        top: 26,
        width: 85,
        height: 46,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(40,40,40,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    statsOpenText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '700',
        color: '#000000',
    },
    statsActivityMetaWrap: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 8,
    },
    statsActivityDate: {
        fontSize: 22,
        lineHeight: 18,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 6,
    },
    statsActivityTitle: {
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '500',
        color: '#282828',
    },
    statsActivityLocation: {
        fontSize: 12,
        lineHeight: 17,
        fontWeight: '500',
        color: '#007AFF',
    },
    statsActivityDistance: {
        fontSize: 12,
        lineHeight: 17,
        fontWeight: '500',
        color: '#007AFF',
    },
    statsShareSideWrap: {
        width: 69,
        height: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSpacing: {
        height: 40,
    },
});
// const CARD_W = (BASE_WIDTH - 24 - 8) / 2;
//
// const { width: SCREEN_W } = Dimensions.get('window');
//
// const IMAGES = {
//   profile: require('../../assets/images/feed/profile_photo1.png'),
//   snow: require('../../assets/images/feed/feed_snow_mountain.png'),
//   landscape: require('../../assets/images/feed/feed_landscape.png'),
//   adventure: require('../../assets/images/feed/feed_adventure.png'),
//   tent: require('../../assets/images/feed/feed_tent.png'),
//   iceland: require('../../assets/images/feed/feed_iceland.png'),
//   jeep: require('../../assets/images/feed/feed_jeep.png'),
//   skiing: require('../../assets/images/feed/feed_skiing.png'),
//   trailSunset: require('../../assets/images/feed/feed_trail_sunset.png'),
//   powder: require('../../assets/images/feed/feed_powder.png'),
// };
//
// const STATS = [
//   { label: 'Activities', value: '147' },
//   { label: 'Following', value: '234' },
//   { label: 'Followers', value: '1.2k' },
// ];
//
// interface ProfilePost {
//   id: string;
//   image: any;
//   height: number;
// }
//
// const USER_POSTS: ProfilePost[] = [
//   { id: '1', image: IMAGES.snow, height: 200 },
//   { id: '2', image: IMAGES.landscape, height: 260 },
//   { id: '3', image: IMAGES.tent, height: 220 },
//   { id: '4', image: IMAGES.adventure, height: 190 },
//   { id: '5', image: IMAGES.iceland, height: 250 },
//   { id: '6', image: IMAGES.skiing, height: 210 },
// ];
//
// export default function ProfileScreen() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
//
//   const leftPosts = USER_POSTS.filter((_, i) => i % 2 === 0);
//   const rightPosts = USER_POSTS.filter((_, i) => i % 2 === 1);
//
//   return (
//     <View style={styles.screen}>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Profile Header */}
//         <View style={styles.profileHeader}>
//           {/* Settings gear icon */}
//           <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7} onPress={() => router.push('/messages-list')}>
//             <Text style={styles.settingsIcon}>⚙</Text>
//           </TouchableOpacity>
//
//           {/* Avatar */}
//           <View style={styles.avatarContainer}>
//             <Image source={IMAGES.profile} style={styles.avatar} />
//           </View>
//
//           {/* Name & Location */}
//           <Text style={styles.userName}>Ashley Johnson</Text>
//           <View style={styles.locationRow}>
//             <MapPinIcon width={12} height={12} color="#007AFF" />
//             <Text style={styles.locationText}>Oslo, Norway</Text>
//           </View>
//
//           {/* Bio */}
//           <Text style={styles.bio}>
//             Mountain explorer & trail runner.{"\n"}
//             Always chasing the next adventure 🏔
//           </Text>
//
//           {/* Stats */}
//           <View style={styles.statsRow}>
//             {STATS.map((stat) => (
//               <View key={stat.label} style={styles.statItem}>
//                 <Text style={styles.statValue}>{stat.value}</Text>
//                 <Text style={styles.statLabel}>{stat.label}</Text>
//               </View>
//             ))}
//           </View>
//
//           {/* Action buttons */}
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={() => router.push('/profile-setup')}>
//               <Text style={styles.editBtnText}>Edit Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.stravaBtn} activeOpacity={0.7} onPress={() => router.push('/profile-setup')}>
//               <StravaLogoSvg width={50} height={10} color="#FFFFFF" />
//             </TouchableOpacity>
//           </View>
//         </View>
//
//         {/* Tabs */}
//         <View style={styles.tabRow}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
//             onPress={() => setActiveTab('posts')}
//             activeOpacity={0.7}
//           >
//             <Text style={[styles.tabText, activeTab === 'posts' && styles.tabTextActive]}>
//               Posts
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'saved' && styles.tabActive]}
//             onPress={() => setActiveTab('saved')}
//             activeOpacity={0.7}
//           >
//             <Text style={[styles.tabText, activeTab === 'saved' && styles.tabTextActive]}>
//               Saved
//             </Text>
//           </TouchableOpacity>
//         </View>
//
//         {/* Posts Grid */}
//         <View style={styles.gridContainer}>
//           <View style={styles.gridColumn}>
//             {leftPosts.map((post) => (
//               <TouchableOpacity
//                 key={post.id}
//                 style={styles.gridCard}
//                 activeOpacity={0.85}
//                 onPress={() => router.push('/activity-detail')}
//               >
//                 <Image
//                   source={post.image}
//                   style={[styles.gridImage, { height: post.height }]}
//                   resizeMode="cover"
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.gridColumn}>
//             {rightPosts.map((post) => (
//               <TouchableOpacity
//                 key={post.id}
//                 style={styles.gridCard}
//                 activeOpacity={0.85}
//                 onPress={() => router.push('/activity-detail')}
//               >
//                 <Image
//                   source={post.image}
//                   style={[styles.gridImage, { height: post.height }]}
//                   resizeMode="cover"
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//
//         {/* Spacer for tab bar */}
//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   scroll: {
//     flex: 1,
//   },
//   scrollContent: {},
//
//   // Profile Header
//   profileHeader: {
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 24,
//     backgroundColor: Colors.cardBackground,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     alignItems: 'center',
//   },
//   settingsBtn: {
//     position: 'absolute',
//     top: 60,
//     right: 20,
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   settingsIcon: {
//     fontSize: 20,
//     color: '#282828',
//   },
//   avatarContainer: {
//     marginBottom: 12,
//   },
//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 24,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#282828',
//     marginBottom: 4,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     marginBottom: 10,
//   },
//   locationText: {
//     fontSize: 13,
//     color: '#007AFF',
//     fontWeight: '500',
//   },
//   bio: {
//     fontSize: 13,
//     color: '#838385',
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 18,
//   },
//
//   // Stats
//   statsRow: {
//     flexDirection: 'row',
//     gap: 30,
//     marginBottom: 18,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#282828',
//   },
//   statLabel: {
//     fontSize: 11,
//     color: '#838385',
//     fontWeight: '500',
//   },
//
//   // Actions
//   actionRow: {
//     flexDirection: 'row',
//     gap: 10,
//     width: '100%',
//   },
//   editBtn: {
//     flex: 1,
//     height: 44,
//     borderRadius: 15,
//     backgroundColor: '#282828',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editBtnText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#F2F2F2',
//   },
//   stravaBtn: {
//     width: 80,
//     height: 44,
//     borderRadius: 15,
//     backgroundColor: '#FC4C02',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//
//   // Tabs
//   tabRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 24,
//     marginTop: 16,
//     marginBottom: 12,
//     gap: 24,
//   },
//   tab: {
//     paddingVertical: 6,
//   },
//   tabActive: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#282828',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#838385',
//   },
//   tabTextActive: {
//     fontWeight: '600',
//     color: '#282828',
//   },
//
//   // Grid
//   gridContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 8,
//     gap: 8,
//   },
//   gridColumn: {
//     flex: 1,
//     gap: 8,
//   },
//   gridCard: {
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   gridImage: {
//     width: '100%',
//   },
// });
