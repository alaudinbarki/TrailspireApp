import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AtlasLogo } from '../src/components/AtlasLogo';
import { StravaLogoSvg } from '../src/components/icons/StravaLogoSvg';
import { AppleLogoSvg } from '../src/components/icons/AppleLogoSvg';
import { GoogleLogoSvg } from '../src/components/icons/GoogleLogoSvg';
import { Button } from '../src/components/Button';
import { Colors, BorderRadius } from '../src/constants/theme';

// Local image assets
const PHOTOS = {
  runnersOnDunes: require('../assets/images/runners_on_dunes.png'),
  personOnCliff: require('../assets/images/person_on_cliff.png'),
  cyclist: require('../assets/images/cyclist.png'),
  sandWalker: require('../assets/images/sand_walker.png'),
  motorcycleRoad: require('../assets/images/motorcycle_road.png'),
  sandDunePerson: require('../assets/images/sand_dune_person.png'),
};

export default function LandingScreen() {
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / BASE_HEIGHT;

  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ width: screenWidth, height: sy(BASE_HEIGHT), position: 'relative' }}>
          {/* Photo Collage Card */}
          <View
            style={[
              styles.collageCard,
              {
                width: sx(317),
                height: sy(362),
                left: sx((BASE_WIDTH - 317) / 2),
                top: sy(74),
                borderRadius: sx(30),
              },
            ]}
          >
            {/* Decorative circles inside card */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <View
                style={[
                  styles.cardCircleOuter,
                  {
                    width: sx(317),
                    height: sy(317),
                    borderRadius: sx(158.5),
                    top: sy(23),
                    borderColor: 'rgba(160, 160, 160, 0.2)',
                  },
                ]}
              />
              <View
                style={[
                  styles.cardCircleMedium,
                  {
                    width: sx(210),
                    height: sy(210),
                    borderRadius: sx(105),
                    left: sx(53),
                    top: sy(76),
                    borderColor: 'rgba(160, 160, 160, 0.2)',
                  },
                ]}
              />
              <View
                style={[
                  styles.cardCircleInner,
                  {
                    width: sx(141),
                    height: sy(139),
                    borderRadius: sx(70),
                    left: sx(88),
                    top: sy(112),
                    borderColor: 'rgba(160, 160, 160, 0.2)',
                  },
                ]}
              />
            </View>

            {/* Photos - absolute positions matching Figma exactly */}
            {/* Row 1: Runners on dunes + Person on cliff */}
            <Image
              source={PHOTOS.runnersOnDunes}
              style={[styles.photoRunners, { left: sx(54.41), top: sy(26.37), width: sx(120.96), height: sy(75.05), borderRadius: sx(12) }]}
              resizeMode="cover"
            />
            <Image
              source={PHOTOS.personOnCliff}
              style={[styles.photoCliff, { left: sx(208), top: sy(21), width: sx(83.88), height: sy(83.88), borderRadius: sx(12) }]}
              resizeMode="cover"
            />

            {/* Row 2: Cyclist + ATLAS logo + Sand walker */}
            <Image
              source={PHOTOS.cyclist}
              style={[styles.photoCyclist, { left: sx(18), top: sy(124), width: sx(77.7), height: sy(114.78), borderRadius: sx(12) }]}
              resizeMode="cover"
            />
            <View
              style={[
                styles.logoInCard,
                {
                  left: sx(128),
                  top: sy(151),
                  width: sx(60),
                  height: sy(60),
                },
              ]}
            >
              <AtlasLogo size={sx(60)} />
            </View>
            <Image
              source={PHOTOS.sandWalker}
              style={[styles.photoSandWalker, { left: sx(237), top: sy(128), width: sx(62), height: sy(83), borderRadius: sx(12) }]}
              resizeMode="cover"
            />

            {/* Row 3: Motorcycle road + Sand dune person */}
            <Image
              source={PHOTOS.motorcycleRoad}
              style={[styles.photoMotorcycle, { left: sx(57), top: sy(265), width: sx(107.72), height: sy(73.28), borderRadius: sx(12) }]}
              resizeMode="cover"
            />
            <Image
              source={PHOTOS.sandDunePerson}
              style={[styles.photoSandDune, { left: sx(195), top: sy(227), width: sx(84), height: sy(115), borderRadius: sx(12) }]}
              resizeMode="cover"
            />
          </View>


          {/* Heading */}
          <Text
            style={[
              styles.heading,
              {
                // width: sx(334),
                // left: sx((BASE_WIDTH - 334) / 2.2),
                width: sx(266),
                left: sx(50),
                top: sy(465),
                fontSize: sx(32),
                lineHeight: sy(39),

              },
            ]}
          >
            See it. Plan it. Go
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtext,
              {
                width: sx(266),
                left: sx(65),
                top: sy(511),
                fontSize: sx(16),
                lineHeight: sy(19),
              },
            ]}
          >
            Track the effort. Tell the story.{'\n'}
            Find your next challenge and go{'\n'}earn it.
          </Text>

          {/* Sign Up Button */}
          <View style={[styles.buttonContainer, { width: sx(314), left: sx((BASE_WIDTH - 314) / 2), top: sy(597) }]}>
            <Button
              title="Sign up"
              onPress={() => router.push('/profile-setup')}
              style={{ width: sx(314), height: sy(53), borderRadius: sx(24) }}
            />
          </View>

          {/* Already have account */}
          <TouchableOpacity
            style={[styles.loginLink, { width: sx(266), left: sx(65), top: sy(655) }]}
            onPress={() => router.push('/sign-in')}
            activeOpacity={0.6}
          >
            <Text style={[styles.loginText, { fontSize: sx(12), lineHeight: sy(15) }]}>
              Already have an account? <Text style={styles.loginBold}>Log in</Text>
            </Text>
          </TouchableOpacity>

          {/* Divider with "or" */}
          <View style={[styles.dividerContainer, { width: sx(291), left: sx((BASE_WIDTH - 291) / 2), top: sy(687) }]}>
            <View style={styles.dividerLine} />
          </View>
          <View
            style={[
              styles.dividerBg,
              {
                width: sx(34),
                height: sy(21),
                borderRadius: sx(24),
                left: sx((BASE_WIDTH - 34) / 2 - 0.5),
                top: sy(676),
              },
            ]}
          >
            <Text style={[styles.dividerText, { fontSize: sx(14), lineHeight: sy(17) }]}>or</Text>
          </View>

          <View style={[styles.socialButtonWrap, { left: sx(39), top: sy(707) }]}>
            <TouchableOpacity
              style={[styles.socialButton, { width: sx(98), height: sy(53), borderRadius: sx(24) }]}
              activeOpacity={0.7}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <View style={[styles.stravaIconWrap, { left: sx(31), top: sy(21) }]}>
                <StravaLogoSvg width={sx(56)} height={sy(12)} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.socialButtonWrap, { left: sx(147), top: sy(707) }]}>
            <TouchableOpacity
              style={[styles.socialButton, { width: sx(98), height: sy(53), borderRadius: sx(24) }]}
              activeOpacity={0.7}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <View style={[styles.appleIconWrap, { left: sx(39), top: sy(12) }]}>
                <AppleLogoSvg width={sx(21)} height={sy(24)} color="#282828" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.socialButtonWrap, { left: sx(255), top: sy(707) }]}>
            <TouchableOpacity
              style={[styles.socialButton, { width: sx(98), height: sy(53), borderRadius: sx(24) }]}
              activeOpacity={0.7}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <GoogleLogoSvg width={sx(22)} height={sy(22)} />
            </TouchableOpacity>
          </View>

          {/* Support */}
          <TouchableOpacity style={{ width: sx(266), left: sx(65), top: sy(769), position: 'absolute' }} activeOpacity={0.7} onPress={() => { }}>
            <Text style={[styles.supportText, { fontSize: sx(10), lineHeight: sy(12) }]}>
              Having issues? <Text style={styles.supportBold}>Contact Support</Text>
            </Text>
          </TouchableOpacity>

          {/* Legal */}
          <Text style={[styles.legalText, { width: sx(266), left: sx(65), top: sy(804), fontSize: sx(10), lineHeight: sy(12) }]}>
            By continuing, you agree to ATLAS <Text style={styles.legalBold} onPress={() => { }}>Privacy Policy</Text> and{'\n'}
            <Text style={styles.legalBold} onPress={() => { }}>Terms of Service</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

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
  collageCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'absolute',
  },
  // Circles inside card
  cardCircleOuter: {
    position: 'absolute',
    borderWidth: 1,
    left: 0,
  },
  cardCircleMedium: {
    position: 'absolute',
    borderWidth: 1,
  },
  cardCircleInner: {
    position: 'absolute',
    borderWidth: 1,
  },
  //  Photo positions from Figma 
  // Row 1
  photoRunners: {
    position: 'absolute',
  },
  photoCliff: {
    position: 'absolute',
  },
  // Row 2
  photoCyclist: {
    position: 'absolute',
  },
  logoInCard: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoSandWalker: {
    position: 'absolute',
  },
  // Row 3
  photoMotorcycle: {
    position: 'absolute',
  },
  photoSandDune: {
    position: 'absolute',
  },
  //  Typography 
  heading: {
    fontWeight: '600',
    color: Colors.textDark,
    textAlign: 'center',
    position: 'absolute',
  },
  subtext: {
    fontWeight: '400',
    color: Colors.textGray,
    position: 'absolute',
  },
  //  Button 
  buttonContainer: {
    position: 'absolute',
  },
  //  Login link 
  loginLink: {
    position: 'absolute',
  },
  loginText: {
    color: Colors.textGray,
    textAlign: 'center',
  },
  loginBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
  //  Divider 
  dividerContainer: {
    position: 'absolute',
  },
  dividerLine: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
  dividerBg: {
    backgroundColor: Colors.background,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerText: {
    color: Colors.textGray,
    textAlign: 'center',
  },
  //  Social buttons 
  socialButtonWrap: {
    position: 'absolute',
  },
  socialButton: {
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stravaIconWrap: {
    position: 'absolute',
  },
  appleIconWrap: {
    position: 'absolute',
  },
  //  Footer 
  supportText: {
    color: Colors.textGray,
    textAlign: 'center',
  },
  supportBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
  legalText: {
    position: 'absolute',
    color: Colors.textGray,
    textAlign: 'center',
  },
  legalBold: {
    color: Colors.textDark,
    fontWeight: '600',
  },
});
