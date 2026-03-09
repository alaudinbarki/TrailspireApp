import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const BASE_WIDTH = 393;
const GRID_GAP = 5;
const NUM_COLS = 3;
const GRID_PADDING = 10;
const TILE_SIZE = (BASE_WIDTH - 2 * GRID_PADDING - GRID_GAP * (NUM_COLS - 1)) / NUM_COLS;

const GALLERY_IMAGES = [
  { id: '1', source: require('../assets/images/feed/gallery_1.png') },
  { id: '2', source: require('../assets/images/feed/gallery_2.png') },
  { id: '3', source: require('../assets/images/feed/gallery_3.png') },
  { id: '4', source: require('../assets/images/feed/gallery_4.png') },
  { id: '5', source: require('../assets/images/feed/gallery_5.png') },
  { id: '6', source: require('../assets/images/feed/gallery_6.png') },
  { id: '7', source: require('../assets/images/feed/gallery_7.png') },
  { id: '8', source: require('../assets/images/feed/gallery_8.png') },
  { id: '9', source: require('../assets/images/feed/feed_snow_mountain.png') },
  { id: '10', source: require('../assets/images/feed/feed_landscape.png') },
  { id: '11', source: require('../assets/images/feed/feed_adventure.png') },
  { id: '12', source: require('../assets/images/feed/feed_hiker_snow.png') },
  { id: '13', source: require('../assets/images/feed/feed_skiing.png') },
  { id: '14', source: require('../assets/images/feed/feed_tent.png') },
  { id: '15', source: require('../assets/images/feed/feed_iceland.png') },
  { id: '16', source: require('../assets/images/feed/feed_jeep.png') },
  { id: '17', source: require('../assets/images/feed/feed_powder.png') },
  { id: '18', source: require('../assets/images/feed/feed_trail_sunset.png') },
];

export default function PhotoGalleryScreen() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: typeof GALLERY_IMAGES[0] }) => {
    const isSelected = selectedImages.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.tile, isSelected && styles.tileSelected]}
        activeOpacity={0.8}
        onPress={() => toggleSelection(item.id)}
        onLongPress={() => router.push('/image-viewer')}
      >
        <Image source={item.source} style={styles.tileImage} resizeMode="cover" />
        {isSelected && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Drag Handle */}
      <View style={styles.handleBar}>
        <View style={styles.handle} />
      </View>

      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <BackArrowIcon width={16} height={16} color="#F2F2F2" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>All photos ▾</Text>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => router.push('/photo-crop-portrait')}>
          <Text style={styles.addBtnText}>
            ADD ({selectedImages.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Photo Grid */}
      <FlatList
        data={GALLERY_IMAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLS}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#282828',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 12,
  },

  // Handle
  handleBar: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handle: {
    width: 46,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#CFD0D1',
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#F2F2F2',
  },
  addBtn: {
    paddingVertical: 8,
  },
  addBtnText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: '#F2F2F2',
  },

  // Grid
  gridContainer: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 100,
  },
  gridRow: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  tileSelected: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
