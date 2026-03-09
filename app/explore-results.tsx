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
import { Colors } from '../src/constants/theme';
import { MapPinIcon } from '../src/components/icons/MapPinIcon';
import { HeartIcon } from '../src/components/icons/HeartIcon';
import { ArrowUpRightIcon } from '../src/components/icons/ArrowUpRightIcon';
import { SearchIcon } from '../src/components/icons/SearchIcon';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const BASE_WIDTH = 393;
const CARD_W = (BASE_WIDTH - 24 - 8) / 2;

const IMAGES = {
  exploreMap: require('../assets/images/feed/explore_map.png'),
  snow: require('../assets/images/feed/feed_snow_mountain.png'),
  landscape: require('../assets/images/feed/feed_landscape.png'),
  adventure: require('../assets/images/feed/feed_adventure.png'),
  sunset: require('../assets/images/feed/feed_sunset.png'),
  hikerSnow: require('../assets/images/feed/feed_hiker_snow.png'),
  skiing: require('../assets/images/feed/feed_skiing.png'),
  jeep: require('../assets/images/feed/feed_jeep.png'),
  tent: require('../assets/images/feed/feed_tent.png'),
  iceland: require('../assets/images/feed/feed_iceland.png'),
  powder: require('../assets/images/feed/feed_powder.png'),
  trailSunset: require('../assets/images/feed/feed_trail_sunset.png'),
  profile1: require('../assets/images/feed/profile_photo1.png'),
  profile2: require('../assets/images/feed/profile_photo2.png'),
  profile3: require('../assets/images/feed/profile_photo3.png'),
};

interface ActivityCard {
  id: string;
  image: any;
  profileImage: any;
  username: string;
  title: string;
  location: string;
  distance: string;
  elevation: string;
  time: string;
  likes: number;
  height: number;
}

const ACTIVITIES: ActivityCard[] = [
  {
    id: '1',
    image: IMAGES.snow,
    profileImage: IMAGES.profile1,
    username: 'ashley.m',
    title: 'Morning Hike',
    location: 'French Alps',
    distance: '12.4 km',
    elevation: '834 m',
    time: '3h 20m',
    likes: 24,
    height: 280,
  },
  {
    id: '2',
    image: IMAGES.landscape,
    profileImage: IMAGES.profile2,
    username: 'marco.r',
    title: 'Gravel Loop',
    location: 'Iceland Coast',
    distance: '45.2 km',
    elevation: '1,200 m',
    time: '2h 45m',
    likes: 18,
    height: 240,
  },
  {
    id: '3',
    image: IMAGES.tent,
    profileImage: IMAGES.profile3,
    username: 'elena.k',
    title: 'Base Camp',
    location: 'Norway',
    distance: '8.1 km',
    elevation: '456 m',
    time: '5h 10m',
    likes: 42,
    height: 300,
  },
  {
    id: '4',
    image: IMAGES.skiing,
    profileImage: IMAGES.profile1,
    username: 'jake.s',
    title: 'Powder Day',
    location: 'Chamonix',
    distance: '15.8 km',
    elevation: '1,800 m',
    time: '4h 30m',
    likes: 56,
    height: 260,
  },
  {
    id: '5',
    image: IMAGES.hikerSnow,
    profileImage: IMAGES.profile2,
    username: 'sophie.l',
    title: 'Ice Trail',
    location: 'Antarctica',
    distance: '22.3 km',
    elevation: '620 m',
    time: '6h 15m',
    likes: 31,
    height: 290,
  },
  {
    id: '6',
    image: IMAGES.jeep,
    profileImage: IMAGES.profile3,
    username: 'omar.b',
    title: 'Desert Ride',
    location: 'Morocco',
    distance: '67.0 km',
    elevation: '340 m',
    time: '1h 50m',
    likes: 12,
    height: 250,
  },
];

const CATEGORIES = ['All', 'Hiking', 'Cycling', 'Skiing', 'Running', 'Climbing'];

export default function ExploreResultsScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState('All');

  const leftColumn = ACTIVITIES.filter((_, i) => i % 2 === 0);
  const rightColumn = ACTIVITIES.filter((_, i) => i % 2 === 1);

  return (
    <View style={styles.screen}>
      {/* Header with map blurred background */}
      <View style={styles.header}>
        <Image
          source={IMAGES.exploreMap}
          style={styles.headerMapBg}
          resizeMode="cover"
          blurRadius={2}
        />
        <View style={styles.headerOverlay} />

        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <BackArrowIcon width={20} height={20} color="#282828" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchBtn}
              activeOpacity={0.7}
              onPress={() => router.push('/search')}
            >
              <SearchIcon width={18} height={18} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationInfo}>
            <View style={styles.locationRow}>
              <MapPinIcon width={16} height={16} color="#007AFF" />
              <Text style={styles.locationName}>Oslo, Norway</Text>
            </View>
            <Text style={styles.resultCount}>235 activities found</Text>
          </View>
        </View>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
        style={styles.catScroll}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catPill, selectedCat === cat && styles.catPillActive]}
            onPress={() => setSelectedCat(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Activity Cards Grid */}
      <ScrollView
        style={styles.gridScroll}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.masonryContainer}>
          {/* Left column */}
          <View style={styles.masonryColumn}>
            {leftColumn.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridCard}
                activeOpacity={0.85}
                onPress={() => router.push('/activity-detail')}
              >
                <Image
                  source={item.image}
                  style={[styles.gridImage, { height: item.height }]}
                  resizeMode="cover"
                />
                {/* Profile badge */}
                <View style={styles.profileBadge}>
                  <Image source={item.profileImage} style={styles.profilePic} />
                  <Text style={styles.profileName}>{item.username}</Text>
                </View>

                {/* Stats overlay */}
                <View style={styles.statsOverlay}>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipText}>{item.distance}</Text>
                  </View>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipText}>↑ {item.elevation}</Text>
                  </View>
                </View>

                {/* Bottom bar */}
                <View style={styles.cardBottom}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.likeBtn} activeOpacity={0.7} onPress={() => { }}>
                      <HeartIcon width={14} height={14} color="#FF3B30" />
                      <Text style={styles.likeCount}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => router.push('/activity-detail')}>
                      <ArrowUpRightIcon width={14} height={14} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Right column */}
          <View style={styles.masonryColumn}>
            {rightColumn.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridCard}
                activeOpacity={0.85}
                onPress={() => router.push('/activity-detail')}
              >
                <Image
                  source={item.image}
                  style={[styles.gridImage, { height: item.height }]}
                  resizeMode="cover"
                />
                {/* Profile badge */}
                <View style={styles.profileBadge}>
                  <Image source={item.profileImage} style={styles.profilePic} />
                  <Text style={styles.profileName}>{item.username}</Text>
                </View>

                {/* Stats overlay */}
                <View style={styles.statsOverlay}>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipText}>{item.distance}</Text>
                  </View>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipText}>↑ {item.elevation}</Text>
                  </View>
                </View>

                {/* Bottom bar */}
                <View style={styles.cardBottom}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.likeBtn} activeOpacity={0.7} onPress={() => { }}>
                      <HeartIcon width={14} height={14} color="#FF3B30" />
                      <Text style={styles.likeCount}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => router.push('/activity-detail')}>
                      <ArrowUpRightIcon width={14} height={14} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  headerMapBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(217,217,217,0.75)',
  },
  headerContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 18,
    paddingBottom: 18,
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: 'rgba(207,208,209,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: 'rgba(207,208,209,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    gap: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#282828',
  },
  resultCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#676767',
  },

  // Categories
  catScroll: {
    maxHeight: 44,
    marginTop: 12,
  },
  catRow: {
    paddingHorizontal: 18,
    gap: 8,
    alignItems: 'center',
  },
  catPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8E8E6',
  },
  catPillActive: {
    backgroundColor: '#282828',
  },
  catText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#838385',
  },
  catTextActive: {
    color: '#FFFFFF',
  },

  // Grid
  gridScroll: {
    flex: 1,
    marginTop: 12,
  },
  gridContent: {
    paddingHorizontal: 8,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  masonryColumn: {
    flex: 1,
    gap: 8,
  },
  gridCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E8E8E6',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
  },

  // Profile badge
  profileBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 4,
  },
  profilePic: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  profileName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Stats overlay
  statsOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    gap: 4,
  },
  statChip: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  statChipText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Card bottom
  cardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cardInfo: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardLocation: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 4,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  likeCount: {
    fontSize: 10,
    fontWeight: '600',
    color: '#282828',
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
