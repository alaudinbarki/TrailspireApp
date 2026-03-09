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

export default function PhotoFullscreen2Screen() {
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
      <View style={styles.imageStack}>
        <Image
          source={require('../assets/images/feed/photo_preview_2.png')}
          style={styles.imageBehind}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/feed/photo_preview_3.png')}
          style={styles.imageFront}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gradient: { ...StyleSheet.absoluteFillObject },
  imageStack: { width: BASE_WIDTH * 0.85, height: BASE_HEIGHT * 0.65, position: 'relative' },
  imageBehind: { width: '90%', height: '80%', borderRadius: 16, position: 'absolute', top: 0, left: 0, opacity: 0.7, transform: [{ rotate: '-5deg' }] },
  imageFront: { width: '90%', height: '80%', borderRadius: 16, position: 'absolute', bottom: 0, right: 0, transform: [{ rotate: '3deg' }] },
});
