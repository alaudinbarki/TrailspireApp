import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { AvatarPlaceholderSvg } from '../src/components/icons/AvatarPlaceholderSvg';
import { Colors } from '../src/constants/theme';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / BASE_HEIGHT;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const handleStart = () => {
    router.replace('/(tabs)/explore');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ width: screenWidth, height: sy(BASE_HEIGHT), position: 'relative' }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: sx(26), top: sy(65), width: sx(266), height: sy(30), justifyContent: 'center' }}
            onPress={() => router.back()}
            activeOpacity={0.6}
          >
            <Text allowFontScaling={false} style={[styles.backText, { fontSize: sx(16), lineHeight: sy(19), height: sy(19) }]}>{'< Back'}</Text>
          </TouchableOpacity>

          <View
            style={[
              styles.card,
              {
                width: sx(393),
                height: sy(743),
                left: sx(0),
                top: sy(120),
                borderRadius: sx(30),
              },
            ]}
          />

          <Text
            allowFontScaling={false}
            style={[
              styles.heading,
              {
                width: sx(335),
                left: sx((BASE_WIDTH - 335) / 2),
                top: sy(150),
                height: sy(89),
                fontSize: sx(32),
                lineHeight: sy(39),
              },
            ]}
          >
            Set your profile
          </Text>

          <TouchableOpacity
            style={{ position: 'absolute', left: sx(151), top: sy(223), width: sx(90), height: sy(90) }}
            activeOpacity={0.7}
            onPress={() => { }}
          >
            <View
              style={[
                styles.avatar,
                { width: sx(90), height: sy(90), borderRadius: sx(24) },
              ]}
            >
              <AvatarPlaceholderSvg width={sx(48)} height={sy(48)} color={Colors.textGray} />
            </View>

            <View
              style={[
                styles.plusOverlay,
                {
                  width: sx(17),
                  height: sy(18),
                  left: sx(57),
                  top: sy(19),
                },
              ]}
            >
              <View
                style={[
                  styles.plusVertical,
                  { width: sx(2), height: sy(12) },
                ]}
              />
              <View
                style={[
                  styles.plusHorizontal,
                  { width: sx(12), height: sy(2) },
                ]}
              />
            </View>
          </TouchableOpacity>

          <Text
            allowFontScaling={false}
            style={[
              styles.avatarText,
              {
                width: sx(266),
                left: sx(63),
                top: sy(328),
                height: sy(17),
                fontSize: sx(14),
                lineHeight: sy(17),
              },
            ]}
          >
            Choose a profile picture
          </Text>

          <View style={[styles.inputBox, { width: sx(314), height: sy(53), left: sx(39), top: sy(385), borderRadius: sx(24) }]}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor={Colors.textGray}
              autoCapitalize="words"
              allowFontScaling={false}
              style={[styles.inputText, { fontSize: sx(14), lineHeight: sy(17), paddingHorizontal: sx(24) }]}
            />
          </View>

          <View style={[styles.inputBox, { width: sx(314), height: sy(53), left: sx(39), top: sy(448), borderRadius: sx(24) }]}>
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="@nickname"
              placeholderTextColor={Colors.textGray}
              autoCapitalize="none"
              allowFontScaling={false}
              style={[styles.inputText, { fontSize: sx(14), lineHeight: sy(17), paddingHorizontal: sx(24) }]}
            />
          </View>

          <View style={[styles.inputBox, { width: sx(314), height: sy(53), left: sx(39), top: sy(511), borderRadius: sx(24) }]}>
            <TextInput
              value={nationality}
              onChangeText={setNationality}
              placeholder="Nationality"
              placeholderTextColor={Colors.textGray}
              allowFontScaling={false}
              style={[styles.inputText, { fontSize: sx(14), lineHeight: sy(17), paddingHorizontal: sx(24) }]}
            />
          </View>

          <View style={[styles.inputBox, { width: sx(314), height: sy(53), left: sx(39), top: sy(574), borderRadius: sx(24) }]}>
            <TextInput
              value={dob}
              onChangeText={setDob}
              placeholder="Date of birth"
              placeholderTextColor={Colors.textGray}
              allowFontScaling={false}
              style={[styles.inputText, { fontSize: sx(14), lineHeight: sy(17), paddingHorizontal: sx(24) }]}
            />
          </View>

          <Text
            allowFontScaling={false}
            style={[
              styles.stravaLine,
              {
                width: sx(266),
                left: sx(63),
                top: sy(644),
                height: sy(15),
                fontSize: sx(12),
                lineHeight: sy(15),
              },
            ]}
          >
            <Text style={styles.stravaConnect}>Connect to </Text>
            <Text style={styles.stravaBrand}>STRAVA</Text>
            <Text style={styles.stravaNow}> now</Text>
            <Text style={styles.stravaLater}> or do it later</Text>
          </Text>

          <View style={{ position: 'absolute', width: sx(314), left: sx(39), top: sy(680) }}>
            <Button
              title="Start"
              onPress={handleStart}
              style={{ width: sx(314), height: sy(53), borderRadius: sx(24) }}
            />
          </View>

          <Text allowFontScaling={false} style={[styles.supportText, { width: sx(266), left: sx(65), top: sy(793), height: sy(15), fontSize: sx(12), lineHeight: sy(15) }]}>
            Having issues? <Text style={styles.supportBold}>Contact Support</Text>
          </Text>
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
    includeFontPadding: false,
  },
  card: {
    position: 'absolute',
    backgroundColor: Colors.cardBackground,
    overflow: 'hidden',
  },
  heading: {
    position: 'absolute',
    fontWeight: '600',
    color: Colors.textDark,
    textAlign: 'center',
    includeFontPadding: false,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.inputBackground,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  plusOverlay: {
    position: 'absolute',
    backgroundColor: Colors.inputBackground,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    backgroundColor: Colors.textGray,
    borderRadius: 1,
  },
  plusVertical: {
    position: 'absolute',
    backgroundColor: Colors.textGray,
    borderRadius: 1,
  },
  avatarText: {
    position: 'absolute',
    fontWeight: '400',
    color: Colors.textGray,
    textAlign: 'center',
    includeFontPadding: false,
  },
  inputBox: {
    position: 'absolute',
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
  },
  inputText: {
    color: Colors.textDark,
    fontWeight: '400',
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  stravaLine: {
    position: 'absolute',
    color: Colors.textDark,
    textAlign: 'center',
    includeFontPadding: false,
  },
  stravaConnect: {
    color: Colors.textDark,
    fontWeight: '400',
  },
  stravaBrand: {
    color: Colors.stravaRed,
    fontWeight: '500',
  },
  stravaNow: {
    color: Colors.textDark,
    fontWeight: '500',
  },
  stravaLater: {
    color: Colors.textGray,
    fontWeight: '500',
  },
  supportText: {
    position: 'absolute',
    color: Colors.textGray,
    textAlign: 'center',
    includeFontPadding: false,
  },
  supportBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
});
