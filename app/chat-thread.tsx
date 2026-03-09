import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const BASE_WIDTH = 393;

export default function ChatThreadScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <BackArrowIcon width={20} height={20} color="#282828" />
            </TouchableOpacity>

            <View style={styles.headerInfo}>
              <Text style={styles.contactName}>Alejandra Delgado</Text>
            </View>

            <Image
              source={require('../assets/images/feed/chat_avatar_alejandra.png')}
              style={styles.headerAvatar}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.timestamp}>Yesterday 8:22 AM</Text>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>Thanks for the rec</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleSent]}>
          <Text style={styles.textSent}>I thought that place was great 😊</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>Yea it really was</Text>
        </View>

        {/* Audio Message */}
        <View style={[styles.bubble, styles.bubbleSent, styles.audioBubble]}>
          <TouchableOpacity style={styles.playBtn} activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.playIcon} />
          </TouchableOpacity>
          <View style={styles.waveform}>
            {Array.from({ length: 40 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.waveBar,
                  { height: Math.random() * 20 + 5 },
                ]}
              />
            ))}
          </View>
          <Text style={styles.audioDuration}>00:04</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>Me too! Any places in mind?</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleSent]}>
          <Text style={styles.textSent}>Check out Haleakala</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>Perfect. I'll book it</Text>
        </View>

        <Text style={styles.timestamp}>Today 9:41 AM</Text>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>
            Have you watched the new episode of our show yet? Spoiler alert!
          </Text>
        </View>

        <View style={[styles.bubble, styles.bubbleSent]}>
          <Text style={styles.textSent}>
            Okay don't tell me! Are we still on for a late lunch with Christian today?
          </Text>
        </View>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>
            Yea you bet. lunch is still on!
          </Text>
        </View>

        <View style={[styles.bubble, styles.bubbleSent]}>
          <Text style={styles.textSent}>Sounds good 👍</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleSent]}>
          <Text style={styles.textSent}>See you there!</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleReceived]}>
          <Text style={styles.textReceived}>Awesome, see you soon!</Text>
        </View>
      </ScrollView>

      {/* Input Bar */}
      <SafeAreaView edges={['bottom']} style={styles.inputContainer}>
        <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
          <Text style={styles.cameraBtnText}>+</Text>
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="iMessage"
            placeholderTextColor="rgba(60,60,67,0.3)"
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>

        {message.length > 0 && (
          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.7} onPress={() => setMessage('')}>
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  header: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  contactName: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 17,
    color: '#000000',
  },
  headerAvatar: {
    width: 49,
    height: 49,
    borderRadius: 15,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  timestamp: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'rgba(60,60,67,0.6)',
    textAlign: 'center',
    marginVertical: 16,
  },
  bubble: {
    maxWidth: BASE_WIDTH * 0.7,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 18,
    marginBottom: 4,
  },
  bubbleSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  bubbleReceived: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(120,120,128,0.16)',
    borderBottomLeftRadius: 4,
  },
  textSent: {
    fontFamily: 'Inter',
    fontSize: 17,
    color: '#FFFFFF',
  },
  textReceived: {
    fontFamily: 'Inter',
    fontSize: 17,
    color: '#000000',
  },
  audioBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  playBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: '#FFFFFF',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 24,
  },
  waveBar: {
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1,
  },
  audioDuration: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#A0A0A0',
    gap: 8,
  },
  cameraBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtnText: {
    fontSize: 24,
    color: '#282828',
    fontWeight: '300',
  },
  inputWrapper: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    backgroundColor: '#F7F7F7',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: 'Inter',
    fontSize: 17,
    color: '#000000',
    minHeight: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
