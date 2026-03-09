import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';
import { SearchIcon } from '../src/components/icons/SearchIcon';
import { FilterIcon } from '../src/components/icons/FilterIcon';
import { HeartIcon } from '../src/components/icons/HeartIcon';

const BASE_WIDTH = 393;

const ACTIVITIES = [
  {
    id: 1,
    user: 'Andrea R',
    handle: '@andyros96',
    type: 'Skitouring',
    location: 'Swiss Alps',
    distance: '23 km',
    image: require('../assets/images/feed/activity_skiing_card.png'),
    liked: true,
  },
  {
    id: 2,
    user: 'Andrea R',
    handle: '@andyros96',
    type: 'Trail Running',
    location: 'Oslo, Norway',
    distance: '12 km',
    image: require('../assets/images/feed/feed_landscape.png'),
    liked: false,
  },
  {
    id: 3,
    user: 'Andrea R',
    handle: '@andyros96',
    type: 'Gravel Cycling',
    location: 'Bergen, Norway',
    distance: '87 km',
    image: require('../assets/images/feed/feed_adventure.png'),
    liked: false,
  },
];

export default function OtherUserProfileScreen() {
  const router = useRouter();
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(ACTIVITIES.map((a) => [a.id, a.liked]))
  );

  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={() => router.back()}>
          <Text style={styles.closeX}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile */}
        <View style={styles.profileSection}>
          <Image source={require('../assets/images/feed/profile_andrea_avatar.png')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Andrea R</Text>
            <Text style={styles.profileHandle}>@andyros96</Text>
          </View>
        </View>

        {/* Hero Image */}
        <Image source={require('../assets/images/feed/profile_hero_landscape.png')} style={styles.heroImage} />

        {/* Search & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <SearchIcon width={16} height={16} color="#A0A0A0" />
            <Text style={styles.searchPlaceholder}>Search activities</Text>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/feed-filters')}
          >
            <FilterIcon width={18} height={18} color="#282828" />
          </TouchableOpacity>
        </View>

        {/* Activity Cards */}
        {ACTIVITIES.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push('/activity-detail')}
          >
            <Image source={activity.image} style={styles.cardImage} />
            <View style={styles.cardOverlay}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.cardType}>{activity.type}</Text>
                  <Text style={styles.cardLocation}>{activity.location}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={(e) => { e.stopPropagation?.(); toggleLike(activity.id); }}
                >
                  <HeartIcon width={22} height={22} color={likedMap[activity.id] ? '#FF3B30' : '#FFFFFF'} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.cardDistance}>{activity.distance}</Text>
                <TouchableOpacity style={styles.openBtn} activeOpacity={0.7} onPress={() => router.push('/activity-detail')}>
                  <Text style={styles.openBtnText}>Open</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000000' },
  header: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 8 },
  closeBtn: { width: 49, height: 49, borderRadius: 15, backgroundColor: '#CFD0D1', alignItems: 'center', justifyContent: 'center' },
  closeX: { fontSize: 16, fontWeight: '600', color: '#282828' },
  scrollContent: { paddingBottom: 30 },
  profileSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, gap: 14 },
  avatar: { width: 71, height: 71, borderRadius: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#F2F2F2' },
  profileHandle: { fontFamily: 'Inter', fontSize: 12, color: '#F2F2F2', marginTop: 2 },
  heroImage: { width: BASE_WIDTH - 32, height: 180, borderRadius: 16, alignSelf: 'center', marginBottom: 16 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 10 },
  searchBar: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchPlaceholder: { fontFamily: 'Inter', fontSize: 14, color: '#A0A0A0' },
  filterBtn: { width: 49, height: 49, borderRadius: 15, backgroundColor: '#CFD0D1', alignItems: 'center', justifyContent: 'center' },
  card: { marginHorizontal: 10, marginBottom: 8, borderRadius: 30, overflow: 'hidden', height: 106 },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between', padding: 16, backgroundColor: 'rgba(0,0,0,0.2)' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardType: { fontFamily: 'Inter', fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  cardLocation: { fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDistance: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  openBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.2)' },
  openBtnText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});
