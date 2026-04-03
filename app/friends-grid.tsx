import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';
import { SearchIcon } from '../src/components/icons/SearchIcon';
import Svg, { Path } from 'react-native-svg';
import { scaleUniform, scaleWidth } from '../src/utils/globalScale';

const GRID_SIDE_PADDING = 16.5;
const GRID_GAP = 5.61;
const CARD_SIZE = scaleWidth((342 - (GRID_GAP * 4)) / 4);

const FRIENDS = [
  { id: 1, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png'), selected: true },
  { id: 2, username: '@jhonny_', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 3, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 4, username: '@nikros', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 5, username: '@lollo_mag', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 6, username: '@sam.stan', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 7, username: '@julio', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 8, username: '@rami', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 9, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 10, username: '@o.otto', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 11, username: '@andyros96', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 12, username: '@elen.wolf', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 13, username: '@willyd', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 14, username: '@este_go', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 15, username: '@itstom', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 16, username: '@carter__', image: require('../assets/images/feed/friend_carol3.png') },
];

export default function FriendsGridScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(
    () => FRIENDS.filter((friend) => friend.username.toLowerCase().includes(searchQuery.trim().toLowerCase())),
    [searchQuery]
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={[styles.header, { paddingTop: Math.max(55, insets.top + 24) }]}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <BackArrowIcon width={scaleUniform(20)} height={scaleUniform(20)} color="#282828" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <SearchIcon width={scaleUniform(18)} height={scaleUniform(18)} color="#6F6F6F" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#6F6F6F"
            />
          </View>

          <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.7} onPress={() => router.back()}>
            <Svg width={24} height={16} viewBox="0 0 24 16" fill="none" style={styles.confirmIcon}>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7352 14.1824C10.7507 14.1687 10.7659 14.1544 10.7808 14.1395L22.7132 2.20711C23.1037 1.81658 23.1037 1.18342 22.7132 0.792893C22.3227 0.402369 21.6895 0.402369 21.299 0.792893L9.98528 12.1066L2.20711 4.32843C1.81658 3.9379 1.18342 3.9379 0.792893 4.32843C0.402369 4.71895 0.402368 5.35212 0.792893 5.74264L9.27817 14.2279C9.6687 14.6184 10.3019 14.6184 10.6924 14.2279C10.7072 14.2131 10.7215 14.1979 10.7352 14.1824Z"
                fill="#D9D9D9"
                stroke="#D9D9D9"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>


      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentInner, { paddingBottom: Math.max(40, insets.bottom + 28) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Friends</Text>
        <View style={styles.grid}>
          {filteredFriends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.friendCard}
              activeOpacity={0.7}
              onPress={() => router.push('/user-profile-atlas')}
            >
              <View style={styles.friendPhotoWrap}>
                <Image source={friend.image} style={styles.friendPhoto} />
                {friend.selected ? (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.friendUsername} numberOfLines={1}>
                {friend.username}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    marginTop: 16,
    marginLeft: 12,
    marginBottom: 12
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    marginLeft: 10,
    marginRight: 7,
    backgroundColor: '#CFD0D1',
    borderRadius: 15,
    paddingHorizontal: 18,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#282828',
  },
  confirmBtn: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmIcon: {
    marginTop: -2,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingTop: 14,
    paddingHorizontal: GRID_SIDE_PADDING,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: GRID_GAP,
    rowGap: 15,
  },
  friendCard: {
    width: CARD_SIZE,
    alignItems: 'center',
  },
  friendPhotoWrap: {
    position: 'relative',
    width: 67.04,
    height: 67.04,
    marginBottom: 7,
  },
  friendPhoto: {
    width: 67.04,
    height: 67.04,
    borderRadius: 20,
  },
  selectedBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A0A0A0',
  },
  selectedBadgeText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  friendUsername: {
    width: '100%',
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    color: '#282828',
    textAlign: 'center',
  },
});
