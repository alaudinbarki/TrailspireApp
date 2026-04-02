import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type { DimensionValue } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { SearchIcon } from '../src/components/icons/SearchIcon';
const ROUTE_ICON_W = 139;
const ROUTE_ICON_H = 72;

const DATA_PANEL_H = 82;
const COL_W = 200;
const GAP = 6;
const FULL_W = COL_W * 2 + GAP;
const SIDE_PAD = 0;

interface CollectionOption {
  id: number;
  title: string;
  count: number;
  privacy: 'private' | 'shared';
  image: any;
}

const COLLECTION_OPTIONS: CollectionOption[] = [
  {
    id: 1,
    title: 'Skitouring Switzerland',
    count: 29,
    privacy: 'private',
    image: require('../assets/images/feed/skitouring_cover.png'),
  },
  {
    id: 2,
    title: 'Utah Trails',
    count: 9,
    privacy: 'shared',
    image: require('../assets/images/feed/collection_preview_1.png'),
  },
  {
    id: 3,
    title: 'Bikers',
    count: 46,
    privacy: 'private',
    image: require('../assets/images/feed/bikers_cover.png'),
  },
  {
    id: 4,
    title: 'Norway ski trip',
    count: 12,
    privacy: 'private',
    image: require('../assets/images/feed/norway_ski_cover.png'),
  },
];

const CURRENT_COLLECTION = {
  title: 'Profile',
  privacy: 'private' as const,
  image: require('../assets/images/feed/profile_photo1.png'),
};

function StatCurve() {
  return (
    <View style={styles.statCurveWrap}>
      <Svg width="100%" height={10} viewBox="0 0 88 10" fill="none" preserveAspectRatio="none">
        <Path
          d="M0.5 9.33627C7.53988 8.45449 10.667 6.7981 12.486 5.34054C14.7906 3.49389 17.4941 2.93532 20.3859 3.53404L24.7941 4.44669C27.2185 4.94863 29.715 4.99606 32.1567 4.58657L42.212 2.90026C43.3051 2.71695 44.4115 2.62481 45.5199 2.62481H50.2363C51.6553 2.62481 53.0503 2.25889 54.2865 1.5624C56.5593 0.2819 59.3038 0.151634 61.6877 1.2111L64.8687 2.62481L68.1903 4.47588C69.0586 4.95974 69.8457 5.57658 70.5231 6.30399C72.3241 8.2379 74.8478 9.33627 77.4904 9.33627H79.8814H87.2089"
          stroke="#282828"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

function LockMetaIcon() {
  return (
    <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
      <Path
        d="M4.53333 8V5.86667C4.53333 3.95542 6.08876 2.4 8 2.4C9.91124 2.4 11.4667 3.95542 11.4667 5.86667V8M5.6 17H10.4C12.6419 17 13.7629 17 14.4595 16.3035C15.156 15.6069 15.156 14.4859 15.156 12.244V12.2227C15.156 9.9808 15.156 8.85984 14.4595 8.16329C13.7629 7.46674 12.6419 7.46674 10.4 7.46674H5.6C3.3581 7.46674 2.23715 7.46674 1.54059 8.16329C0.844044 8.85984 0.844044 9.9808 0.844044 12.2227V12.244C0.844044 14.4859 0.844044 15.6069 1.54059 16.3035C2.23715 17 3.3581 17 5.6 17Z"
        stroke="#6B6B6B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SharedMetaIcon() {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none">
      <Path
        d="M11.7712 5.54492C13.1661 5.54492 14.297 4.41397 14.297 3.01905C14.297 1.62413 13.1661 0.493179 11.7712 0.493179C10.3762 0.493179 9.2453 1.62413 9.2453 3.01905C9.2453 4.41397 10.3762 5.54492 11.7712 5.54492ZM4.22744 5.54492C5.62236 5.54492 6.75331 4.41397 6.75331 3.01905C6.75331 1.62413 5.62236 0.493179 4.22744 0.493179C2.83252 0.493179 1.70157 1.62413 1.70157 3.01905C1.70157 4.41397 2.83252 5.54492 4.22744 5.54492ZM11.7712 16.4932C13.1661 16.4932 14.297 15.3622 14.297 13.9673C14.297 12.5724 13.1661 11.4414 11.7712 11.4414C10.3762 11.4414 9.2453 12.5724 9.2453 13.9673C9.2453 15.3622 10.3762 16.4932 11.7712 16.4932ZM4.22744 16.4932C5.62236 16.4932 6.75331 15.3622 6.75331 13.9673C6.75331 12.5724 5.62236 11.4414 4.22744 11.4414C2.83252 11.4414 1.70157 12.5724 1.70157 13.9673C1.70157 15.3622 2.83252 16.4932 4.22744 16.4932ZM5.91156 4.59772L10.0844 11.4415M10.0884 4.59772L5.91562 11.4415"
        stroke="#6B6B6B"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CommentActions() {
  return (
    <View style={styles.commentActions}>
      <TouchableOpacity style={styles.commentActionBtn} activeOpacity={0.7} onPress={() => { }}>
        <Svg width={14} height={15} viewBox="0 0 14 15" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.95159 1.06292L7.38932 6.13636H12.0909C12.7938 6.13636 13.3636 6.74689 13.3636 7.5V12.2727C13.3636 13.0258 12.7938 13.6364 12.0909 13.6364H3.81818V6.13636H4.4929L6.21203 0.909424C6.25689 0.773043 6.37717 0.681818 6.51213 0.681818L7.63562 0.681818C7.82622 0.681818 7.97406 0.860137 7.95159 1.06292ZM3.76387 5.45455H4.04243L5.61184 0.682815C5.74641 0.273673 6.10724 0 6.51213 0L7.63562 1.05235e-07C8.20742 1.58793e-07 8.65093 0.534953 8.58351 1.14332L8.10572 5.45455H12.0909C13.1453 5.45455 14 6.37033 14 7.5V12.2727C14 13.4024 13.1453 14.3182 12.0909 14.3182H3.76387C3.63283 14.7154 3.27925 15 2.86364 15H0.954545C0.427365 15 0 14.5421 0 13.9773V5.79545C0 5.23062 0.427365 4.77273 0.954545 4.77273H2.86364C3.27925 4.77273 3.63283 5.05732 3.76387 5.45455ZM3.18182 5.79545C3.18182 5.60718 3.03936 5.45455 2.86364 5.45455H0.954545C0.778819 5.45455 0.636364 5.60718 0.636364 5.79545V13.9773C0.636364 14.1656 0.778818 14.3182 0.954545 14.3182H2.86364C3.03936 14.3182 3.18182 14.1656 3.18182 13.9773V5.79545Z"
            fill="#1E1E1E"
          />
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity style={styles.commentActionBtn} activeOpacity={0.7} onPress={() => { }}>
        <Svg width={14} height={15} viewBox="0 0 14 15" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0455 9.54545H11.1364C10.9607 9.54545 10.8183 9.39293 10.8182 9.20473C10.8182 9.20467 10.8182 9.20461 10.8182 9.20455L10.8182 1.02273C10.8182 0.834448 10.9606 0.681818 11.1364 0.681818L13.0455 0.681818C13.2212 0.681818 13.3636 0.834449 13.3636 1.02273L13.3636 9.20455C13.3636 9.39282 13.2212 9.54545 13.0455 9.54545ZM10.2361 0.681817C10.3672 0.284593 10.7207 -3.89295e-08 11.1364 0L13.0455 1.78819e-07C13.5726 2.68229e-07 14 0.457891 14 1.02273L14 9.20455C14 9.76938 13.5726 10.2273 13.0455 10.2273H11.1364C10.7207 10.2273 10.3672 9.94268 10.2361 9.54545H9.95757L8.38815 14.3172C8.25359 14.7263 7.89275 15 7.48787 15H6.36438C5.79258 15 5.34907 14.465 5.41649 13.8567L5.89428 9.54545H1.90909C0.854729 9.54545 -9.21752e-08 8.62967 0 7.5L3.89429e-07 2.72727C4.81604e-07 1.5976 0.85473 0.681816 1.90909 0.681816L10.2361 0.681817ZM10.1818 1.36364L1.90909 1.36363C1.20618 1.36363 0.636364 1.97416 0.636364 2.72727L0.636364 7.5C0.636364 8.25311 1.20618 8.86363 1.90909 8.86363H6.61068L6.04841 13.9371C6.02594 14.1399 6.17378 14.3182 6.36438 14.3182H7.48787C7.62283 14.3182 7.74311 14.227 7.78797 14.0906L9.5071 8.86364H10.1818L10.1818 1.36364Z"
            fill="#1E1E1E"
          />
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity style={styles.commentActionBtn} activeOpacity={0.7} onPress={() => { }}>
        <Svg width={10} height={13} viewBox="0 0 10 13" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.49236 5.21964C9.5381 5.04914 9.43688 4.87382 9.26628 4.82805C9.09568 4.78228 8.9203 4.8834 8.87456 5.0539L7.20053 11.2941L0.772246 0.159995C0.683955 0.00707089 0.488369 -0.0453978 0.335393 0.0428026C0.182417 0.131003 0.129979 0.326473 0.21827 0.479398L6.64655 11.6135L0.402683 9.93849C0.23208 9.89272 0.0567023 9.99384 0.0109626 10.1643C-0.0347768 10.3348 0.0664438 10.5102 0.237045 10.5559L6.76332 12.3067C7.18982 12.4211 7.62827 12.1683 7.74262 11.7421L9.49236 5.21964Z"
            fill="#1E1E1E"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

interface CardData {
  id: string;
  image: any;
  totalH: number;
  type: string;
  elev: string;
  dist: string;
  time: string;
  username: string;
  avatar: any;
  elevPct: DimensionValue;
  distPct: DimensionValue;
  timePct: DimensionValue;
}

const RELATED_LEFT: CardData[] = [
  {
    id: 'rl1',
    image: require('../assets/images/feed/figma_card_1.png'),
    totalH: 189,
    type: 'Trail Running',
    elev: '2550mt', elevPct: '90%',
    dist: '33km', distPct: '80%',
    time: '5d 3h', timePct: '55%',
    username: '@rebsix',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
  {
    id: 'rl2',
    image: require('../assets/images/feed/figma_card_3.png'),
    totalH: 239,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@nik_66',
    avatar: require('../assets/images/feed/figma_profile_nik66.png'),
  },
  {
    id: 'rl3',
    image: require('../assets/images/feed/figma_card_8.png'),
    totalH: 239,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@gioforty',
    avatar: require('../assets/images/feed/figma_profile_gioforty.png'),
  },
  {
    id: 'rl4',
    image: require('../assets/images/feed/figma_card_10.png'),
    totalH: 286,
    type: 'Trail Running',
    elev: '1800mt', elevPct: '70%',
    dist: '11km', distPct: '30%',
    time: '2d 5h', timePct: '35%',
    username: '@_ashley',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
];

const RELATED_RIGHT: CardData[] = [
  {
    id: 'rr1',
    image: require('../assets/images/feed/figma_card_2.png'),
    totalH: 286,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@cusmin',
    avatar: require('../assets/images/feed/figma_profile_cusmin.png'),
  },
  {
    id: 'rr2',
    image: require('../assets/images/feed/figma_card_5.png'),
    totalH: 286,
    type: 'Trail Running',
    elev: '1800mt', elevPct: '70%',
    dist: '11km', distPct: '30%',
    time: '2d 5h', timePct: '35%',
    username: '@julian_',
    avatar: require('../assets/images/feed/figma_profile_julian.png'),
  },
  {
    id: 'rr3',
    image: require('../assets/images/feed/figma_card_9.png'),
    totalH: 286,
    type: 'Backcountry Skiing',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@lollomag',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
  {
    id: 'rr4',
    image: require('../assets/images/feed/figma_card_11.png'),
    totalH: 192,
    type: 'Free Skiing',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@marconuvolari87',
    avatar: require('../assets/images/feed/figma_profile_marconuvolari87.png'),
  },
];

function ActivityCard({ card, width }: { card: CardData; width: number }) {
  const imageH = card.totalH - DATA_PANEL_H;
  return (
    <View style={[styles.cardWrapper, { width }]}>
      <View style={styles.cardUserRow}>
        <Image source={card.avatar} style={styles.userAvatar} />
        <Text style={styles.username}>{card.username}</Text>
      </View>

      <View style={styles.card}>
        <Image source={card.image} style={[styles.cardImage, { height: imageH }]} resizeMode="cover" />

        <View style={styles.terrainBadge}>
          <View style={{ transform: [{ rotate: '170deg' }] }}>
            <View style={styles.routeBtnInner} />
          </View>
        </View>

      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsActivityType}>{card.type}</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Elevation</Text>
          <StatCurve />
          <Text style={styles.statValue}>{card.elev}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Distance</Text>
          <View style={styles.statBarBg}>
            <View style={[styles.statBarFill, { width: card.distPct }]} />
          </View>
          <Text style={styles.statValue}>{card.dist}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Time</Text>
          <View style={styles.statSpacer} />
          <Text style={styles.statValue}>{card.time}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ActivityDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCollectionSheetOpen, setIsCollectionSheetOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(2);
  const [collectionSearch, setCollectionSearch] = useState('');
  const relatedCards = [...RELATED_LEFT, ...RELATED_RIGHT];
  const fullCards = relatedCards.filter((_, i) => i % 5 === 0);
  const gridCards = relatedCards.filter((_, i) => i % 5 !== 0);
  const leftCards = gridCards.filter((_, i) => i % 2 === 0);
  const rightCards = gridCards.filter((_, i) => i % 2 === 1);
  const filteredCollections = COLLECTION_OPTIONS.filter((collection) =>
    collection.title.toLowerCase().includes(collectionSearch.trim().toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top Activity Header (Page Style) ─────────────────── */}
        <View style={styles.topActionPhoto}>
          <Text style={styles.topActivityLabel}>Activity Data</Text>
          <Text style={styles.topTimestamp}>11:18 PM · May 31, 2026 · Oslo, Norway</Text>
        </View>

        <View style={styles.featuredStartCard}>
          <Image
            source={require('../assets/images/feed/figma_card_7.png')}
            style={styles.featuredStartImage}
            resizeMode="cover"
          />

          <TouchableOpacity style={styles.featuredImageActionBtn} activeOpacity={0.75} onPress={() => { }}>
            <Svg width={50} height={50} viewBox="0 0 44 44" fill="none" style={styles.featuredImageActionBg}>
              <Defs>
                <LinearGradient id="featuredBtnGradient" x1="22" y1="44" x2="22" y2="0" gradientUnits="userSpaceOnUse">
                  <Stop stopColor="rgba(245, 245, 245, 0.4)" />
                  <Stop offset="1" stopColor="rgba(245, 245, 245, 0.4)" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="44" height="44" fill="#0F0F0F" />
              <Rect x="0" y="0" width="44" height="44" fill="url(#featuredBtnGradient)" />
            </Svg>

            <Svg width={28} height={22} viewBox="0 0 28 22" fill="none" style={styles.featuredImageActionIcon}>
              <Path
                d="M10.6445 4.64795C10.4219 4.64795 10.2271 4.57373 10.0601 4.42529C9.89925 4.27686 9.81885 4.08512 9.81885 3.8501C9.81885 3.62744 9.90544 3.42643 10.0786 3.24707L13.1216 0.324707C13.2515 0.201009 13.3752 0.117513 13.4927 0.0742188C13.6102 0.0247396 13.7308 0 13.8545 0C13.9844 0 14.1081 0.0247396 14.2256 0.0742188C14.3493 0.117513 14.473 0.201009 14.5967 0.324707L17.6396 3.24707C17.8128 3.42643 17.8994 3.62744 17.8994 3.8501C17.8994 4.08512 17.8159 4.27686 17.6489 4.42529C17.4819 4.57373 17.2871 4.64795 17.0645 4.64795C16.8109 4.64795 16.6006 4.55827 16.4336 4.37891L15.1997 3.05225L13.8545 1.29883L12.5278 3.05225L11.2847 4.37891C11.1115 4.55827 10.8981 4.64795 10.6445 4.64795ZM13.8545 13.9531C13.5947 13.9531 13.3721 13.8604 13.1865 13.6748C13.001 13.4893 12.9082 13.2728 12.9082 13.0254V3.79443L13.0938 1.01123C13.1123 0.800944 13.1927 0.621582 13.335 0.473145C13.4772 0.318522 13.6504 0.241211 13.8545 0.241211C14.071 0.241211 14.2503 0.318522 14.3926 0.473145C14.5348 0.621582 14.6152 0.800944 14.6338 1.01123L14.8101 3.79443V13.0254C14.8101 13.2728 14.7173 13.4893 14.5317 13.6748C14.3524 13.8604 14.1266 13.9531 13.8545 13.9531ZM9.41992 21.5791C8.12109 21.5791 7.11914 21.2266 6.41406 20.5215C5.71517 19.8226 5.36572 18.8237 5.36572 17.5249V10.3721C5.36572 9.06706 5.71517 8.0651 6.41406 7.36621C7.11914 6.66732 8.12109 6.31787 9.41992 6.31787H11.1548V8.37744H9.50342C8.84163 8.37744 8.32829 8.5568 7.96338 8.91553C7.60465 9.27425 7.42529 9.7876 7.42529 10.4556V17.4414C7.42529 18.1032 7.60465 18.6134 7.96338 18.9722C8.32829 19.3371 8.84163 19.5195 9.50342 19.5195H18.2148C18.8828 19.5195 19.3962 19.3371 19.7549 18.9722C20.1136 18.6134 20.293 18.1032 20.293 17.4414V10.4556C20.293 9.7876 20.1136 9.27425 19.7549 8.91553C19.3962 8.5568 18.8828 8.37744 18.2148 8.37744H16.5635V6.31787H18.2983C19.6034 6.31787 20.6053 6.66732 21.3042 7.36621C22.0093 8.0651 22.3618 9.06706 22.3618 10.3721V17.5249C22.3618 18.8237 22.0093 19.8226 21.3042 20.5215C20.6053 21.2266 19.6034 21.5791 18.2983 21.5791H9.41992Z"
                fill="#211906"
              />
            </Svg>
          </TouchableOpacity>

          <View style={styles.featuredHandle}>
            <View style={styles.featuredHandleGroup}>
              <View style={styles.featuredUnion} />
              <View style={styles.featuredUnion} />
              <View style={styles.featuredUnion} />
            </View>
          </View>
        </View>
        <View style={styles.mapCard}>
          <Image
            source={require('../assets/images/feed/activity_map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
          {/* Route icon — centred on the visible portion below the -50 overlap */}
          <View style={styles.mapRouteIconWrap} pointerEvents="none">
            <Svg width={ROUTE_ICON_W} height={ROUTE_ICON_H} viewBox="0 0 139 72" fill="none">
              <Path
                d="M14.5491 35.1503C14.0531 36.4162 10.1121 36.0874 5.09432 35.0917C-1.26575 33.8297 0.234549 24.6128 6.49257 22.9156C12.4455 21.3011 35.4889 21.1702 40.5589 24.6828C52.3497 32.8515 64.6316 43.1629 72.0649 48.6319C75.5771 51.216 80.0065 51.4513 84.1171 49.9965L85.2828 49.5839C93.846 46.5533 103.39 49.2438 109.109 56.3009L114.1 62.459C114.738 63.2462 115.192 64.1657 115.43 65.1507C117.022 71.7536 124.513 72.6979 128.129 66.9483C135.482 55.2574 143.155 42.616 130.726 38.819C108.88 32.145 76.4036 8.83494 72.1857 2.83131C71.7863 2.26276 71.2559 1.90116 70.6231 1.7124C54.5425 -3.08382 41.505 17.6325 27.0825 26.2102C20.6319 30.0467 15.1316 33.6634 14.5491 35.1503Z"
                stroke="#007AFF"
                strokeWidth="2"
              />
            </Svg>
          </View>
          <TouchableOpacity style={styles.mapGpxBtn} activeOpacity={0.7} onPress={() => router.push('/gpx-route-view')}>
            <Text style={styles.mapGpxBtnText}>GPX</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postMapActionsRow}>
          <TouchableOpacity
            style={styles.moreIconPress}
            activeOpacity={0.7}
            onPress={() => setIsMoreMenuOpen((prev) => !prev)}
          >
            <Text style={styles.moreIconText}>...</Text>
          </TouchableOpacity>

          {isMoreMenuOpen && (
            <View style={styles.morePopupMenu}>
              <TouchableOpacity style={styles.morePopupItem} activeOpacity={0.7} onPress={() => setIsMoreMenuOpen(false)}>
                <View style={styles.morePopupItemContent}>
                  <Text style={styles.morePopupText}>Download</Text>
                  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M6.26042 18.7917H13.7498C17.2682 18.7917 18.6742 17.3858 18.6742 13.8675V13.8067C18.6742 13.4642 18.3915 13.1817 18.0492 13.1817C17.7069 13.1817 17.4242 13.4642 17.4242 13.8067V13.8675C17.4242 16.6833 16.5665 17.5417 13.7498 17.5417H6.26042C3.44377 17.5417 2.58611 16.6833 2.58611 13.8675V13.8067C2.58611 13.4642 2.30338 13.1817 1.96111 13.1817C1.61884 13.1817 1.33611 13.4642 1.33611 13.8067V13.8675C1.33611 17.3858 2.74211 18.7917 6.26042 18.7917Z"
                      fill="#F2F2F2"
                    />
                    <Path
                      d="M10.0002 12.8334C10.1586 12.8334 10.3161 12.7742 10.4402 12.6492L13.6303 9.45927C13.8745 9.21507 13.8745 8.81927 13.6303 8.57507C13.3861 8.33087 12.9903 8.33087 12.7461 8.57507L10.6252 10.696V1.625C10.6252 1.2825 10.3427 1 10.0002 1C9.65766 1 9.37516 1.2825 9.37516 1.625V10.696L7.25426 8.57507C7.01006 8.33087 6.61426 8.33087 6.37006 8.57507C6.12586 8.81927 6.12586 9.21507 6.37006 9.45927L9.56016 12.6492C9.68426 12.7742 9.84176 12.8334 10.0002 12.8334Z"
                      fill="#F2F2F2"
                    />
                  </Svg>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.morePopupItem} activeOpacity={0.7} onPress={() => setIsMoreMenuOpen(false)}>
                <View style={styles.morePopupItemContent}>
                  <Text style={styles.morePopupText}>Share via...</Text>
                  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.8182 0.909091H17.2727C18.2769 0.909091 19.0909 1.72312 19.0909 2.72727V3.18182C19.0909 4.18597 18.2769 5 17.2727 5H16.8182C15.814 5 15 4.18597 15 3.18182V2.72727C15 1.72312 15.814 0.909091 16.8182 0.909091ZM14.0909 2.72727C14.0909 1.22104 15.3119 0 16.8182 0H17.2727C18.779 0 20 1.22104 20 2.72727V3.18182C20 4.68805 18.779 5.90909 17.2727 5.90909H16.8182C15.8493 5.90909 14.9985 5.4039 14.5147 4.64256L5.7956 8.99164C5.86943 9.23909 5.90909 9.50128 5.90909 9.77273V10.2273C5.90909 10.5099 5.8661 10.7825 5.78629 11.0389L14.488 15.4002C14.9668 14.6151 15.8313 14.0909 16.8182 14.0909H17.2727C18.779 14.0909 20 15.3119 20 16.8182V17.2727C20 18.779 18.779 20 17.2727 20H16.8182C15.312 20 14.0909 18.779 14.0909 17.2727V16.8182C14.0909 16.6226 14.1115 16.4319 14.1506 16.248L5.37447 11.8494C4.8776 12.5199 4.08047 12.9545 3.18182 12.9545H2.72727C1.22104 12.9545 0 11.7335 0 10.2273V9.77273C0 8.2665 1.22104 7.04545 2.72727 7.04545H3.18182C4.09193 7.04545 4.89792 7.49125 5.39333 8.17639L14.1619 3.80263C14.1155 3.6032 14.0909 3.39538 14.0909 3.18182V2.72727ZM16.8182 15H17.2727C18.2769 15 19.0909 15.814 19.0909 16.8182V17.2727C19.0909 18.2769 18.2769 19.0909 17.2727 19.0909H16.8182C15.814 19.0909 15 18.2769 15 17.2727V16.8182C15 15.814 15.814 15 16.8182 15ZM3.18182 7.95454H2.72727C1.72312 7.95454 0.909091 8.76857 0.909091 9.77273V10.2273C0.909091 11.2314 1.72312 12.0455 2.72727 12.0455H3.18182C4.18597 12.0455 5 11.2314 5 10.2273V9.77273C5 8.76857 4.18597 7.95454 3.18182 7.95454Z"
                      fill="#F2F2F2"
                    />
                  </Svg>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.morePopupItem} activeOpacity={0.7} onPress={() => setIsMoreMenuOpen(false)}>
                <View style={styles.morePopupItemContent}>
                  <Text style={[styles.morePopupText, { color: "red" }]}>Report</Text>
                  <View style={styles.morePopupIconSpacer} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.likePillBtn} activeOpacity={0.7} onPress={() => { }}>
            <Svg width={16} height={23} viewBox="0 0 16 23" fill="none">
              <Path
                d="M7.17013 0.525601C7.76245 -0.446214 9.32279 0.0274738 9.21947 1.14774L8.45714 9.4131L14.8967 9.4131C15.7466 9.4131 16.2764 10.2937 15.8487 10.9954L8.8523 22.4743C8.25882 23.4481 6.69534 22.9703 6.80333 21.8482L7.59484 13.6235H7.06374L7.05998 13.6235H1.10329C0.253407 13.6235 -0.276381 12.7429 0.151328 12.0412L7.17013 0.525601Z"
                fill="#007AFF"
              />
            </Svg>
            <Text style={styles.likePillCount}>234</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.centerSquareBtn} activeOpacity={0.7} onPress={() => { }}>
            <Svg width={23} height={23} viewBox="0 0 23 23" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.15816 0.375004C5.78299 0.375005 5.47885 0.679147 5.47885 1.05433C5.47885 1.42951 5.78299 1.73365 6.15816 1.73365L19.8893 1.73365L0.574117 21.0491C0.308828 21.3144 0.308829 21.7445 0.574117 22.0098C0.839406 22.2751 1.26952 22.2751 1.53481 22.0098L20.85 2.69437L20.85 16.4256C20.85 16.8008 21.1541 17.1049 21.5293 17.1049C21.9045 17.1049 22.2086 16.8008 22.2086 16.4256L22.2086 2.07331C22.2086 1.13536 21.4482 0.375002 20.5103 0.375004L6.15816 0.375004Z"
                fill="#282828"
                stroke="#282828"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryRectBtn}
            activeOpacity={0.7}
            onPress={() => setIsCollectionSheetOpen(true)}
          >
            <View style={styles.primaryPlusIcon}>
              <View style={styles.primaryPlusH} />
              <View style={styles.primaryPlusV} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inlineMetaRow}>
          <Image
            source={require('../assets/images/feed/friend_avatar_andyros.png')}
            style={styles.inlineMetaAvatar}
          />
          <View style={{
            flexDirection: "column",
            top: 10

          }}>
            <Text style={{

              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: '700',
              left: 6
            }}>@andyros</Text>
            <Text style={styles.inlineMetaText}>Did this route feel smooth?</Text>
          </View>
          <View style={styles.inlineMetaActions}>
            <TouchableOpacity style={styles.inlineMetaIconBtn} activeOpacity={0.7} onPress={() => { }}>
              <Svg width={14} height={15} viewBox="0 0 14 15" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.95159 1.06292L7.38932 6.13636H12.0909C12.7938 6.13636 13.3636 6.74689 13.3636 7.5V12.2727C13.3636 13.0258 12.7938 13.6364 12.0909 13.6364H3.81818V6.13636H4.4929L6.21203 0.909424C6.25689 0.773043 6.37717 0.681818 6.51213 0.681818L7.63562 0.681818C7.82622 0.681818 7.97406 0.860137 7.95159 1.06292ZM3.76387 5.45455H4.04243L5.61184 0.682815C5.74641 0.273673 6.10724 0 6.51213 0L7.63562 1.05235e-07C8.20742 1.58793e-07 8.65093 0.534953 8.58351 1.14332L8.10572 5.45455H12.0909C13.1453 5.45455 14 6.37033 14 7.5V12.2727C14 13.4024 13.1453 14.3182 12.0909 14.3182H3.76387C3.63283 14.7154 3.27925 15 2.86364 15H0.954545C0.427365 15 0 14.5421 0 13.9773V5.79545C0 5.23062 0.427365 4.77273 0.954545 4.77273H2.86364C3.27925 4.77273 3.63283 5.05732 3.76387 5.45455ZM3.18182 5.79545C3.18182 5.60718 3.03936 5.45455 2.86364 5.45455H0.954545C0.778819 5.45455 0.636364 5.60718 0.636364 5.79545V13.9773C0.636364 14.1656 0.778818 14.3182 0.954545 14.3182H2.86364C3.03936 14.3182 3.18182 14.1656 3.18182 13.9773V5.79545Z"
                  fill="#1E1E1E"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inlineMetaIconBtn} activeOpacity={0.7} onPress={() => { }}>
              <Svg width={14} height={15} viewBox="0 0 14 15" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0455 9.54545H11.1364C10.9607 9.54545 10.8183 9.39293 10.8182 9.20473C10.8182 9.20467 10.8182 9.20461 10.8182 9.20455L10.8182 1.02273C10.8182 0.834448 10.9606 0.681818 11.1364 0.681818L13.0455 0.681818C13.2212 0.681818 13.3636 0.834449 13.3636 1.02273L13.3636 9.20455C13.3636 9.39282 13.2212 9.54545 13.0455 9.54545ZM10.2361 0.681817C10.3672 0.284593 10.7207 -3.89295e-08 11.1364 0L13.0455 1.78819e-07C13.5726 2.68229e-07 14 0.457891 14 1.02273L14 9.20455C14 9.76938 13.5726 10.2273 13.0455 10.2273H11.1364C10.7207 10.2273 10.3672 9.94268 10.2361 9.54545H9.95757L8.38815 14.3172C8.25359 14.7263 7.89275 15 7.48787 15H6.36438C5.79258 15 5.34907 14.465 5.41649 13.8567L5.89428 9.54545H1.90909C0.854729 9.54545 -9.21752e-08 8.62967 0 7.5L3.89429e-07 2.72727C4.81604e-07 1.5976 0.85473 0.681816 1.90909 0.681816L10.2361 0.681817ZM10.1818 1.36364L1.90909 1.36363C1.20618 1.36363 0.636364 1.97416 0.636364 2.72727L0.636364 7.5C0.636364 8.25311 1.20618 8.86363 1.90909 8.86363H6.61068L6.04841 13.9371C6.02594 14.1399 6.17378 14.3182 6.36438 14.3182H7.48787C7.62283 14.3182 7.74311 14.227 7.78797 14.0906L9.5071 8.86364H10.1818L10.1818 1.36364Z"
                  fill="#1E1E1E"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inlineMetaIconBtn} activeOpacity={0.7} onPress={() => { }}>
              <Svg width={10} height={13} viewBox="0 0 10 13" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.49236 5.21964C9.5381 5.04914 9.43688 4.87382 9.26628 4.82805C9.09568 4.78228 8.9203 4.8834 8.87456 5.0539L7.20053 11.2941L0.772246 0.159995C0.683955 0.00707089 0.488369 -0.0453978 0.335393 0.0428026C0.182417 0.131003 0.129979 0.326473 0.21827 0.479398L6.64655 11.6135L0.402683 9.93849C0.23208 9.89272 0.0567023 9.99384 0.0109626 10.1643C-0.0347768 10.3348 0.0664438 10.5102 0.237045 10.5559L6.76332 12.3067C7.18982 12.4211 7.62827 12.1683 7.74262 11.7421L9.49236 5.21964Z"
                  fill="#1E1E1E"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Comments ─────────────────────────────────────────── */}
        <View style={styles.commentsSection}>
          <View style={styles.commentDividerTop} />
          <Text style={styles.commentsTitle}>Comments</Text>

          <View style={styles.commentRow}>
            <Image
              source={require('../assets/images/feed/figma_profile_rebsix.png')}
              style={styles.commentAvatar}
            />
            <View style={styles.commentBody}>
              <Text style={styles.commentHandle}>@nicoll.ed</Text>
              <Text style={styles.commentCaption}>Should have dont this too..! @remi</Text>
            </View>
            <CommentActions />
          </View>

          <View style={styles.commentThreadWrap}>
            <View style={styles.commentThreadMainLine} />
            <View style={styles.commentThreadBody}>
              <View style={styles.commentThreadSubWrap}>
                <View style={styles.commentThreadBendLarge} />
                <View style={styles.commentThreadBody}>
                  <View style={styles.commentRow}>
                    <Image
                      source={require('../assets/images/feed/figma_profile_cusmin.png')}
                      style={styles.commentAvatar}
                    />
                    <View style={styles.commentBody}>
                      <Text style={styles.commentHandle}>@remi</Text>
                      <Text style={styles.commentCaption}>next Wed is ours!</Text>
                    </View>
                    <CommentActions />
                  </View>

                  <View style={styles.commentThreadSubWrap}>
                    <View style={styles.commentThreadBendSmall} />
                    <View style={styles.commentThreadBody}>
                      <View style={styles.commentRow}>
                        <Image
                          source={require('../assets/images/feed/figma_profile_julian.png')}
                          style={styles.commentAvatar}
                        />
                        <View style={styles.commentBody}>
                          <Text style={styles.commentHandle}>@carl_north</Text>
                          <Text style={styles.commentCaption}>Lets download the GPX!</Text>
                        </View>
                        <CommentActions />
                      </View>
                    </View>
                  </View>

                  <View style={styles.commentRow}>
                    <Image
                      source={require('../assets/images/feed/figma_profile_cusmin.png')}
                      style={styles.commentAvatar}
                    />
                    <View style={styles.commentBody}>
                      <Text style={styles.commentHandle}>@aritz</Text>
                      <Text style={styles.commentCaption}>I recommend this trail is my fav!</Text>
                    </View>
                    <CommentActions />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.commentMoreBtn} activeOpacity={0.7} onPress={() => { }}>
            <Text style={styles.commentMoreBtnText}>more</Text>
          </TouchableOpacity>
          <View style={styles.commentDividerBottom} />
        </View>

        {/* ── Related ───────────────────────────────────────────── */}
        <View style={styles.relatedHeader}>
          <Text style={styles.relatedTitle}>Related</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
            <Text style={styles.moreBtn}>more</Text>
          </TouchableOpacity>
        </View>

        {
          fullCards[0] && (
            <TouchableOpacity key={fullCards[0].id} activeOpacity={0.85} onPress={() => { }}>
              <ActivityCard card={fullCards[0]} width={FULL_W} />
            </TouchableOpacity>
          )
        }

        {/* Masonry Grid */}
        <View style={styles.grid}>
          <View style={styles.column}>
            {leftCards.map((card) => (
              <TouchableOpacity key={card.id} activeOpacity={0.85} onPress={() => { }}>
                <ActivityCard card={card} width={COL_W} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.column, { marginLeft: GAP }]}>
            {rightCards.map((card) => (
              <TouchableOpacity key={card.id} activeOpacity={0.85} onPress={() => { }}>
                <ActivityCard card={card} width={COL_W} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {
          fullCards.slice(1).map((card) => (
            <TouchableOpacity key={card.id} activeOpacity={0.85} onPress={() => { }}>
              <ActivityCard card={card} width={FULL_W} />
            </TouchableOpacity>
          ))
        }

        <View style={styles.bottomSpacer} />
      </ScrollView >

      {/* Bottom close button */}
      <TouchableOpacity
        style={[styles.actionBtn, { bottom: 40 + insets.bottom }]}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
          <Path
            d="M2 2L16 16M16 2L2 16"
            stroke="#1F1F1F"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>

      {isCollectionSheetOpen && (
        <View style={styles.collectionSheetOverlay}>
          <TouchableOpacity
            style={styles.collectionSheetDismiss}
            activeOpacity={1}
            onPress={() => setIsCollectionSheetOpen(false)}
          />

          <View style={styles.collectionSheetWrap}>
            <View style={styles.collectionSheetTopBar}>
              <Text style={styles.collectionSheetTopTitle}>Activity Data</Text>
              <Text style={styles.collectionSheetTopSub}>11:18 PM · May 31, 2026 · Oslo, Norway</Text>
            </View>

            <Image
              source={require('../assets/images/feed/figma_card_7.png')}
              style={styles.collectionSheetHero}
              resizeMode="cover"
            />

            <View style={styles.collectionSheetPanel}>
              {/* <View style={styles.collectionSheetHandle} /> */}

              <View style={styles.collectionSheetHeaderRow}>
                <Text style={styles.collectionSheetTitle}>Your Collections</Text>
                <TouchableOpacity
                  style={styles.collectionSheetCloseBtn}
                  activeOpacity={0.7}
                  onPress={() => setIsCollectionSheetOpen(false)}
                >
                  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                    <Path
                      d="M2 2L16 16M16 2L2 16"
                      stroke="#F2F2F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>

              <View style={styles.collectionSheetCurrentRow}>
                <Image source={CURRENT_COLLECTION.image} style={styles.collectionSheetCurrentThumb} />

                <View style={styles.collectionSheetCurrentInfo}>
                  <Text style={styles.collectionSheetCurrentTitle}>{CURRENT_COLLECTION.title}</Text>
                  <View style={styles.collectionSheetMetaRow}>
                    <LockMetaIcon />
                    <Text style={styles.collectionSheetMetaText}>{CURRENT_COLLECTION.privacy}</Text>
                  </View>
                </View>

                <View style={[styles.collectionSelectCircle, styles.collectionSelectCircleActive]}>
                  <View style={styles.collectionSelectCircleInner} />
                </View>
              </View>

              <View style={styles.collectionSheetSearchWrap}>
                <SearchIcon width={16} height={16} color="#6B6B6B" />
                <TextInput
                  style={styles.collectionSheetSearchInput}
                  placeholder="Search"
                  placeholderTextColor="#6B6B6B"
                  value={collectionSearch}
                  onChangeText={setCollectionSearch}
                />
              </View>

              <View style={styles.collectionSheetCollectionsHeader}>
                <Text style={styles.collectionSheetListLabel}>Collections</Text>
                <TouchableOpacity
                  style={styles.collectionSheetNewBtn}
                  activeOpacity={0.8}
                  onPress={() => router.push('/new-collection-modal')}
                >
                  <Text style={styles.collectionSheetNewBtnText}>+ New</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.collectionSheetList}
                contentContainerStyle={styles.collectionSheetListContent}
                showsVerticalScrollIndicator={false}
              >
                {filteredCollections.map((collection) => {
                  const isSelected = selectedCollectionId === collection.id;

                  return (
                    <TouchableOpacity
                      key={collection.id}
                      style={styles.collectionSheetItem}
                      activeOpacity={0.8}
                      onPress={() => setSelectedCollectionId(collection.id)}
                    >
                      <Image source={collection.image} style={styles.collectionSheetThumb} />

                      <View style={styles.collectionSheetItemInfo}>
                        <Text style={styles.collectionSheetItemTitle}>{collection.title}</Text>
                        <View style={styles.collectionSheetMetaRow}>
                          {collection.privacy === 'private' ? <LockMetaIcon /> : <SharedMetaIcon />}
                          <Text style={styles.collectionSheetMetaText}>
                            {collection.privacy}  -  {collection.count} elements
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.collectionSelectCircle, isSelected && styles.collectionSelectCircleActive]}>
                        {isSelected && <View style={styles.collectionSelectCircleInner} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(160, 160, 160, 1)',
  },
  scroll: {
    flex: 1,
    // marginRight: -2
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 100,
    // paddingRight: -10,
    // marginRight: -10
  },


  // ── Top Activity Header ─────────────────────────────────────
  topActionPhoto: {
    width: '100%',
    minHeight: 130,
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 54.66,
    // paddingBottom: 12,
    // marginBottom: 12,
    overflow: 'hidden',
  },
  topActivityLabel: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    textAlign: 'center',
    color: '#6B6B6B',
    marginBottom: 2,
  },
  topTimestamp: {
    width: '100%',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    color: '#6B6B6B',
    paddingHorizontal: 8,
  },

  featuredStartCard: {
    width: '100%',
    maxWidth: 389,
    height: 477,
    alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    marginBottom: 0,
    backgroundColor: '#BDBDBD',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,
  },
  mapCard: {
    width: '100%',
    maxWidth: 389,
    height: 139,
    alignSelf: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    marginTop: -70,
    marginBottom: 10,
    backgroundColor: '#BDBDBD',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  mapImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mapRouteIconWrap: {
    position: 'absolute',
    // card height 139, overlap 50 → visible region starts at y=50
    // centre of visible area = 50 + (139-50)/2 = 94.5
    // icon top = 94.5 - ROUTE_ICON_H/2 (36) ≈ 58
    top: 58,
    alignSelf: 'center',
  },
  mapGpxBtn: {
    position: 'absolute',
    width: 85,
    height: 45,
    right: 19,
    top: 82,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapGpxBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
    textAlign: 'center',
    color: 'rgba(0, 122, 255, 1)',
  },
  postMapActionsRow: {
    width: '100%',
    maxWidth: 389,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
    position: 'relative',
  },
  inlineMetaRow: {
    marginTop: 4,
    width: 344,
    height: 52,
    alignSelf: 'center',
    borderRadius: 26,
    // backgroundColor: '#B8B8B8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  inlineMetaAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  inlineMetaText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: '#282828',
  },
  inlineMetaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inlineMetaIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsSection: {
    width: '100%',
    maxWidth: 389,
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  commentDividerTop: {
    width: '100%',
    height: 1,
    backgroundColor: '#282828',
    marginBottom: 10,
    marginHorizontal: -12
  },
  commentsTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: '#282828',
    marginBottom: 10,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    marginBottom: 12,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  commentBody: {
    flex: 1,
    marginTop: 1,
  },
  commentHandle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#282828',
  },
  commentCaption: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 18,
    color: '#282828',
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 4,
    marginTop: 2,
  },
  commentActionBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: ,
  },
  commentThreadWrap: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  commentThreadMainLine: {
    width: 1,
    backgroundColor: '#282828',
    borderRadius: 2,
  },
  commentThreadSubWrap: {
    flexDirection: 'row',
  },
  commentThreadBendLarge: {
    width: 33,
    height: 96,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#282828',
    borderBottomLeftRadius: 10,
    marginRight: 9,
    marginTop: -2,
  },
  commentThreadBendSmall: {
    width: 16,
    height: 29,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#282828',
    borderBottomLeftRadius: 10,
    marginRight: 9,
    marginTop: -3,
  },
  commentThreadBody: {
    flex: 1,
  },
  commentMoreBtn: {
    alignSelf: 'center',
    width: 75,
    height: 31,
    borderWidth: 1,
    borderColor: '#282828',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 4,
  },
  commentMoreBtnText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#282828',
    textAlign: 'center',
  },
  commentDividerBottom: {
    width: '100%',
    height: 1,
    backgroundColor: '#282828',
    marginTop: 10,
    marginBottom: 2,
    marginHorizontal: -12,
  },
  moreIconPress: {
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  moreIconText: {
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  morePopupMenu: {
    position: 'absolute',
    left: 8,
    top: 54,
    width: 224,
    height: 148,
    borderRadius: 30,
    backgroundColor: '#282828',
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    zIndex: 20,
  },
  morePopupItem: {
    minHeight: 42,
    justifyContent: 'center',
  },
  morePopupItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  morePopupIconSpacer: {
    width: 20,
    height: 20,
  },
  morePopupText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#F2F2F2',
  },
  likePillBtn: {
    width: 73,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#B8B8B8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginRight: 9,
  },
  likePillCount: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15,
    color: '#282828',
    textAlign: 'center',
  },
  centerSquareBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#B8B8B8',
    marginRight: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryRectBtn: {
    width: 163,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionSheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
    justifyContent: 'flex-end',
  },
  collectionSheetDismiss: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  collectionSheetWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#A0A0A0',
  },
  collectionSheetTopBar: {
    width: 389,
    height: 112.58,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 26,
  },
  collectionSheetTopTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  collectionSheetTopSub: {
    marginTop: 2,
    width: '100%',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    color: '#6B6B6B',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  collectionSheetHero: {
    width: 390,
    height: 477,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 1.5,
  },
  collectionSheetPanel: {
    position: 'absolute',
    left: 1,
    right: 0,
    bottom: 0,
    height: 627,
    backgroundColor: '#282828',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 21,
    paddingHorizontal: 15,
  },
  collectionSheetHandle: {
    width: 46,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#616264',
    alignSelf: 'center',
    marginBottom: 18,
  },
  collectionSheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 24,
  },
  collectionSheetTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#F2F2F2',
    textAlign: 'center',
  },
  collectionSheetCurrentRow: {
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  collectionSheetCurrentThumb: {
    width: 67.04,
    height: 67.04,
    borderRadius: 20,
  },
  collectionSheetCurrentInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 12,
  },
  collectionSheetCurrentTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#F2F2F2',
    marginBottom: 4,
  },
  collectionSheetCloseBtn: {
    position: 'absolute',
    right: 2,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionSheetSearchWrap: {
    width: 363,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#353535',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  collectionSheetSearchInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#F2F2F2',
    paddingVertical: 0,
  },
  collectionSheetCollectionsHeader: {
    marginTop: 14,
    marginBottom: 10,
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collectionSheetListLabel: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#6B6B6B',
  },
  collectionSheetNewBtn: {
    minWidth: 80,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  collectionSheetNewBtnText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    color: '#F2F2F7',
  },
  collectionSheetList: {
    flex: 1,
  },
  collectionSheetListContent: {
    paddingBottom: 24,
    gap: 22,
  },
  collectionSheetItem: {
    width: 350,
    minHeight: 67.04,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionSheetThumb: {
    width: 67.04,
    height: 67.04,
    borderRadius: 20,
  },
  collectionSheetItemInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 12,
  },
  collectionSheetItemTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    color: '#F2F2F2',
    marginBottom: 4,
  },
  collectionSheetMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  collectionSheetMetaText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#6B6B6B',
  },
  collectionSelectCircle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionSelectCircleActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  collectionSelectCircleInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    // backgroundColor: '#F2F2F2',
  },
  primaryPlusIcon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryPlusH: {
    position: 'absolute',
    width: 18,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  primaryPlusV: {
    position: 'absolute',
    width: 2.5,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  featuredStartImage: {
    position: 'absolute',
    // top: -114,
    left: 0,
    width: '100%',
    height: 477,
  },
  featuredImageActionBtn: {
    position: 'absolute',
    width: 44,
    height: 45,
    left: 12,
    top: 28,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.004)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  featuredImageActionBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  featuredImageActionIcon: {
    zIndex: 1,
  },
  featuredHandle: {
    width: 47,
    height: 17,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featuredHandleGroup: {
    width: 34,
    height: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredUnion: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },

  // ── Related ──────────────────────────────────────────────────
  relatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIDE_PAD + 4,
    marginBottom: 10,
    marginTop: 4,
  },
  relatedTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    color: '#282828',
  },
  moreBtn: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#282828',
  },

  // ── Masonry Grid ─────────────────────────────────────────────
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: GAP,
    // paddingHorizontal: ,
  },
  column: {
    width: COL_W,
    gap: GAP,
  },

  // Card
  cardWrapper: {
    marginBottom: 4,
    right: 0,
    left: 0,
    width: '100%',
  },
  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    // paddingRight: 4,
    paddingVertical: 4,
    gap: 4,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
    width: '100%',
  },
  cardImage: {
    width: '100%',
  },
  terrainBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 37,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    paddingLeft: 11,
    paddingTop: 5,
    paddingBottom: 2,
  },
  statsActivityType: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 3,
    width: 141,
  },
  routeBtnInner: {
    width: 18,
    height: 2,
    backgroundColor: '#555555',
    borderRadius: 1,
  },

  // Stats
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    height: 12,
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    width: 44,
  },
  statCurveWrap: {
    width: 87,
    height: 10,
    justifyContent: 'center',
  },
  statBarBg: {
    width: 87,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#282828',
    borderRadius: 20,
  },
  statSpacer: {
    width: 87,
  },
  statValue: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'right',
    flex: 1,
  },

  // User
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  username: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
  },

  bottomSpacer: {
    height: 40,
  },

  // Action button (bottom floating, black, 3 dots)
  actionBtn: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
