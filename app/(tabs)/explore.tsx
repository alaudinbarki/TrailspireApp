import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { TargetCirclesIcon } from '../../src/components/icons/TargetCirclesIcon';
import { TerrainProfileIcon } from '../../src/components/icons/TerrainProfileIcon';
import { FilterIcon } from '../../src/components/icons/FilterIcon';
import { SharedFeedFilterPanel } from '@/components/SharedFeedFilterPanel';

const DATA_PANEL_H = 82;
const BASE_WIDTH = 393;
const COL_GAP = 8;
const SIDE_PAD = 0;
const COL_W = (BASE_WIDTH - SIDE_PAD * 2 - COL_GAP) / 2;

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

const EXPLORE_IMAGES = {
  card_ashley: require('../../assets/images/feed/figma_card_10.png'),
  card_isabel21: require('../../assets/images/feed/figma_card_9.png'),
  card_cusmin: require('../../assets/images/feed/figma_card_7.png'),
  card_rebsix: require('../../assets/images/feed/figma_card_8.png'),
  card_tony: require('../../assets/images/feed/figma_card_11.png'),
  card_marconuvolari: require('../../assets/images/feed/figma_card_12.png'),
  card_nik66: require('../../assets/images/feed/figma_card_6.png'),
  card_will87: require('../../assets/images/feed/figma_card_1.png'),
  card_lollomag: require('../../assets/images/feed/figma_card_2.png'),
  card_julian: require('../../assets/images/feed/figma_card_3.png'),
  card_tomasmek: require('../../assets/images/feed/figma_card_4.png'),
  card_gioforty: require('../../assets/images/feed/figma_card_5.png'),
  card_iamsimon: require('../../assets/images/feed/figma_card_13.png'),
  mapBanner: require('../../assets/images/feed/figma_map_banner.png'),
};

const PROFILE_IMAGES = {
  ashley: require('../../assets/images/feed/figma_profile_ashley.png'),
  isabel21: require('../../assets/images/feed/figma_profile_isabel21.png'),
  cusmin: require('../../assets/images/feed/figma_profile_cusmin.png'),
  rebsix: require('../../assets/images/feed/profile_photo1.png'),

  carlnoto: require('../../assets/images/feed/figma_profile_carlnoto.png'),
  tony: require('../../assets/images/feed/figma_profile_tony.png'),
  marconuvolari: require('../../assets/images/feed/figma_profile_marconuvolari87.png'),
  nik66: require('../../assets/images/feed/figma_profile_nik66.png'),
  will87: require('../../assets/images/feed/figma_profile_will87.png'),
  lollomag: require('../../assets/images/feed/figma_profile_lollomag.png'),
  julian: require('../../assets/images/feed/profile_photo2.png'),
  tomasmek: require('../../assets/images/feed/profile_photo3.png'),
  gioforty: require('../../assets/images/feed/figma_profile_gioforty.png'),
  iamsimon: require('../../assets/images/feed/figma_profile_iamsimon.png'),
};

interface ExploreItem {
  id: string;
  image: any;
  username: string;
  profileImage: any;
  height: number;
  activityType?: string;
  elevation?: string;
  distance?: string;
  time?: string;
  progress?: number;
}

const EXPLORE_DATA: ExploreItem[] = [
  { id: '1', image: EXPLORE_IMAGES.card_ashley, username: '@_ashley', profileImage: PROFILE_IMAGES.ashley, height: 238, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
  { id: '4', image: EXPLORE_IMAGES.card_isabel21, username: '@isabel21', profileImage: PROFILE_IMAGES.isabel21, height: 191, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
  { id: '2', image: EXPLORE_IMAGES.card_cusmin, username: '@cusmin', profileImage: PROFILE_IMAGES.cusmin, height: 286, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.65 },
  { id: '3', image: EXPLORE_IMAGES.card_rebsix, username: '@rebsix', profileImage: PROFILE_IMAGES.rebsix, height: 286, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.6 },
  { id: '5', image: null, username: '@carl.noto', profileImage: PROFILE_IMAGES.carlnoto, height: 286, activityType: 'Free Skiing', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.55 },
  { id: '6', image: EXPLORE_IMAGES.card_tony, username: '@tony', profileImage: PROFILE_IMAGES.tony, height: 238, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
  { id: '7', image: EXPLORE_IMAGES.card_marconuvolari, username: '@marconuvolari87', profileImage: PROFILE_IMAGES.marconuvolari, height: 219, activityType: 'Road Cycling', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.65 },
  { id: '8', image: EXPLORE_IMAGES.card_nik66, username: '@nik_66', profileImage: PROFILE_IMAGES.nik66, height: 300, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.6 },
  { id: '9', image: EXPLORE_IMAGES.card_will87, username: '@will87', profileImage: PROFILE_IMAGES.will87, height: 127, activityType: 'Road Cycling', elevation: '2550mt', distance: '33km', time: '5d 3h', progress: 0.65 },
  { id: '10', image: EXPLORE_IMAGES.card_lollomag, username: '@lollomag', profileImage: PROFILE_IMAGES.lollomag, height: 238, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
  { id: '11', image: EXPLORE_IMAGES.card_julian, username: '@julian_', profileImage: PROFILE_IMAGES.julian, height: 191, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.6 },
  { id: '12', image: EXPLORE_IMAGES.card_tomasmek, username: '@tomasmek', profileImage: PROFILE_IMAGES.tomasmek, height: 126, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.65 },
  { id: '13', image: EXPLORE_IMAGES.card_gioforty, username: '@gioforty', profileImage: PROFILE_IMAGES.gioforty, height: 286, activityType: 'Trail Running', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 0.55 },
  { id: '14', image: EXPLORE_IMAGES.card_iamsimon, username: '@iamsimon', profileImage: PROFILE_IMAGES.iamsimon, height: 238, activityType: 'Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
];

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / 852;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const scaledColW = sx(COL_W);
  const scaledFullW = sx(BASE_WIDTH - SIDE_PAD * 2);

  const fullCards = EXPLORE_DATA.filter((_, i) => i % 5 === 0);
  const gridCards = EXPLORE_DATA.filter((_, i) => i % 5 !== 0);
  const leftColumn = gridCards.filter((_, i) => i % 2 === 0);
  const rightColumn = gridCards.filter((_, i) => i % 2 === 1);

  const renderCard = (item: ExploreItem, isFullWidth = false) => (
    <View key={item.id} style={styles.cardWrapper}>
      <View style={styles.userRowTop}>
        <Image source={item.profileImage} style={styles.userAvatar} />
        <Text style={styles.userName}>{item.username}</Text>
      </View>

      <TouchableOpacity
        style={[styles.gridCard, isFullWidth && styles.gridCardFull]}
        activeOpacity={0.85}
        onPress={() => router.push('/activity-detail')}
      >
        {(() => {
          const imageHeight = sy(item.height);
          const imageWidth = isFullWidth ? scaledFullW : scaledColW;
          return item.image ? (
            <Image
              source={item.image}
              style={[styles.gridImage, { height: imageHeight, width: imageWidth }]}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.gridImage, { height: imageHeight, width: imageWidth, backgroundColor: '#C4C4C4' }]} />
          );
        })()}

        {item.image ? (
          <View style={styles.heartOverlay}>
            <View style={{ transform: [{ rotate: '170deg' }] }}>
              <TerrainProfileIcon width={30} height={10} color="#007AFF" />
            </View>
          </View>
        ) : (
          <View style={styles.heartOverlay}>
            <View style={{ transform: [{ rotate: '170deg' }] }}>
              <TerrainProfileIcon width={30} height={10} color="#007AFF" />
            </View>
          </View>
        )}

      </TouchableOpacity>

      <View style={styles.statsSection}>
        <Text style={styles.statsActivityType}>{item.activityType}</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Elevation</Text>
          <StatCurve />
          <Text style={styles.statValue}>{item.elevation}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Distance</Text>
          <View style={styles.statBarBg}>
            <View style={[styles.statBarFill, { width: `${(item.progress || 0) * 100}%` }]} />
          </View>
          <Text style={styles.statValue}>{item.distance}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Time</Text>
          <View style={styles.statSpacer} />
          <Text style={styles.statValue}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.headerBlock}>
        {/* Frosted glass header section */}
        <View style={[styles.headerSection, isFilterOpen ? styles.headerSectionWithFilter : styles.headerSectionClosed]}>
          {/* Map banner */}
          <View style={styles.mapWrapper}>
            <Image
              source={EXPLORE_IMAGES.mapBanner}
              style={styles.mapImage}
              resizeMode="cover"
            />
            {/* Target circles icon on map - Figma exact match */}
            <View style={styles.compassIcon}>
              <TargetCirclesIcon width={31} height={31} color="#000000" />
            </View>
            {/* Header info text on map */}
            <View style={styles.headerTextBlock}>
              <Text style={styles.headerTitle}>Explore Mode</Text>
              <Text style={styles.headerSubtitle}>World Atlas</Text>
              <Text style={styles.headerCount}>329,246 activities found</Text>
            </View>
          </View>

          {/* Search bar row - inside frosted header */}
          <View style={styles.searchBarRow}>
            <TouchableOpacity
              style={styles.searchSideBtn}
              activeOpacity={0.7}
              onPress={() => setIsFilterOpen((previous) => !previous)}
            >
              <FilterIcon width={31} height={19} color={isFilterOpen ? '#007AFF' : '#616264'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchBar}
              activeOpacity={0.7}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.searchBarText}>Search Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchSideBtnTarget}
              activeOpacity={0.7}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <View style={styles.targetDotActive}>
                <View style={styles.targetDotActiveOuter} />
                <View style={styles.targetDotActiveMid} />
                <View style={styles.targetDotActiveInner} />
                <View style={styles.targetDotActiveCore} />
              </View>
            </TouchableOpacity>
          </View>

          <SharedFeedFilterPanel
            visible={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            attached
          />
        </View>

      </View>

      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={[styles.mainContent, { paddingBottom: Math.max(132, insets.bottom + 80) }]}
          scrollEnabled
          directionalLockEnabled
          canCancelContentTouches
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Green indicator dot */}
          {!isFilterOpen && <View style={styles.indicatorDot} />}

          {/* Tab selector */}
          <View style={styles.tabRow}>
            <Pressable
              onPress={() => router.replace('/(tabs)/explore')}
              hitSlop={2}
              pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
            >
              <Text style={[styles.tabText, styles.tabTextActive]}>Explore</Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/(tabs)/home')}
              hitSlop={2}
              pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
            >
              <Text style={[styles.tabText]}>You Follow</Text>
            </Pressable>
          </View>

          {/* Masonry Grid */}
          <View style={styles.gridContent}>
            <View style={styles.masonryContainer}>
              {/* Left column */}
              <View style={styles.masonryColumn}>
                {leftColumn.map((card) => renderCard(card))}
              </View>
              {/* Right column */}
              <View style={styles.masonryColumn}>
                {rightColumn.map((card) => renderCard(card))}
              </View>
            </View>

            {fullCards.map((card) => renderCard(card, true))}
            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>

        {isFilterOpen && (
          <BlurView
            intensity={35}
            tint="light"
            pointerEvents="none"
            style={styles.contentBlurOverlay}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  headerBlock: {
    backgroundColor: '#A0A0A0',
  },
  mainScroll: {
    flex: 1,
  },
  mainContent: {},
  // paddingBottom set dynamically via useSafeAreaInsets
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  contentBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  /* ── Frosted header section (Figma: full-width, 177h, bottom radii 30, rgba(217,217,217,0.9)) ── */
  headerSection: {
    marginTop: -1,
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
  },
  headerSectionClosed: {
    height: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerSectionWithFilter: {
    minHeight: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  mapWrapper: {
    marginHorizontal: 5,
    marginTop: 5,
    width: 382,
    height: 110,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  compassIcon: {
    position: 'absolute',
    top: 50,
    left: 18,
  },
  headerTextBlock: {
    position: 'absolute',
    top: 54,
    left: 53,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#282828',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 1,
  },
  headerCount: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 1,
    bottom: 4,

  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    alignSelf: 'flex-end',
    marginRight: 19,
    marginTop: 12,
  },

  /* ── Search bar row (Figma: 251w bar, 49h, two 48.9 side buttons) ── */
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 6,
    gap: 4,
  },
  searchSideBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSideBtnTarget: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  targetDotActive: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetDotActiveOuter: {
    position: 'absolute',
    width: 43,
    height: 43,
    borderRadius: 21.5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  targetDotActiveMid: {
    position: 'absolute',
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  targetDotActiveInner: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  targetDotActiveCore: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(63, 63, 63, 0.8)',
  },
  searchBar: {
    width: 251,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F1F1F',
  },

  /* ── Tab selector (Figma: 20px Bold, inactive #838385, active #282828) ── */
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: -8,
    marginBottom: 6,
  },
  tabText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#838385',
  },
  tabTextActive: {
    color: '#282828',
  },

  /* ── Per-card user profile row ── */
  cardWrapper: {
    marginBottom: 4,
  },
  userRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
    gap: 4,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userName: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
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

  /* ── Grid ── */
  gridContent: {
    // paddingHorizontal: SIDE_PAD,

  },
  masonryContainer: {
    flexDirection: 'row',
    gap: COL_GAP,
  },
  masonryColumn: {
    width: COL_W,
  },
  gridCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  gridCardFull: {
    width: BASE_WIDTH - SIDE_PAD * 2,
  },
  gridImage: {
    width: '100%',
    borderRadius: 20,
  },

  /* ── Heart overlay (Figma: backdrop blur, rgba(0,0,0,0.2), rounded 10) ── */
  heartOverlay: {
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

  bottomSpacer: {
    height: 90,
  },
});
