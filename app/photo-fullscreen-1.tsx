import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PhotoFullscreen1Screen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const imageWidth = width * 0.85;
  const imageHeight = Math.min(height * 0.65, height - (insets.top + insets.bottom + 80));

  return (
    <TouchableOpacity
      style={styles.screen}
      activeOpacity={1}
      onPress={() => router.back()}
    >
      <LinearGradient
        colors={['#9CE6FF', '#A8CFDB']}
        style={styles.gradient}
      />
      <Image
        source={require('../assets/images/feed/photo_preview_1.png')}
        style={[styles.image, { width: imageWidth, height: imageHeight }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gradient: { ...StyleSheet.absoluteFillObject },
  image: { borderRadius: 16 },
});
