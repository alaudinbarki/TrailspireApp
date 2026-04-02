import React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '../src/components/icons/SearchIcon';
import { FilterIcon } from '../src/components/icons/FilterIcon';
import Svg, { Path } from 'react-native-svg';
import { TerrainProfileIcon } from '@/components/icons/TerrainProfileIcon';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ACTIVITIES = [
  {
    id: 1,
    date: '16 MAR',
    title: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    completed: true,
  },
  {
    id: 2,
    date: '11 MAR',
    title: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    completed: false,
  },
  {
    id: 3,
    date: '05 MAR',
    title: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    completed: false,
  },
  {
    id: 4,
    date: '01 MAR',
    title: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    completed: false,
  },
  {
    id: 5,
    date: '26 FEB',
    title: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    completed: false,
  },
];

export default function OtherUserProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topHeaderRow}>
          <View style={styles.profileSection}>
            <Image source={require('../assets/images/feed/profile_andrea_avatar.png')} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Andrea R</Text>
              <Text style={styles.profileHandle}>@andyros96</Text>
              <Image source={require('../assets/images/feed/home_flag_2.png')} style={styles.flagImage} />
            </View>
          </View>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        <Image source={require('../assets/images/feed/profile_hero_landscape.png')} style={styles.heroImage} />

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <SearchIcon width={31} height={31} color="#6E6F72" />
            <Text style={styles.searchPlaceholder}>Search</Text>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/feed-filters')}
          >
            <FilterIcon width={24} height={24} color="#1F1F1F" />
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesPanel}>


          {ACTIVITIES.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                styles.card,
                { backgroundColor: activity.completed ? '#FCFCFC' : '#CFD0D1' },
              ]}
              activeOpacity={0.85}
              onPress={() => router.push('/activity-detail')}
            >
              <View style={styles.mapWrap}>
                <Image
                  source={require('../assets/images/feed/activity_map.png')}
                  style={styles.mapImage}
                  resizeMode="cover"
                />
                <View style={styles.terrainOverlay}>
                  <TerrainProfileIcon width={129} height={46} color="#007AFF" />
                </View>

                <TouchableOpacity
                  style={styles.openPill}
                  activeOpacity={0.8}
                  onPress={() => router.push('/gpx-route-view')}
                >
                  <Text style={styles.openPillText}>Open</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.metaSection}>
                <Text style={styles.cardDate}>{activity.date.replace(' ', '\n')}</Text>
                <Text style={styles.cardTitle}>{activity.title}</Text>
                <Text style={styles.cardLocation}>{activity.location}</Text>
                <Text style={styles.cardDistance}>{activity.distance}</Text>
              </View>

              <View style={styles.checkWrap}>
                <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                  <Path d="M18 34C26.8366 34 34 26.8366 34 18C34 9.16344 26.8366 2 18 2C9.16344 2 2 9.16344 2 18C2 26.8366 9.16344 34 18 34Z" fill={activity.completed ? '#007AFF' : '#A0A0A0'} stroke={activity.completed ? '#A0A0A0' : '#CFD0D1'} strokeWidth={1.5} />
                  <Path d="M12 18.5L16.2 22.5L24 14.5" stroke="#CFD0D1" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>

            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000000' },
  scrollContent: { paddingBottom: 26 },
  topHeaderRow: {
    marginTop: 10,
    paddingHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: { width: 71, height: 71, borderRadius: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: 'Inter', fontSize: 45 / 3, lineHeight: 19, fontWeight: '600', color: '#F2F2F2' },
  profileHandle: { fontFamily: 'Inter', fontSize: 12, lineHeight: 15, fontWeight: '500', color: '#F2F2F2', marginTop: 1 },
  flagImage: { width: 17, height: 12, marginTop: 4 },
  closeBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -50,
  },
  closeX: { fontSize: 22, lineHeight: 23, color: '#1F1F1F', fontWeight: '400' },
  heroImage: {
    marginTop: 36,
    width: SCREEN_WIDTH,
    height: 385,
  },
  activitiesPanel: {
    marginTop: 0,
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    paddingHorizontal: 10,
    paddingBottom: 14,
    rowGap: 8,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 12,
    marginHorizontal: 15
  },
  searchBar: {
    flex: 1,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  filterBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 106,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: 8,
    paddingRight: 8,
  },
  mapWrap: {
    width: 164,
    height: 91,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  mapImage: {
    width: 164,
    height: 91,
  },
  terrainOverlay: {
    position: 'absolute',
    left: 12,
    top: 19,
  },
  mapRouteSvg: {
    position: 'absolute',
    left: 0,
    bottom: 8,
  },
  mapCornerIcon: {
    position: 'absolute',
    right: 10,
    bottom: 8,
  },
  openPill: {
    position: 'absolute',
    left: 25,
    top: 26,
    width: 85,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  openPillText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    color: '#000000',
  },
  metaSection: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 4,
  },
  cardDate: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: 42 / 3,
    lineHeight: 17,
    fontWeight: '500',
    color: '#282828',
  },
  cardLocation: {
    fontFamily: 'Inter',
    fontSize: 33 / 3,
    lineHeight: 17,
    fontWeight: '500',
    color: '#007AFF',
    marginTop: 1,
  },
  cardDistance: {
    fontFamily: 'Inter',
    fontSize: 33 / 3,
    lineHeight: 17,
    fontWeight: '500',
    color: '#007AFF',
    marginTop: 1,
  },
  checkWrap: {
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
