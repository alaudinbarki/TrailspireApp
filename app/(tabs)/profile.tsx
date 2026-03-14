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
import Svg, { Path, SvgUri } from 'react-native-svg';
import { ArrowUpRightIcon } from '../../src/components/icons/ArrowUpRightIcon';
import { MapPinIcon } from '../../src/components/icons/MapPinIcon';

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
    { key: 'profile-1', type: 'icon', source: require('../../assets/profile/profile-1.svg') },
    { key: 'profile-2', type: 'icon', source: require('../../assets/profile/profile-2.svg') },
    { key: 'profile-3', type: 'icon', source: require('../../assets/profile/profile-3.svg') },
    { key: 'profile-4', type: 'icon', source: require('../../assets/profile/profile-4.svg') },
    { key: 'profile-5', type: 'icon', source: require('../../assets/profile/profile-5.svg') },
    { key: 'profile-6', type: 'icon', source: require('../../assets/profile/profile-6.svg') },
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
    const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
    const [activeNav, setActiveNav] = useState('all');
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

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
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
                                    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
                                        <Path
                                            d="M5.74014 2.90408C5.50052 3.02249 5.21589 3.02301 4.98763 2.88394L4.12097 2.35593C3.86675 2.20105 3.54172 2.21438 3.31511 2.40742C2.98892 2.6853 2.68531 2.98891 2.40743 3.31512C2.21438 3.54174 2.20104 3.86677 2.35593 4.121L2.88391 4.98762C3.02297 5.21588 3.02244 5.50051 2.90404 5.74014C2.78714 5.97675 2.6848 6.22184 2.5982 6.47424C2.51179 6.72607 2.31137 6.92645 2.05264 6.98926L1.0605 7.23015C0.7718 7.30025 0.551642 7.5387 0.527268 7.83479C0.509211 8.05414 0.5 8.27599 0.5 8.5C0.5 8.70601 0.507785 8.91019 0.523078 9.11228C0.54562 9.41016 0.766428 9.65083 1.05673 9.72132L2.03523 9.9589C2.29609 10.0222 2.49749 10.2253 2.58264 10.4799C2.6697 10.7402 2.77345 10.9928 2.89262 11.2366C3.0095 11.4756 3.00938 11.7589 2.87093 11.9861L2.33902 12.8591C2.18459 13.1126 2.19733 13.4366 2.389 13.6632C2.66184 13.9858 2.95974 14.2865 3.27973 14.5623C3.50631 14.7575 3.83311 14.7718 4.08856 14.6162L4.94478 14.0946C5.17469 13.9545 5.46163 13.9561 5.70217 14.077C5.95398 14.2036 6.21555 14.3136 6.48543 14.4056C6.73792 14.4917 6.93894 14.6924 7.00188 14.9516L7.24195 15.9404C7.31213 16.2295 7.55112 16.4499 7.84764 16.4738C8.06281 16.4911 8.28037 16.5 8.5 16.5C8.70166 16.5 8.90155 16.4925 9.09944 16.4779C9.39776 16.4558 9.63897 16.2348 9.70955 15.9441L9.94634 14.9689C10.0098 14.7075 10.2136 14.5059 10.4688 14.4211C10.7466 14.3287 11.0158 14.2174 11.2747 14.0885C11.5147 13.9692 11.8002 13.9682 12.0291 14.1077L12.8917 14.6332C13.1464 14.7884 13.4722 14.7747 13.6988 14.5807C14.0151 14.31 14.31 14.0151 14.5807 13.6987C14.7746 13.4721 14.7883 13.1464 14.6332 12.8917L14.1076 12.0292C13.9682 11.8003 13.9691 11.5147 14.0885 11.2748C14.2173 11.0158 14.3287 10.7466 14.4211 10.4688C14.5059 10.2135 14.7076 10.0098 14.969 9.94632L15.9441 9.70956C16.2348 9.63897 16.4558 9.39773 16.4779 9.09938C16.4925 8.9015 16.5 8.70162 16.5 8.5C16.5 8.28032 16.4912 8.0627 16.4738 7.8475C16.4498 7.55104 16.2296 7.31215 15.9405 7.24198L14.9516 7.00186C14.6924 6.93892 14.4918 6.73792 14.4057 6.48544C14.3136 6.21555 14.2036 5.95398 14.077 5.70217C13.9561 5.46162 13.9545 5.17467 14.0946 4.94475L14.6162 4.0886C14.7719 3.83313 14.7576 3.5063 14.5622 3.2797C14.2864 2.95973 13.9858 2.66182 13.6632 2.389C13.4366 2.19733 13.1126 2.18459 12.8591 2.33902L11.9861 2.87093C11.7589 3.00938 11.4756 3.0095 11.2365 2.89262C10.9928 2.77345 10.7402 2.66971 10.4799 2.58266C10.2253 2.49751 10.0222 2.29609 9.95887 2.03521L9.72134 1.05676C9.65086 0.766449 9.4102 0.545629 9.1123 0.523083C8.9102 0.507788 8.706 0.5 8.5 0.5C8.27598 0.5 8.05412 0.509208 7.83476 0.527264C7.53867 0.551637 7.30023 0.7718 7.23014 1.0605L6.98928 2.05261C6.92646 2.31134 6.72609 2.51177 6.47425 2.59819C6.22184 2.6848 5.97676 2.78716 5.74014 2.90408Z"
                                            stroke="#1E1E1E"
                                        />
                                    </Svg>
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
                                        <Svg width={18} height={15} viewBox="0 0 31 25" fill="none">
                                            <Path d="M24.1253 0L4.94257 0.00158761C0.813781 0.169662 -0.000935775 1.89526 0 5.19387L0.00133372 13.4502C-0.000665515 16.7611 -0.0680461 20.0487 4.94257 19.8007L4.93893 22.9359C4.93886 23.407 4.63737 25.0678 5.5684 24.9979C5.83825 24.9775 13.119 20.3338 14.2006 19.8007H19.3296L23.612 19.8041C24.6863 19.8046 25.8855 19.9035 26.9295 19.676C29.906 19.0274 30.1596 17.0026 30.1596 14.8406L30.1585 4.12082C30.1475 0.28529 27.8711 -0.00157322 24.1253 0Z" fill="#616264" />
                                        </Svg>
                                    </TouchableOpacity>
                                    <Text style={styles.followChatBelowText}>Chat</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.gridComboWrap}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path d="M6.97024 4.25003L8.01024 4.25003C10.0202 4.25003 10.9902 5.18003 10.9902 7.10003L10.9902 18.9C10.9902 19.31 10.6502 19.65 10.2402 19.65C9.83023 19.65 9.49023 19.31 9.49023 18.9L9.49024 7.10003C9.49024 6.09003 9.28024 5.75003 8.01024 5.75003L6.97024 5.75003C5.70024 5.75003 5.49024 6.09003 5.49024 7.10003L5.49023 18.9C5.49023 19.31 5.15023 19.65 4.74023 19.65C4.33023 19.65 3.99023 19.31 3.99023 18.9L3.99024 7.10003C3.99024 5.18003 4.96024 4.25003 6.97024 4.25003Z" fill="#C4C4C4" />
                        <Path d="M15.4702 9.25003L16.5102 9.25003C18.5202 9.25003 19.4902 10.18 19.4902 12.1L19.4902 18.9C19.4902 19.31 19.1502 19.65 18.7402 19.65C18.3302 19.65 17.9902 19.31 17.9902 18.9L17.9902 12.1C17.9902 11.09 17.7802 10.75 16.5102 10.75L15.4702 10.75C14.2002 10.75 13.9902 11.09 13.9902 12.1L13.9902 18.9C13.9902 19.31 13.6502 19.65 13.2402 19.65C12.8302 19.65 12.4902 19.31 12.4902 18.9L12.4902 12.1C12.4902 10.18 13.4602 9.25003 15.4702 9.25003Z" fill="#C4C4C4" />
                        <Path d="M2 18.25L22 18.25C22.42 18.25 22.75 18.59 22.75 19C22.75 19.41 22.42 19.75 22 19.75L2 19.75C1.59 19.75 1.25 19.41 1.25 19C1.25 18.59 1.58 18.25 2 18.25Z" fill="#C4C4C4" />
                    </Svg>
                    <Svg width={2} height={28} viewBox="0 0 2 28" fill="none">
                        <Path d="M0.75 0.75L0.749999 26.75" stroke="#D9D9D9" strokeWidth={1.5} strokeLinecap="round" />
                    </Svg>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path d="M9.37 22.75H4.62C2.32 22.75 1.25 21.68 1.25 19.38V14.63C1.25 12.32 2.32 11.25 4.62 11.25H7C7.41 11.25 7.75 11.59 7.75 12V14.37C7.75 15.83 8.17 16.25 9.62 16.25H12C12.41 16.25 12.75 16.59 12.75 17V19.38C12.75 21.68 11.68 22.75 9.37 22.75ZM4.62 12.75C3.17 12.75 2.75 13.17 2.75 14.63V19.38C2.75 20.83 3.17 21.25 4.62 21.25H9.37C10.83 21.25 11.25 20.83 11.25 19.38V17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V12.75H4.62Z" fill="#1F1F1F" />
                        <Path d="M14.37 17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V9.62C6.25 7.32 7.32 6.25 9.62 6.25H12C12.41 6.25 12.75 6.59 12.75 7V9.37C12.75 10.83 13.17 11.25 14.62 11.25H17C17.41 11.25 17.75 11.59 17.75 12V14.37C17.75 16.68 16.68 17.75 14.37 17.75ZM9.62 7.75C8.17 7.75 7.75 8.17 7.75 9.62V14.37C7.75 15.83 8.17 16.25 9.62 16.25H14.37C15.83 16.25 16.25 15.83 16.25 14.37V12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V7.75H9.62Z" fill="#1F1F1F" />
                        <Path d="M19.37 12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V4.62C11.25 2.32 12.32 1.25 14.62 1.25H19.37C21.68 1.25 22.75 2.32 22.75 4.62V9.37C22.75 11.68 21.68 12.75 19.37 12.75ZM14.62 2.75C13.17 2.75 12.75 3.17 12.75 4.62V9.37C12.75 10.83 13.17 11.25 14.62 11.25H19.37C20.83 11.25 21.25 10.83 21.25 9.37V4.62C21.25 3.17 20.83 2.75 19.37 2.75H14.62Z" fill="#1F1F1F" />
                    </Svg>
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
                                    <SvgUri
                                        uri={Image.resolveAssetSource(item.source).uri}
                                        width={18}
                                        height={18}
                                    />
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Text style={styles.atlasTitle}>Your Atlas</Text>

                <View style={styles.atlasHeroWrap}>
                    <Image source={IMAGES.landscape} style={styles.atlasHeroImage} resizeMode="cover" />
                </View>

                <View style={styles.gridStackCard}>

                    <View style={{
                        width: 45, height: 6,
                        borderRadius: 3,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: "#A0A0A0"
                    }} />
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
        paddingBottom: 110,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        columnGap: 4,
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
