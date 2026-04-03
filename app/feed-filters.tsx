import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W } = Dimensions.get('window');

const FEED_ITEMS = [
  {
    id: 1,
    user: 'Tom P',
    handle: '@tomtom8',
    avatar: require('../assets/images/feed/avatar_tomtom8.png'),
    type: 'Trail Running',
    location: 'Oslo, Norway',
    distance: '12 km',
    image: require('../assets/images/feed/feed_landscape.png'),
  },
  {
    id: 2,
    user: 'Andrea R',
    handle: '@andyros96',
    avatar: require('../assets/images/feed/profile_andrea_avatar.png'),
    type: 'Skitouring',
    location: 'Swiss Alps',
    distance: '23 km',
    image: require('../assets/images/feed/activity_skiing_card.png'),
  },
  {
    id: 3,
    user: 'Andrea R',
    handle: '@andyros96',
    avatar: require('../assets/images/feed/profile_andrea_avatar.png'),
    type: 'Gravel cycling',
    location: 'Bergen, Norway',
    distance: '87 km',
    image: require('../assets/images/feed/feed_adventure.png'),
  },
];

export default function FeedFiltersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [distanceValue, setDistanceValue] = useState(5);
  const distanceLabel = distanceValue >= 100 ? 'All' : `${distanceValue} km`;

  return (
    <View style={styles.screen}>
      {/* Dimmed feed behind */}
      <View style={styles.dimmedFeed}>
        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
          {FEED_ITEMS.map((item) => (
            <View key={item.id} style={styles.feedCard}>
              <Image source={item.image} style={styles.feedImage} />
              <View style={styles.feedOverlay}>
                <View style={styles.feedUserRow}>
                  <Image source={item.avatar} style={styles.feedAvatar} />
                  <View>
                    <Text style={styles.feedUser}>{item.user}</Text>
                    <Text style={styles.feedType}>{item.type} · {item.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Filter overlay */}
      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Feed Filters</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={styles.doneBtn}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContent}>
          {/* Distance range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Distance Range</Text>
            <View style={styles.rangeRow}>
              <TouchableOpacity
                style={styles.rangeBtn}
                activeOpacity={0.7}
                onPress={() => setDistanceValue(Math.max(1, distanceValue - 5))}
              >
                <Text style={styles.rangeBtnText}>−</Text>
              </TouchableOpacity>
              <View style={styles.rangeValue}>
                <Text style={styles.rangeText}>{distanceLabel}</Text>
              </View>
              <Text style={styles.rangeArrow}>↔</Text>
              <View style={styles.rangeValue}>
                <Text style={styles.rangeText}>All</Text>
              </View>
              <TouchableOpacity
                style={styles.rangeBtn}
                activeOpacity={0.7}
                onPress={() => setDistanceValue(Math.min(100, distanceValue + 5))}
              >
                <Text style={styles.rangeBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Activity type filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Activity Type</Text>
            <View style={styles.chipRow}>
              {['All', 'Running', 'Cycling', 'Skiing', 'Hiking'].map((type) => (
                <TouchableOpacity key={type} style={styles.chip} activeOpacity={0.7}>
                  <Text style={styles.chipText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time period */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Time Period</Text>
            <View style={styles.chipRow}>
              {['Today', 'This Week', 'This Month', 'All Time'].map((period) => (
                <TouchableOpacity key={period} style={styles.chip} activeOpacity={0.7}>
                  <Text style={styles.chipText}>{period}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Apply button */}
        <TouchableOpacity
          style={[styles.applyBtn, { marginBottom: Math.max(20, insets.bottom + 8) }]}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  dimmedFeed: { ...StyleSheet.absoluteFillObject, opacity: 0.3 },
  feedCard: { marginHorizontal: 16, marginTop: 12, borderRadius: 16, overflow: 'hidden', height: 200 },
  feedImage: { width: '100%', height: '100%' },
  feedOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 14, backgroundColor: 'rgba(0,0,0,0.3)' },
  feedUserRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  feedAvatar: { width: 32, height: 32, borderRadius: 16 },
  feedUser: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  feedType: { fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  filterTitle: { fontFamily: 'Inter', fontSize: 22, fontWeight: '700', color: '#FFFFFF' },
  doneBtn: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#007AFF' },
  filterContent: { backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 20, marginHorizontal: 16, padding: 20 },
  filterSection: { marginBottom: 24 },
  filterLabel: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#282828', marginBottom: 12 },
  rangeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  rangeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8E8E6', alignItems: 'center', justifyContent: 'center' },
  rangeBtnText: { fontSize: 18, color: '#282828', fontWeight: '600' },
  rangeValue: { backgroundColor: '#E8E8E6', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  rangeText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#282828' },
  rangeArrow: { fontSize: 18, color: '#A0A0A0' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E8E8E6' },
  chipText: { fontFamily: 'Inter', fontSize: 13, fontWeight: '500', color: '#282828' },
  applyBtn: { backgroundColor: '#282828', borderRadius: 14, paddingVertical: 16, marginHorizontal: 16, alignItems: 'center' },
  applyBtnText: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
