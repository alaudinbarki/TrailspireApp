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
    <SafeAreaView style={styles.screen} edges={['top']}>
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

        <View style={styles.activitiesPanel}>
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
                <Svg width={132} height={50} viewBox="0 0 132 50" fill="none" style={styles.mapRouteSvg}>
                  <Path d="M4 40C11 39 17 26 24 26C31 26 28 38 37 38C46 38 47 17 58 17C69 17 63 30 76 30C89 30 96 14 108 14C116 14 120 18 128 8" stroke="#007AFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" style={styles.mapCornerIcon}>
                  <Path d="M21.0727 11.1636C20.0916 8.55641 17.2201 7.23478 14.6714 8.23298L10.3628 9.9192L8.67661 5.61063C7.67842 3.06194 4.80696 1.74031 2.19979 2.72145C1.59625 2.94857 1.29063 3.62137 1.51776 4.22491C1.74488 4.82846 2.41767 5.13408 3.02122 4.90695C4.43201 4.37604 5.96967 5.09096 6.5085 6.46609L8.19699 10.7805L4.17721 12.3532C3.57366 12.5803 3.26804 13.2531 3.49517 13.8567C3.7223 14.4602 4.39509 14.7658 4.99863 14.5387L9.01842 12.966L10.7069 17.2804C11.2457 18.6556 10.5855 20.17 9.17469 20.7009C8.57115 20.9281 8.26553 21.6008 8.49266 22.2044C8.71979 22.8079 9.39258 23.1136 9.99612 22.8864C12.6033 21.9053 13.893 19.0503 12.8948 16.5016L11.2086 12.1931L15.5172 10.5069C16.928 9.97598 18.4656 10.6909 19.0045 12.066C19.2316 12.6696 19.9044 12.9752 20.5079 12.7481C21.1115 12.5209 21.4171 11.8481 21.19 11.2446L21.0727 11.1636Z" fill="#007AFF" />
                </Svg>
                <View style={styles.openPill}>
                  <Text style={styles.openPillText}>Open</Text>
                </View>
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
    marginBottom: 4,
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
  },
  mapImage: {
    width: 164,
    height: 91,
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
    top: 22,
    width: 85,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openPillText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '700',
    color: '#282828',
  },
  metaSection: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 4,
  },
  cardDate: {
    fontFamily: 'Inter',
    fontSize: 24,
    lineHeight: 20,
    fontWeight: '600',
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
