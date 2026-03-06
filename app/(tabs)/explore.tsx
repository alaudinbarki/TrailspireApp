import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/theme';
import { TargetCirclesIcon } from '../../src/components/icons/TargetCirclesIcon';
import { TerrainProfileIcon } from '../../src/components/icons/TerrainProfileIcon';
import { FilterIcon } from '../../src/components/icons/FilterIcon';

const { width: SCREEN_W } = Dimensions.get('window');

const EXPLORE_IMAGES = {
  card_isabel21: require('../../assets/images/feed/figma_card_9.png'),
  card_cusmin: require('../../assets/images/feed/figma_card_7.png'),
  card_rebsix: require('../../assets/images/feed/figma_card_8.png'),
  card_ashley: require('../../assets/images/feed/figma_card_10.png'),
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
  isabel21: require('../../assets/images/feed/figma_profile_isabel21.png'),
  cusmin: require('../../assets/images/feed/figma_profile_cusmin.png'),
  rebsix: require('../../assets/images/feed/profile_photo1.png'),
  ashley: require('../../assets/images/feed/figma_profile_ashley.png'),
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
  { id: '1', image: EXPLORE_IMAGES.card_isabel21, username: '@isabel21', profileImage: PROFILE_IMAGES.isabel21, height: 191, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
  { id: '2', image: EXPLORE_IMAGES.card_cusmin, username: '@cusmin', profileImage: PROFILE_IMAGES.cusmin, height: 286, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.65 },
  { id: '3', image: EXPLORE_IMAGES.card_rebsix, username: '@rebsix', profileImage: PROFILE_IMAGES.rebsix, height: 286, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.6 },
  { id: '4', image: EXPLORE_IMAGES.card_ashley, username: '@_ashley', profileImage: PROFILE_IMAGES.ashley, height: 238, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 0.7 },
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
  const [activeTab, setActiveTab] = useState<'explore' | 'follow'>('explore');

  const leftColumn = EXPLORE_DATA.filter((_, i) => i % 2 === 0);
  const rightColumn = EXPLORE_DATA.filter((_, i) => i % 2 === 1);

  const renderCard = (item: ExploreItem) => (
    <View key={item.id} style={styles.cardWrapper}>
      {/* User profile row above card */}
      <View style={styles.userRow}>
        <Image source={item.profileImage} style={styles.userAvatar} />
        <Text style={styles.userName}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.gridCard}
        activeOpacity={0.85}
        onPress={() => router.push('/activity-detail')}
      >
        {item.image ? (
          <Image
            source={item.image}
            style={[styles.gridImage, { height: item.height }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.gridImage, { height: item.height, backgroundColor: '#C4C4C4' }]} />
        )}
        {/* Terrain profile overlay - matches Figma exactly */}
        <View style={styles.heartOverlay}>
          <View style={{ transform: [{ rotate: '170deg' }] }}>
            <TerrainProfileIcon width={30} height={10} color="#007AFF" />
          </View>
        </View>
      </TouchableOpacity>
      {/* Activity stats below card (if present) */}
      {item.activityType && (
        <View style={styles.statsBlock}>
          <Text style={styles.statsTitle}>{item.activityType}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Elevation</Text>
            <View style={styles.statsBarContainer}>
              <View style={[styles.statsProgressBar, { width: '100%' }]} />
            </View>
            <Text style={styles.statsValue}>{item.elevation}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Distance</Text>
            <View style={styles.statsProgressContainer}>
              <View style={[styles.statsProgressBar, { width: `${(item.progress || 0) * 100}%` }]} />
            </View>
            <Text style={styles.statsValue}>{item.distance}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Time</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.statsValue}>{item.time}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* Frosted glass header section */}
      <View style={styles.headerSection}>
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
          <TouchableOpacity style={styles.searchSideBtn} activeOpacity={0.7}>
            <FilterIcon width={21} height={21} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.7}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.searchBarText}>Search Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchSideBtnTarget} activeOpacity={0.7}>
            <TargetCirclesIcon width={43} height={43} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Green indicator dot */}
      <View style={styles.indicatorDot} />

      {/* Tab selector: Explore / You Follow */}
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('explore')} activeOpacity={0.7}>
          <Text style={[styles.tabText, activeTab === 'explore' && styles.tabTextActive]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('follow')} activeOpacity={0.7}>
          <Text style={[styles.tabText, activeTab === 'follow' && styles.tabTextActive]}>
            You Follow
          </Text>
        </TouchableOpacity>
      </View>

      {/* Masonry Grid */}
      <ScrollView
        style={styles.gridScroll}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.masonryContainer}>
          {/* Left column */}
          <View style={styles.masonryColumn}>
            {leftColumn.map(renderCard)}
          </View>
          {/* Right column */}
          <View style={styles.masonryColumn}>
            {rightColumn.map(renderCard)}
          </View>
        </View>
        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* ── Frosted header section (Figma: full-width, 177h, bottom radii 30, rgba(217,217,217,0.9)) ── */
  headerSection: {
    marginTop: 50,
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 5,
    paddingBottom: 7,
  },
  mapWrapper: {
    marginHorizontal: 5,
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
    opacity: 0.8,
  },
  compassIcon: {
    position: 'absolute',
    top: 43,
    left: 9,
  },
  headerTextBlock: {
    position: 'absolute',
    top: 49,
    left: 48,
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
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginRight: 19,
    marginTop: 6,
  },

  /* ── Search bar row (Figma: 251w bar, 49h, two 48.9 side buttons) ── */
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 6,
    gap: 8,
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
  searchBar: {
    flex: 1,
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

  /* ── Tab selector (Figma: 20px Bold, explore active #282828, follow inactive rgba(60,60,67,0.29)) ── */
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 4,
    marginBottom: 6,
  },
  tabText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(60,60,67,0.29)',
  },
  tabTextActive: {
    color: '#282828',
  },

  /* ── Per-card user profile row ── */
  cardWrapper: {
    marginBottom: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingLeft: 2,
    gap: 6,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
  },

  /* ── Grid ── */
  gridScroll: {
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: 12,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  masonryColumn: {
    flex: 1,
  },
  gridCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E8E8E6',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    borderRadius: 20,
  },

  /* ── Heart overlay (Figma: backdrop blur, rgba(0,0,0,0.2), rounded 10) ── */
  heartOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 37,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Activity stats block (below card, Figma: 10px Bold title, 8px labels/values) ── */
  statsBlock: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  statsTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  statsLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    width: 42,
  },
  statsBarContainer: {
    flex: 1,
    height: 10,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  statsBarBg: {
    width: '100%',
    height: '100%',
  },
  statsProgressContainer: {
    flex: 1,
    height: 6,
    borderRadius: 20,
    backgroundColor: '#E8E8E6',
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  statsProgressBar: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#282828',
  },
  statsValue: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'right',
    minWidth: 30,
  },
});
