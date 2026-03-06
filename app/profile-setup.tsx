import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { TextInput } from '../src/components/TextInput';
import { BackButton } from '../src/components/BackButton';
import { AvatarPlaceholderSvg } from '../src/components/icons/AvatarPlaceholderSvg';
import { Colors } from '../src/constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');

  const handleStart = () => {
    router.replace('/(tabs)/explore');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Back button on main background */}
            <BackButton onPress={() => router.back()} />

            {/*  Card Section  */}
            <View style={styles.cardSection}>
              <Text style={styles.heading}>Set your profile</Text>

              {/* Avatar */}
              <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7} onPress={() => {}}>
                <View style={styles.avatar}>
                  <AvatarPlaceholderSvg width={48} height={48} color={Colors.textGray} />
                  {/* "+" overlay at top-right corner */}
                  <View style={styles.plusOverlay}>
                    <View style={styles.plusHorizontal} />
                    <View style={styles.plusVertical} />
                  </View>
                </View>
                <Text style={styles.avatarText}>Choose a profile picture</Text>
              </TouchableOpacity>

              {/* Inputs */}
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
                <TextInput
                  placeholder="@nickname"
                  value={nickname}
                  onChangeText={setNickname}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Nationality"
                  value={nationality}
                  onChangeText={setNationality}
                />
                <TextInput
                  placeholder="Date of birth"
                  value={dob}
                  onChangeText={setDob}
                />
              </View>

              {/* Strava connect */}
              <Text style={styles.stravaLine}>
                <Text style={styles.stravaConnect}>Connect to</Text>
                {' '}
                <Text style={styles.stravaBrand}>STRAVA</Text>
                {' '}
                <Text style={styles.stravaNow}>now</Text>
                <Text style={styles.stravaLater}> or do it later</Text>
              </Text>

              {/* Start Button */}
              <View style={styles.buttonContainer}>
                <Button title="Start" onPress={handleStart} />
              </View>

              <View style={styles.spacer} />

              {/* Contact Support */}
              <Text style={styles.supportText}>
                Having issues?{' '}
                <Text style={styles.supportBold}>Contact Support</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  //  Card 
  cardSection: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 50,
    marginTop: 15,
    flexGrow: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 36,
  },
  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: Colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  plusOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 18,
    height: 18,
    backgroundColor: Colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: Colors.textGray,
    borderRadius: 1,
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 12,
    backgroundColor: Colors.textGray,
    borderRadius: 1,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textGray,
    textAlign: 'center',
  },
  // Inputs
  inputGroup: {
    gap: 10,
    marginBottom: 17,
  },
  // Strava
  stravaLine: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  stravaConnect: {
    color: Colors.textDark,
    fontWeight: '400',
  },
  stravaBrand: {
    color: '#FF3B30',
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
  // Button
  buttonContainer: {
    marginBottom: 20,
  },
  spacer: { flex: 1, minHeight: 50 },
  // Support
  supportText: {
    fontSize: 12,
    color: Colors.textGray,
    textAlign: 'center',
    paddingBottom: 10,
  },
  supportBold: {
    color: Colors.textDark,
    fontWeight: '500',
  },
});
