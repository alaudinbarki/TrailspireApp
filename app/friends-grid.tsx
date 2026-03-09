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

const BASE_WIDTH = 393;
const CARD_SIZE = (BASE_WIDTH - 64) / 4;

const FRIENDS = [
  { id: 1, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 2, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 3, username: '@jhonny', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 4, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 5, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 6, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 7, username: '@jhonny', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 8, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 9, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 10, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 11, username: '@jhonny', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 12, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
  { id: 13, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 14, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 15, username: '@jhonny', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 16, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
];

export default function FriendsGridScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <BackArrowIcon width={20} height={20} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <SearchIcon width={18} height={18} color="#A0A0A0" />
          <Text style={styles.searchPlaceholder}>Search friends...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
          <FilterIcon width={20} height={20} color="#282828" />
        </TouchableOpacity>
      </View>

      {/* Friends Grid */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {FRIENDS.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.friendCard}
              activeOpacity={0.7}
              onPress={() => router.push('/user-profile-atlas')}
            >
              <Image source={friend.image} style={styles.friendPhoto} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 49,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#282828',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#A0A0A0',
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  friendCard: {
    width: CARD_SIZE,
    alignItems: 'center',
    marginBottom: 8,
  },
  friendPhoto: {
    width: 67,
    height: 67,
    borderRadius: 20,
    marginBottom: 8,
  },
  friendUsername: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#282828',
    textAlign: 'center',
  },
});
