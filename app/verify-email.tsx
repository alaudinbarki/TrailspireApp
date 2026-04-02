import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import { Button } from '../src/components/Button';
import { OTPInput } from '../src/components/OTPInput';
import { AtlasLogo } from '../src/components/AtlasLogo';
import { Colors } from '../src/constants/theme';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const displayEmail = email || 'jhoncarte@gmail.com';

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / BASE_HEIGHT;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const handleNext = () => {
    router.push('/profile-setup');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ width: screenWidth, height: sy(BASE_HEIGHT), position: 'relative' }}>
          <Svg
            style={StyleSheet.absoluteFill}
            width="100%"
            height="100%"
            viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
          >
            <Ellipse cx={195.5} cy={192.5} rx={235.5} ry={236.5} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
            <Ellipse cx={195} cy={193} rx={156} ry={157} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
            <Ellipse cx={195.5} cy={193.5} rx={104.5} ry={102.5} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
          </Svg>

          <TouchableOpacity
            style={{ position: 'absolute', left: sx(26), top: sy(65), width: sx(266), height: sy(19), justifyContent: 'center' }}
            onPress={() => router.back()}
            activeOpacity={0.6}
          >
            <Text allowFontScaling={false} style={[styles.backText, { fontSize: sx(16), lineHeight: sy(19), height: sy(19) }]}>{'< Back'}</Text>
          </TouchableOpacity>

          <View style={[styles.logoContainer, { width: sx(100), height: sy(100), left: sx((BASE_WIDTH - 100) / 2 - 0.5), top: sy(142), borderRadius: sx(30) }]}>
            <AtlasLogo size={sx(100)} />
          </View>

          <View style={[styles.cardSection, { width: sx(393), height: sy(529), left: sx(0), top: sy(323), borderTopLeftRadius: sx(30), borderTopRightRadius: sx(30) }]} />

          <Text allowFontScaling={false} style={[styles.heading, { width: sx(335), left: sx(29), top: sy(370), height: sy(89), fontSize: sx(32), lineHeight: sy(39) }]}>Verify your email</Text>

          <Text allowFontScaling={false} style={[styles.subtitle, { width: sx(266), left: sx(65), top: sy(455), height: sy(38), fontSize: sx(16), lineHeight: sy(19) }]}>
            We&apos;ve sent a 4-digit code to your{"\n"}email <Text style={styles.emailBold}>{displayEmail}</Text>
          </Text>

          <View style={{ position: 'absolute', width: sx(331), left: sx(31), top: sy(542) }}>
            <OTPInput
              length={4}
              gap={sx(9)}
              boxStyle={{ width: sx(76), height: sy(76), borderRadius: sx(24), fontSize: sx(32), lineHeight: sy(39) }}
              containerStyle={{ justifyContent: 'flex-start' }}
              onComplete={(code) => console.log('OTP:', code)}
            />
          </View>

          <View style={{ position: 'absolute', width: sx(314), left: sx((BASE_WIDTH - 314) / 2 - 0.5), top: sy(680) }}>
            <Button title="Next" onPress={handleNext} style={{ width: sx(314), height: sy(53), borderRadius: sx(24) }} />
          </View>

          <TouchableOpacity activeOpacity={0.6} style={{ width: sx(266), left: sx(65), top: sy(793), position: 'absolute' }} onPress={() => { }}>
            <Text allowFontScaling={false} style={[styles.resendText, { fontSize: sx(12), lineHeight: sy(15), height: sy(15) }]}>
              Didn&apos;t receive the code? <Text style={styles.resendBold}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 0,
  },
  backText: {
    color: Colors.textDark,
    fontWeight: '400',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSection: {
    position: 'absolute',
    backgroundColor: Colors.cardBackground,
  },
  heading: {
    position: 'absolute',
    fontWeight: '600',
    color: Colors.textDark,
    textAlign: 'center',
  },
  subtitle: {
    position: 'absolute',
    fontWeight: '400',
    color: Colors.textGray,
    textAlign: 'center',
  },
  emailBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
  resendText: {
    color: Colors.textGray,
    textAlign: 'center',
  },
  resendBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
});
