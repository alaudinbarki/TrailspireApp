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

const ASPECT_RATIOS = [
  { id: 1, label: '16:9', width: 16, height: 9 },
  { id: 2, label: '9:16', width: 9, height: 16 },
  { id: 3, label: '3:4', width: 3, height: 4 },
  { id: 4, label: '4:3', width: 4, height: 3 },
  { id: 5, label: '1:1', width: 1, height: 1 },
];

export default function PhotoCropLandscapeScreen() {
  const router = useRouter();
  const [selectedRatio, setSelectedRatio] = useState(1); // 16:9 by default

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
        <Text style={styles.headerTitle}>Crop Photo</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Photo Preview */}
      <View style={styles.photoContainer}>
        <Image
          source={require('../assets/images/feed/mountains_hero.png')}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={styles.cropOverlay}>
          <View style={styles.cropGrid}>
            <View style={styles.gridLineV} />
            <View style={[styles.gridLineV, { left: '66.66%' }]} />
            <View style={styles.gridLineH} />
            <View style={[styles.gridLineH, { top: '66.66%' }]} />
          </View>
        </View>
      </View>

      {/* Aspect Ratio Selector */}
      <View style={styles.ratioSection}>
        <Text style={styles.ratioLabel}>Aspect Ratio</Text>
        <View style={styles.ratioButtons}>
          {ASPECT_RATIOS.map((ratio) => (
            <TouchableOpacity
              key={ratio.id}
              style={[
                styles.ratioBtn,
                selectedRatio === ratio.id && styles.ratioBtnActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedRatio(ratio.id)}
            >
              <View
                style={[
                  styles.ratioIcon,
                  {
                    width: ratio.width * 4,
                    height: ratio.height * 4,
                  },
                  selectedRatio === ratio.id && styles.ratioIconActive,
                ]}
              />
              <Text
                style={[
                  styles.ratioText,
                  selectedRatio === ratio.id && styles.ratioTextActive,
                ]}
              >
                {ratio.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.8}
          onPress={() => router.push('/create-activity')}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#282828',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 49,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  photo: {
    width: 383,
    height: 250,
    borderRadius: 20,
  },
  cropOverlay: {
    position: 'absolute',
    width: 383,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
  },
  cropGrid: {
    flex: 1,
    position: 'relative',
  },
  gridLineV: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  gridLineH: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  ratioSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ratioLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  ratioButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  ratioBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ratioBtnActive: {
    backgroundColor: '#007AFF',
  },
  ratioIcon: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 4,
    marginBottom: 6,
  },
  ratioIconActive: {
    borderColor: '#FFFFFF',
  },
  ratioText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },
  ratioTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextBtn: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
