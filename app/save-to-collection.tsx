import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '../src/components/icons/SearchIcon';

const { width: SCREEN_W } = Dimensions.get('window');

const COLLECTIONS = [
  { id: 1, title: 'Skitouring Switzerland', count: 29, privacy: 'Only you', image: require('../assets/images/feed/skitouring_cover.png') },
  { id: 2, title: 'Utah Trails', count: 9, privacy: 'Only you', image: require('../assets/images/feed/collection_preview_1.png') },
  { id: 3, title: 'Bikers', count: 46, privacy: 'Shared', image: require('../assets/images/feed/bikers_cover.png') },
  { id: 4, title: 'Norway ski trip', count: 12, privacy: 'Only you', image: require('../assets/images/feed/norway_ski_cover.png') },
];

export default function SaveToCollectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.backdrop}>
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => router.back()} />
      <SafeAreaView style={styles.sheet} edges={['top', 'bottom']}>
        {/* Activity preview header */}
        <View style={styles.activityHeader}>
          <Image source={require('../assets/images/feed/activity_data_bg.png')} style={styles.activityBg} />
          <View style={styles.activityOverlay}>
            <View style={styles.handle} />
            <Text style={styles.activityTitle}>Backcountry Skiing</Text>
            <Text style={styles.activitySub}>Oslo, Norway · 33 km</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <SearchIcon width={16} height={16} color="#A0A0A0" />
            <Text style={styles.searchPlaceholder}>Search collections</Text>
          </View>
        </View>

        {/* Collections header */}
        <View style={styles.collectionHeader}>
          <Text style={styles.collectionTitle}>Collections</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/new-collection-modal')}>
            <Text style={styles.newBtn}>+ New</Text>
          </TouchableOpacity>
        </View>

        {/* Collection list */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {COLLECTIONS.map((col) => (
            <TouchableOpacity
              key={col.id}
              style={styles.collectionItem}
              activeOpacity={0.7}
              onPress={() => router.push('/collection-detail-feed')}
            >
              <Image source={col.image} style={styles.collectionThumb} />
              <View style={styles.collectionInfo}>
                <Text style={styles.collectionName}>{col.title}</Text>
                <Text style={styles.collectionMeta}>{col.count} elements · {col.privacy}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  dismissArea: { flex: 1 },
  sheet: { backgroundColor: '#282828', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  activityHeader: { height: 100, overflow: 'hidden', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  activityBg: { width: '100%', height: '100%', position: 'absolute' },
  activityOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: 16 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginBottom: 12 },
  activityTitle: { fontFamily: 'Inter', fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  activitySub: { fontFamily: 'Inter', fontSize: 13, color: '#D9D9D9', marginTop: 4 },
  searchRow: { paddingHorizontal: 16, paddingVertical: 12 },
  searchBar: { backgroundColor: '#3A3A3A', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchPlaceholder: { fontFamily: 'Inter', fontSize: 14, color: '#A0A0A0' },
  collectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
  collectionTitle: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  newBtn: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#007AFF' },
  listContent: { paddingHorizontal: 16, paddingBottom: 30 },
  collectionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.1)' },
  collectionThumb: { width: 52, height: 52, borderRadius: 10 },
  collectionInfo: { flex: 1, marginLeft: 14 },
  collectionName: { fontFamily: 'Inter', fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  collectionMeta: { fontFamily: 'Inter', fontSize: 12, color: '#A0A0A0', marginTop: 2 },
  chevron: { fontSize: 22, color: '#A0A0A0', marginLeft: 8 },
});
