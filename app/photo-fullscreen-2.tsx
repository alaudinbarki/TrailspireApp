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

export default function PhotoFullscreen2Screen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const stackWidth = width * 0.85;
  const stackHeight = Math.min(height * 0.65, height - (insets.top + insets.bottom + 80));

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
      <View style={[styles.imageStack, { width: stackWidth, height: stackHeight }]}>
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
  imageStack: { position: 'relative' },
  imageBehind: { width: '90%', height: '80%', borderRadius: 16, position: 'absolute', top: 0, left: 0, opacity: 0.7, transform: [{ rotate: '-5deg' }] },
  imageFront: { width: '90%', height: '80%', borderRadius: 16, position: 'absolute', bottom: 0, right: 0, transform: [{ rotate: '3deg' }] },
});
