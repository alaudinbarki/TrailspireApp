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

const BASE_WIDTH = 393;

const FRIEND_AVATARS = [
  require('../assets/images/feed/friend_avatar_andyros.png'),
  require('../assets/images/feed/friend_rowbat88.png'),
  require('../assets/images/feed/friend_jhonny.png'),
];

const PHOTOS = [
  { id: 1, uri: require('../assets/images/feed/collection_preview_1.png') },
  { id: 2, uri: require('../assets/images/feed/collection_preview_2.png') },
  { id: 3, uri: require('../assets/images/feed/collection_preview_1.png') },
  { id: 4, uri: require('../assets/images/feed/collection_preview_2.png') },
  { id: 5, uri: require('../assets/images/feed/collection_preview_1.png') },
  { id: 6, uri: require('../assets/images/feed/collection_preview_2.png') },
  { id: 7, uri: require('../assets/images/feed/collection_preview_1.png') },
  { id: 8, uri: require('../assets/images/feed/collection_preview_2.png') },
  { id: 9, uri: require('../assets/images/feed/collection_preview_1.png') },
];

export default function UserProfileAtlasScreen() {
  const router = useRouter();
  const [atlasTab, setAtlasTab] = useState<'your' | 'all'>('your');

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <BackArrowIcon width={20} height={20} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/feed/user_profile_andrea.png')}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Andrea R</Text>
          <Text style={styles.profileUsername}>@andyros96</Text>
          <Text style={styles.profileStats}>1,236 followers · 987 following</Text>

          {/* Friends Preview */}
          <View style={styles.friendsPreview}>
            {FRIEND_AVATARS.map((avatar, idx) => (
              <Image
                key={idx}
                source={avatar}
                style={[
                  styles.friendAvatar,
                  idx > 0 && { marginLeft: -12 },
                ]}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => router.push('/messages-list')}>
              <Text style={styles.actionBtnText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => router.push('/chat-thread')}>
              <Text style={styles.actionBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.followBtn]} activeOpacity={0.7} onPress={() => { }}>
              <Text style={styles.followBtnText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <Image
            source={require('../assets/images/feed/atlas_map_view.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.mapOverlay} activeOpacity={0.7} onPress={() => router.push('/explore-results')}>
            <Text style={styles.mapTitle}>View Atlas Map</Text>
          </TouchableOpacity>
        </View>

        {/* Atlas Toggle */}
        <View style={styles.tabsSection}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, atlasTab === 'your' && styles.tabActive]}
              activeOpacity={0.7}
              onPress={() => setAtlasTab('your')}
            >
              <Text style={[styles.tabText, atlasTab === 'your' && styles.tabTextActive]}>
                Your Atlas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, atlasTab === 'all' && styles.tabActive]}
              activeOpacity={0.7}
              onPress={() => setAtlasTab('all')}
            >
              <Text style={[styles.tabText, atlasTab === 'all' && styles.tabTextActive]}>
                All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {PHOTOS.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              style={styles.photoItem}
              activeOpacity={0.7}
              onPress={() => router.push('/image-viewer')}
            >
              <Image source={photo.uri} style={styles.photoImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
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
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  profileAvatar: {
    width: 71,
    height: 71,
    borderRadius: 30,
    marginBottom: 12,
  },
  profileName: {
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 4,
  },
  profileUsername: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  profileStats: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  friendsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  friendAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#282828',
  },
  followBtn: {
    backgroundColor: '#007AFF',
  },
  followBtnText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mapSection: {
    height: 231,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  photoItem: {
    width: (BASE_WIDTH - 24) / 3,
    height: (BASE_WIDTH - 24) / 3,
    padding: 2,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
