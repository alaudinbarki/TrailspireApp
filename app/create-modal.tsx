import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_W } = Dimensions.get('window');

export default function CreateModalScreen() {
  const router = useRouter();
  const sheetWidth = Math.min(389, SCREEN_W - 16);

  return (
    <View style={styles.screen}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      <View style={[styles.sheet, { width: sheetWidth }]}>
        <Text style={styles.title}>Create</Text>

        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <View style={styles.closeLineLeft} />
          <View style={styles.closeLineRight} />
        </TouchableOpacity>

        <View style={styles.contentRow}>
          <TouchableOpacity
            style={styles.action}
            activeOpacity={0.8}
            onPress={() => {
              router.back();
              router.push('/photo-gallery');
            }}
          >
            <View style={styles.iconWrap}>
              <View style={styles.imageIconBox}>
                <View style={styles.imageOuter} />
                <View style={styles.imageDot} />
                <View style={styles.imageMountainA} />
                <View style={styles.imageMountainB} />
              </View>
              <View style={styles.plusBadge}>
                <View style={styles.plusVertical} />
                <View style={styles.plusHorizontal} />
              </View>
            </View>
            <Text style={styles.label}>Post</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.action}
            activeOpacity={0.8}
            onPress={() => {
              router.back();
              router.push('/new-collection-modal');
            }}

          >
            <View style={styles.iconWrap}>
              <View style={styles.libraryStack}>
                <View style={styles.libraryBack} />
                <View style={styles.libraryFront} />
              </View>
              <View style={styles.plusBadge}>
                <View style={styles.plusVertical} />
                <View style={styles.plusHorizontal} />
              </View>
            </View>
            <Text style={styles.label}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  sheet: {
    height: 173,
    backgroundColor: '#282828',
    borderRadius: 60,
    marginBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 28,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLineLeft: {
    position: 'absolute',
    width: 18,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#F2F2F2',
    transform: [{ rotate: '45deg' }],
  },
  closeLineRight: {
    position: 'absolute',
    width: 18,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#F2F2F2',
    transform: [{ rotate: '-45deg' }],
  },
  contentRow: {
    flexDirection: 'row',
    marginTop: 12,
    height: 108,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 1,
    marginVertical: 4,
  },
  iconWrap: {
    width: 42,
    height: 36,
    marginBottom: 10,
    position: 'relative',
  },
  imageIconBox: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 0,
    top: 4,
  },
  imageOuter: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1.6,
    borderColor: '#F2F2F2',
  },
  imageDot: {
    position: 'absolute',
    top: 5,
    left: 6,
    width: 5,
    height: 5,
    borderRadius: 3,
    borderWidth: 1.2,
    borderColor: '#F2F2F2',
  },
  imageMountainA: {
    position: 'absolute',
    bottom: 6,
    left: 7,
    width: 9,
    height: 1.6,
    backgroundColor: '#F2F2F2',
    transform: [{ rotate: '-35deg' }],
  },
  imageMountainB: {
    position: 'absolute',
    bottom: 7,
    left: 13,
    width: 11,
    height: 1.6,
    backgroundColor: '#F2F2F2',
    transform: [{ rotate: '35deg' }],
  },
  libraryStack: {
    width: 34,
    height: 30,
    position: 'absolute',
    left: 0,
    top: 3,
  },
  libraryBack: {
    position: 'absolute',
    top: 2,
    left: 10,
    width: 21,
    height: 24,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: '#F2F2F2',
  },
  libraryFront: {
    position: 'absolute',
    top: 6,
    left: 3,
    width: 21,
    height: 24,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: '#F2F2F2',
  },
  plusBadge: {
    position: 'absolute',
    right: 3,
    top: -2,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 9,
    borderRadius: 2,
    backgroundColor: '#F2F2F2',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#F2F2F2',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 27,
  },
});
