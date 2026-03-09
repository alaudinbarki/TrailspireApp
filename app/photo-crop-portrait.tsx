import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const BASE_WIDTH = 393;

const ASPECT_RATIOS = [
  { id: '9:16', label: '9:16', selected: true },
  { id: '16:9', label: '16:9', selected: false },
  { id: '3:4', label: '3:4', selected: false },
  { id: '4:3', label: '4:3', selected: false },
  { id: '1:1', label: '1:1', selected: false },
];

export default function PhotoCropPortraitScreen() {
  const router = useRouter();
  const [selectedRatio, setSelectedRatio] = useState('9:16');

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <BackArrowIcon width={20} height={20} color="#282828" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/create-activity')}
          >
            <Text style={styles.nextBtnText}>Next</Text>
            <Text style={styles.nextIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Photo Preview */}
        <View style={styles.photoContainer}>
          <Image
            source={require('../assets/images/feed/mountains_hero.png')}
            style={styles.photoPreview}
            resizeMode="cover"
          />
        </View>

        {/* Thumbnail & Add Button */}
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/images/feed/mountains_hero.png')}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </View>

        {/* Aspect Ratio Selector */}
        <View style={styles.aspectRatioRow}>
          {ASPECT_RATIOS.map((ratio) => (
            <TouchableOpacity
              key={ratio.id}
              style={styles.aspectBtn}
              activeOpacity={0.7}
              onPress={() => setSelectedRatio(ratio.id)}
            >
              <View
                style={[
                  styles.aspectIcon,
                  selectedRatio === ratio.id && styles.aspectIconActive,
                ]}
              >
                {ratio.id === '9:16' && <View style={styles.ratio916} />}
                {ratio.id === '16:9' && <View style={styles.ratio169} />}
                {ratio.id === '3:4' && <View style={styles.ratio34} />}
                {ratio.id === '4:3' && <View style={styles.ratio43} />}
                {ratio.id === '1:1' && <View style={styles.ratio11} />}
              </View>
              <Text
                style={[
                  styles.aspectText,
                  selectedRatio === ratio.id && styles.aspectTextActive,
                ]}
              >
                {ratio.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#282828',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    gap: 4,
  },
  nextBtnText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  nextIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  photoContainer: {
    marginTop: 6,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#A0A0A0',
    alignSelf: 'center',
    width: BASE_WIDTH - 10,
    height: 592,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
    gap: 10,
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 28,
    color: '#282828',
    fontWeight: '300',
  },
  thumbnail: {
    width: 54,
    height: 36,
    borderRadius: 8,
  },
  aspectRatioRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 20,
    paddingBottom: 20,
  },
  aspectBtn: {
    alignItems: 'center',
    gap: 6,
  },
  aspectIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aspectIconActive: {
    backgroundColor: '#007AFF',
  },
  ratio916: {
    width: 14,
    height: 24,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  ratio169: {
    width: 24,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  ratio34: {
    width: 16,
    height: 22,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  ratio43: {
    width: 22,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  ratio11: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  aspectText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: '#A0A0A0',
  },
  aspectTextActive: {
    color: '#007AFF',
  },
});
