import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function PhotoFullscreen1Screen() {
  const router = useRouter();

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
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gradient: { ...StyleSheet.absoluteFillObject },
  image: { width: BASE_WIDTH * 0.85, height: BASE_HEIGHT * 0.65, borderRadius: 16 },
});
