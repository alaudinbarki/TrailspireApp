import React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon } from '../src/components/icons/HeartIcon';
import { ArrowUpRightIcon } from '../src/components/icons/ArrowUpRightIcon';

const { width: SCREEN_W } = Dimensions.get('window');

const IMAGES = {
  activityMap: require('../assets/images/feed/activity_map.png'),
  snow: require('../assets/images/feed/feed_snow_mountain.png'),
  landscape: require('../assets/images/feed/feed_landscape.png'),
  adventure: require('../assets/images/feed/feed_adventure.png'),
  hikerSnow: require('../assets/images/feed/feed_hiker_snow.png'),
  skiing: require('../assets/images/feed/feed_skiing.png'),
  tent: require('../assets/images/feed/feed_tent.png'),
  iceland: require('../assets/images/feed/feed_iceland.png'),
  jeep: require('../assets/images/feed/feed_jeep.png'),
  powder: require('../assets/images/feed/feed_powder.png'),
  trailSunset: require('../assets/images/feed/feed_trail_sunset.png'),
  profile1: require('../assets/images/feed/profile_photo1.png'),
  profile2: require('../assets/images/feed/profile_photo2.png'),
  profile3: require('../assets/images/feed/profile_photo3.png'),
};

const TAGGED_USERS = [
  { id: '1', name: '@ashley', image: IMAGES.profile1 },
  { id: '2', name: '@marco', image: IMAGES.profile2 },
  { id: '3', name: '@elena', image: IMAGES.profile3 },
];

interface GalleryItem {
  id: string;
  image: any;
  height: number;
}

const GALLERY_LEFT: GalleryItem[] = [
  { id: '1', image: IMAGES.landscape, height: 240 },
  { id: '2', image: IMAGES.tent, height: 200 },
  { id: '3', image: IMAGES.iceland, height: 260 },
];

const GALLERY_RIGHT: GalleryItem[] = [
  { id: '4', image: IMAGES.hikerSnow, height: 200 },
  { id: '5', image: IMAGES.skiing, height: 260 },
  { id: '6', image: IMAGES.adventure, height: 190 },
];

export default function ActivityDetailScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity Map */}
        <View style={styles.mapContainer}>
          <Image
            source={IMAGES.activityMap}
            style={styles.mapImage}
            resizeMode="cover"
          />
          {/* Back button */}
          <SafeAreaView style={styles.backBtnSafe}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text style={styles.backBtnText}>{'< Back'}</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Activity Data */}
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Activity Data</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Distance</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: '80%' }]} />
            </View>
            <Text style={styles.statValue}>33km</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Elevation</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: '70%' }]} />
            </View>
            <Text style={styles.statValue}>2550mt</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Time</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: '60%', backgroundColor: '#CFD0D1' }]} />
            </View>
            <Text style={styles.statValue}>5d 3h</Text>
          </View>
        </View>

        {/* Tagged Users */}
        <View style={styles.taggedSection}>
          <Text style={styles.taggedTitle}>Tagged</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taggedRow}
          >
            {TAGGED_USERS.map((user) => (
              <TouchableOpacity key={user.id} style={styles.taggedItem} activeOpacity={0.7} onPress={() => router.push('/other-user-profile')}>
                <Image source={user.image} style={styles.taggedImage} />
                <Text style={styles.taggedName}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Feature Image */}
        <View style={styles.featureSection}>
          <Image
            source={IMAGES.snow}
            style={styles.featureImage}
            resizeMode="cover"
          />
          <View style={styles.featureOverlay}>
            <View style={styles.likeBadge}>
              <HeartIcon width={14} height={14} color="#007AFF" filled />
              <Text style={styles.likeCount}>1.2k</Text>
            </View>
            <TouchableOpacity style={styles.arrowBadge} activeOpacity={0.7} onPress={() => router.push('/save-to-collection')}>
              <ArrowUpRightIcon width={14} height={14} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Photo Gallery */}
        <View style={styles.galleryHeader}>
          <Text style={styles.galleryTitle}>Photos</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
            <Text style={styles.galleryViewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.galleryContainer}>
          <View style={styles.galleryColumn}>
            {GALLERY_LEFT.map((item) => (
              <TouchableOpacity key={item.id} style={styles.galleryCard} activeOpacity={0.85} onPress={() => router.push('/image-viewer')}>
                <Image
                  source={item.image}
                  style={[styles.galleryImage, { height: item.height }]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.galleryColumn}>
            {GALLERY_RIGHT.map((item) => (
              <TouchableOpacity key={item.id} style={styles.galleryCard} activeOpacity={0.85} onPress={() => router.push('/image-viewer')}>
                <Image
                  source={item.image}
                  style={[styles.galleryImage, { height: item.height }]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
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
  scrollContent: {},

  // Map
  mapContainer: {
    height: 500,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  backBtnSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backBtn: {
    marginLeft: 16,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(245,245,245,0.6)',
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#282828',
  },

  // Data Section
  dataSection: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  dataSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#282828',
    width: 55,
  },
  statBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#CFD0D1',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: '#282828',
    borderRadius: 20,
  },
  statValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#282828',
    width: 45,
    textAlign: 'right',
  },

  // Tagged
  taggedSection: {
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  taggedTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 10,
  },
  taggedRow: {
    gap: 12,
  },
  taggedItem: {
    alignItems: 'center',
  },
  taggedImage: {
    width: 44,
    height: 44,
    borderRadius: 14,
    marginBottom: 4,
  },
  taggedName: {
    fontSize: 10,
    color: '#282828',
    fontWeight: '500',
  },

  // Feature
  featureSection: {
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  featureImage: {
    width: '100%',
    height: 280,
  },
  featureOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  likeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  likeCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gallery
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282828',
  },
  galleryViewAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  galleryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    gap: 6,
  },
  galleryColumn: {
    flex: 1,
    gap: 6,
  },
  bottomSpacer: {
    height: 60,
  },
  galleryCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
  },
});
