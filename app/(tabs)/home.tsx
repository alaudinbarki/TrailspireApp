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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TerrainProfileIcon } from '../../src/components/icons/TerrainProfileIcon';
import { ElevationProfileIcon } from '../../src/components/icons/ElevationProfileIcon';
import { FilterIcon } from '../../src/components/icons/FilterIcon';
import { SharedFeedFilterPanel } from '@/components/SharedFeedFilterPanel';

const BASE_WIDTH = 393;
const COL_GAP = 6;
const SIDE_PAD = 2;
const COL_W = (BASE_WIDTH - SIDE_PAD * 2 - COL_GAP) / 2;

/* ── Image assets (Figma node 1:3129 "02") ── */
const HOME_IMAGES = {
  mapBanner: require('../../assets/images/feed/figma_map_banner.png'),
  card1_fullWidth: require('../../assets/images/feed/home_card_1.png'),   // imgRectangle133 – backcountry skiing ice cave
  card2_left: require('../../assets/images/feed/home_card_2.png'),        // imgRectangle236 – hikers in snow
  card3_left: require('../../assets/images/feed/home_card_3.png'),        // imgRectangle181 – mountain hiking
  card4_right: require('../../assets/images/feed/home_card_4.png'),       // imgRectangle138 – snowy peaks
  card5_left: require('../../assets/images/feed/home_card_5.png'),        // imgRectangle180 – kayak/camp
  card6_fullWidth: require('../../assets/images/feed/home_card_6.png'),   // imgRectangle264 – volcanic landscape
  card7_right: require('../../assets/images/feed/home_card_7.png'),       // imgRectangle231 – hiker with gear
  card8_fullWidth: require('../../assets/images/feed/home_card_8.png'),   // imgRectangle154 – 4x4 overlanding
  card9_right: require('../../assets/images/feed/figma_card_13.png'),      // imgRectangle222 – free skiing snowy slope
  flag1: require('../../assets/images/feed/home_flag_1.png'),
  flag2: require('../../assets/images/feed/home_flag_2.png'),
  flag3: require('../../assets/images/feed/home_flag_3.png'),
};

const PROFILE_IMAGES = {
  tomtom8: require('../../assets/images/feed/home_profile_tomtom8.png'),
  tony: require('../../assets/images/feed/home_profile_tony.png'),
  iamsimon: require('../../assets/images/feed/home_profile_iamsimon.png'),
  nik66: require('../../assets/images/feed/home_profile_nik66.png'),
  julian: require('../../assets/images/feed/home_profile_julian.png'),
  rebsix: require('../../assets/images/feed/home_profile_rebsix.png'),
  cusmin: require('../../assets/images/feed/home_profile_cusmin.png'),
  ashley: require('../../assets/images/feed/home_profile_ashley.png'),
};

/* ── Card data matching Figma exactly ── */
interface CardItem {
  id: string;
  image: any;
  height: number;
  username: string;
  profileImage: any;
  activityType: string;
  elevation: string;
  distance: string;
  time: string;
  progress?: number;           // 0-1 fill ratio for distance bar
  layout: 'full' | 'left' | 'right';
  flagImage?: any;
  elevationVariant?: 1 | 2 | 3 | 4 | 5;
  badgeType?: 'wide' | 'narrow';
}

const CARD_DATA: CardItem[] = [
  // Row 1: full-width card – @tomtom8
  { id: 'fw1', image: HOME_IMAGES.card1_fullWidth, height: 258, username: '@tomtom8', profileImage: PROFILE_IMAGES.tomtom8, activityType: 'Backcountry Skiing', elevation: '2550mt', distance: '33km', time: '5d 3h', progress: 0.63, layout: 'full', flagImage: HOME_IMAGES.flag1, elevationVariant: 1, badgeType: 'wide' },
  // Row 2 left – @tony
  { id: 'l2', image: HOME_IMAGES.card2_left, height: 239, username: '@tony', profileImage: PROFILE_IMAGES.tony, activityType: 'Hiking', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'left', flagImage: HOME_IMAGES.flag2, elevationVariant: 2, badgeType: 'wide' },
  // Row 2 right – @iamsimon
  { id: 'r2', image: HOME_IMAGES.card9_right, height: 286, username: '@iamsimon', profileImage: PROFILE_IMAGES.iamsimon, activityType: 'Free Skiing', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', flagImage: HOME_IMAGES.flag3, elevationVariant: 3, badgeType: 'narrow' },
  // Row 3 left – @nik_66
  { id: 'l3', image: HOME_IMAGES.card3_left, height: 239, username: '@nik_66', profileImage: PROFILE_IMAGES.nik66, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'narrow' },
  // Row 3 right – @julian_
  { id: 'r3', image: HOME_IMAGES.card7_right, height: 286, username: '@julian_', profileImage: PROFILE_IMAGES.julian, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  // Row 4 left – @rebsix
  { id: 'l4', image: HOME_IMAGES.card4_right, height: 286, username: '@rebsix', profileImage: PROFILE_IMAGES.rebsix, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'wide' },
  // Row 4 right – @cusmin
  { id: 'r4', image: HOME_IMAGES.card5_left, height: 189, username: '@cusmin', profileImage: PROFILE_IMAGES.cusmin, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  // Row 5: full-width – @_ashley
  { id: 'fw2', image: HOME_IMAGES.card6_fullWidth, height: 219, username: '@_ashley', profileImage: PROFILE_IMAGES.ashley, activityType: 'Backcountry Skiing', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'full', elevationVariant: 2, badgeType: 'wide' },
  // Row 6: full-width large – @tony (again)
  { id: 'fw3', image: HOME_IMAGES.card8_fullWidth, height: 485, username: '@tony', profileImage: PROFILE_IMAGES.tony, activityType: '4x4 Overlanding', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'full', elevationVariant: 5, badgeType: 'wide' },
];

/* ── Component ── */
export default function HomeScreen() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'home' | 'youFollow' | 'explore'>('home');
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / 852;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const followingUsers = new Set(['@tony', '@julian_', '@_ashley', '@iamsimon', '@rebsix']);
  const visibleCards = CARD_DATA.filter((item) => {
    if (selectedView === 'home') {
      return true;
    }
    if (selectedView === 'youFollow') {
      return followingUsers.has(item.username);
    }
    return !followingUsers.has(item.username);
  });

  const scaledColW = sx(COL_W);
  const scaledFullW = sx(BASE_WIDTH - SIDE_PAD * 2);
  const scaledStatBarW = sx(87);

  /* Split cards into left / right / full columns */
  const leftCards = visibleCards.filter((c) => c.layout === 'left');
  const rightCards = visibleCards.filter((c) => c.layout === 'right');
  const fullCards = visibleCards.filter((c) => c.layout === 'full');

  /* Render a single card */
  const renderCard = (item: CardItem) => (
    <View key={item.id} style={styles.cardWrapper}>
      {/* Profile row */}
      <TouchableOpacity
        style={styles.cardUserRow}
        activeOpacity={0.7}
        onPress={() => router.push('/other-user-profile')}
      >
        <Image source={item.profileImage} style={styles.cardUserAvatar} />
        <Text style={styles.cardUsername}>{item.username}</Text>
        {item.flagImage && (
          <Image source={item.flagImage} style={styles.flagIcon} />
        )}
      </TouchableOpacity>

      {/* Card image + terrain badge overlay */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/activity-detail')}
      >
        {item.image ? (
          <Image
            source={item.image}
            style={[
              styles.cardImage,
              {
                height: sy(item.height),
                width: item.layout === 'full' ? scaledFullW : scaledColW,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.cardPlaceholder,
              {
                height: sy(item.height),
                width: item.layout === 'full' ? scaledFullW : scaledColW,
              },
            ]}
          />
        )}

        {/* Terrain badge – overlaid on image bottom right */}
        <View style={[
          styles.terrainBadge,
          item.badgeType === 'wide' ? styles.terrainBadgeWide : styles.terrainBadgeNarrow,
        ]}>
          {item.badgeType === 'wide' && (
            <View style={styles.terrainBadgeLayer2} />
          )}
          <View style={styles.terrainBadgeLayer3} />
          {item.badgeType === 'wide' && (
            <View style={styles.terrainBadgeProfileWrap}>
              <View style={{ transform: [{ rotate: '170deg' }] }}>
                <TerrainProfileIcon width={sx(30)} height={sy(10)} color="#007AFF" />
              </View>
            </View>
          )}
          <View style={styles.terrainBadgeIconWrap}>
            <View style={{ transform: [{ rotate: '82deg' }] }}>
              <TerrainProfileIcon width={sx(18)} height={sy(10)} color="#007AFF" />
            </View>
          </View>
          {item.badgeType === 'wide' && (
            <Text style={styles.terrainBadgeCount}>+2</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Stats section – below image (Figma: positioned below card, not overlaid) */}
      <View style={styles.statsSection}>
        <Text style={styles.statsActivityType}>{item.activityType}</Text>
        {/* Elevation row: label | Vector18 line | value (all inline) */}
        <View style={styles.statsRow}>
          <Text style={styles.statsLabelFixed}>Elevation</Text>
          <ElevationProfileIcon
            width={sx(87)}
            height={sy(10)}
            color="#282828"
            variant={item.elevationVariant ?? 1}
          />
          <Text style={styles.statsValueRight}>{item.elevation}</Text>
        </View>
        {/* Distance row: label | Rectangle133 progress bar | value (all inline) */}
        <View style={styles.statsRow}>
          <Text style={styles.statsLabelFixed}>Distance </Text>
          <View style={styles.statsProgressBar}>
            <View
              style={[
                styles.statsProgressFill,
                { width: scaledStatBarW * (item.progress ?? 1) },
              ]}
            />
          </View>
          <Text style={styles.statsValueRight}>{item.distance}</Text>
        </View>
        {/* Time row: label | spacer | value */}
        <View style={styles.statsRow}>
          <Text style={styles.statsLabelFixed}>Time</Text>
          <View style={styles.statsTimeSpacer} />
          <Text style={styles.statsValueRight}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.headerBlock}>
        <View style={[styles.headerSection, isFilterOpen ? styles.headerSectionWithFilter : styles.headerSectionClosed]}>
          <View style={styles.mapWrapper}>
            <Image
              source={HOME_IMAGES.mapBanner}
              style={styles.mapImage}
              resizeMode="cover"
            />

            <View style={styles.mapRightRadar} pointerEvents="none">
              <View style={styles.radarRing180} />
              <View style={styles.radarRing140} />
              <View style={styles.radarRing95} />
              <View style={styles.radarRing61} />
              <View style={styles.radarRing36} />
              <View style={styles.radarCoreDot} />
            </View>

            <View style={styles.mapLeftPulse}>
              <View style={styles.mapLeftPulseOuter} />
              <View style={styles.mapLeftPulseMid} />
              <View style={styles.mapLeftPulseInner} />
              <View style={styles.mapLeftPulseCore} />
            </View>

            <View style={styles.mapBadgeIcon}>
              <View style={{ transform: [{ rotate: '170deg' }] }}>
                <TerrainProfileIcon width={sx(30)} height={sy(10)} color="#007AFF" />
              </View>
            </View>

            <View style={styles.headerTextBlock}>
              <Text style={styles.headerTitle}>Current Location</Text>
              <Text style={styles.headerSubtitle}>Oslo, Norway</Text>
              <Text style={styles.headerCount}>3,576 activities found</Text>
            </View>
          </View>

          <View style={styles.searchBarRow}>
            <TouchableOpacity
              style={styles.searchSideBtn}
              activeOpacity={0.7}
              onPress={() => setIsFilterOpen((prev) => !prev)}
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
              onPress={() => router.replace('/(tabs)/explore')}
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

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainContent}
        scrollEnabled
        directionalLockEnabled
        canCancelContentTouches
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setSelectedView('explore')}
            hitSlop={2}
            pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
          >
            <Text style={[styles.tabText, selectedView === 'explore' && styles.tabTextActive]}>
              Explore
            </Text>
          </Pressable>


          <Pressable
            onPress={() => setSelectedView('youFollow')}
            hitSlop={2}
            pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
          >
            <Text style={[styles.tabText, selectedView === 'youFollow' && styles.tabTextActive]}>
              You Follow
            </Text>
          </Pressable>
        </View>

        <View style={styles.feedContainer}>
          {fullCards[0] && renderCard(fullCards[0])}

          <View style={styles.masonryContainer}>
            <View style={styles.masonryCol}>
              {leftCards.map(renderCard)}
            </View>
            <View style={styles.masonryCol}>
              {rightCards.map(renderCard)}
            </View>
          </View>

          {fullCards[1] && renderCard(fullCards[1])}
          {fullCards[2] && renderCard(fullCards[2])}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Styles (pixel-perfect from Figma node 1:3129) ── */
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
  mainContent: {
    paddingBottom: 132,
  },

  headerSection: {
    marginTop: -1,
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
  },
  headerSectionClosed: {
    height: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerSectionWithFilter: {
    minHeight: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  mapRightRadar: {
    position: 'absolute',
    right: -12,
    top: -34,
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing180: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing140: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing95: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing61: {
    position: 'absolute',
    width: 61,
    height: 61,
    borderRadius: 30.5,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing36: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarCoreDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  mapLeftPulse: {
    position: 'absolute',
    left: 18,
    top: 48,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLeftPulseOuter: {
    position: 'absolute',
    width: 31,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  mapLeftPulseMid: {
    position: 'absolute',
    width: 23.79,
    height: 23.79,
    borderRadius: 11.9,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  mapLeftPulseInner: {
    position: 'absolute',
    width: 16.58,
    height: 16.58,
    borderRadius: 8.29,
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  mapLeftPulseCore: {
    position: 'absolute',
    width: 10.81,
    height: 10.81,
    borderRadius: 5.405,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  mapBadgeIcon: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    width: 28,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextBlock: {
    position: 'absolute',
    top: 48,
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
    marginTop: 2,
  },
  headerCount: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
  },

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
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  targetDotActiveMid: {
    position: 'absolute',
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  targetDotActiveInner: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  targetDotActiveCore: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
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

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    marginTop: 18,
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

  /* ── Per-card user row ── */
  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 4,
    paddingVertical: 4,
    gap: 4,
  },
  cardWrapper: {
    marginBottom: 4,
  },
  cardUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  cardUsername: {
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
  },
  flagIcon: {
    width: 17,
    height: 12,
    marginLeft: 2,
  },

  /* ── Card image ── */
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    borderRadius: 20,
  },
  cardPlaceholder: {
    borderRadius: 20,
    backgroundColor: '#838383',
  },

  /* ── Stats section (Figma: below card image, not overlaid) ── */
  statsSection: {
    paddingLeft: 11,
    paddingTop: 5,
    paddingBottom: 2,
  },
  statsActivityType: {
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 3,
    width: 141,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    height: 12,
  },
  statsLabelFixed: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    width: 44,
  },
  statsValueRight: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'right',
    flex: 1,
  },
  statsProgressBar: {
    width: 87,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
  },
  statsProgressFill: {
    height: 6,
    backgroundColor: '#282828',
    borderRadius: 20,
  },
  statsTimeSpacer: {
    width: 87,
  },

  /* ── Terrain badge (bottom-right, Figma exact) ── */
  terrainBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  terrainBadgeWide: {
    width: 58,
  },
  terrainBadgeNarrow: {
    width: 30,
  },
  terrainBadgeLayer2: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 44,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 2,
  },
  terrainBadgeLayer3: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 3,
  },
  terrainBadgeProfileWrap: {
    position: 'absolute',
    left: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
  },
  terrainBadgeIconWrap: {
    position: 'absolute',
    left: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
  },
  terrainBadgeCount: {
    position: 'absolute',
    right: 3,
    fontSize: 8,
    fontWeight: '600',
    color: '#C9C9C9',
    textAlign: 'center',
  },

  /* ── Grid / masonry ── */
  feedContainer: {
    marginTop: 0,
    paddingHorizontal: SIDE_PAD,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: COL_GAP,
  },
  masonryCol: {
    width: COL_W,
  },
  bottomSpacer: {
    height: 100,
  },
});
