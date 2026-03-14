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
import Svg, { Path } from 'react-native-svg';
import { scaleUniform } from '../src/utils/globalScale';

const WAVEFORM_HEIGHTS = [
    4, 4, 6, 8, 12, 4, 4, 6, 14, 18,
    14, 20, 18, 26, 18, 18, 20, 12, 8, 4,
    8, 12, 10, 14, 20, 22, 16, 10, 14, 14,
    18, 24, 16, 28, 34, 24, 18, 20, 10, 4,
];

function SentTail() {
    return (
        <Svg width={scaleUniform(17)} height={scaleUniform(18)} viewBox="0 0 17 18" style={styles.sentTail}>
            <Path
                d="M1.8 11C2.79 11 3.44 11.31 4.77 12.24C5.48 12.74 8.22 14.84 10.49 16.09C12.45 17.17 14.13 17.91 14.55 17.94C15.81 18.04 15.97 16.85 15.48 16.21C14.99 15.57 14.43 14.74 14.21 14.29C13.73 13.28 13.58 12.75 13.58 11.24C13.58 9.38 14.9 8 15.94 7.08C16.03 7 16.15 6.9 16.29 6.79C16.53 6.6 16.76 6.41 16.99 6.22V0H0V11H1.8Z"
                fill="#007AFF"
            />
        </Svg>
    );
}

function ReceivedTail() {
    return (
        <Svg width={scaleUniform(17)} height={scaleUniform(18)} viewBox="0 0 17 18" style={styles.receivedTail}>
            <Path
                d="M1.8 11C2.79 11 3.44 11.31 4.77 12.24C5.48 12.74 8.22 14.84 10.49 16.09C12.45 17.17 14.13 17.91 14.55 17.94C15.81 18.04 15.97 16.85 15.48 16.21C14.99 15.57 14.43 14.74 14.21 14.29C13.73 13.28 13.58 12.75 13.58 11.24C13.58 9.38 14.9 8 15.94 7.08C16.03 7 16.15 6.9 16.29 6.79C16.53 6.6 16.76 6.41 16.99 6.22V0H0V11H1.8Z"
                fill="rgba(120,120,128,0.16)"
            />
        </Svg>
    );
}

export default function ChatThreadScreen() {
    const router = useRouter();
    const [message, setMessage] = useState('');

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
        >
            <View style={styles.header}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            activeOpacity={0.7}
                            onPress={() => router.back()}
                        >
                            <BackArrowIcon width={scaleUniform(20)} height={scaleUniform(20)} color="#282828" />
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

            <ScrollView
                style={styles.messagesScroll}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.timestampRow, styles.timestampTop]}>
                    <Text style={styles.timestampDay}>Yesterday</Text>
                    <Text style={styles.timestampTime}>8:22 AM</Text>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w170]}>
                        <Text style={styles.textSent}>Thanks for the rec</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w280, styles.h61]}>
                        <Text style={styles.textSent}>I thought that place was great 😊</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w152]}>
                        <Text style={styles.textReceived}>Yea it really was</Text>
                        <ReceivedTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.audioBubble, styles.w280]}>
                        <TouchableOpacity style={styles.playBtn} activeOpacity={0.7} onPress={() => { }}>
                            <View style={styles.playIcon} />
                        </TouchableOpacity>
                        <View style={styles.waveform}>
                            {WAVEFORM_HEIGHTS.map((barHeight, i) => (
                                <View
                                    key={`bar-${i}`}
                                    style={[
                                        styles.waveBar,
                                        { height: scaleUniform(barHeight) },
                                    ]}
                                />
                            ))}
                        </View>
                        <Text style={styles.audioDuration}>00:04</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w249]}>
                        <Text style={styles.textReceived}>Me too! Any places in mind?</Text>
                        <ReceivedTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w188]}>
                        <Text style={styles.textSent}>Check out Haleakala</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w171]}>
                        <Text style={styles.textReceived}>Perfect. I’ll book it</Text>
                        <ReceivedTail />
                    </View>
                </View>

                <View style={styles.timestampRow}>
                    <Text style={styles.timestampDay}>Today</Text>
                    <Text style={styles.timestampTime}>9:41 AM</Text>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w280, styles.h84]}>
                        <Text style={styles.textReceived}>
                            Have you watched the new episode of our show yet? Spoiler alert!
                        </Text>
                        <ReceivedTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w280, styles.h84]}>
                        <Text style={styles.textSent}>
                            Okay don't tell me! Are we still on for a late lunch with Christian today?
                        </Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w252]}>
                        <Text style={styles.textReceived}>Yea you bet. lunch is still on!</Text>
                        <ReceivedTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w152]}>
                        <Text style={styles.textSent}>Sounds good 😊</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowRight]}>
                    <View style={[styles.bubble, styles.bubbleSent, styles.w140]}>
                        <Text style={styles.textSent}>See you there!</Text>
                        <SentTail />
                    </View>
                </View>

                <View style={[styles.messageRow, styles.messageRowLeft]}>
                    <View style={[styles.bubble, styles.bubbleReceived, styles.w222]}>
                        <Text style={styles.textReceived}>Awesome, see you soon!</Text>
                        <ReceivedTail />
                    </View>
                </View>
            </ScrollView>

            <SafeAreaView edges={['bottom']} style={styles.inputContainer}>
                <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
                    <Text style={styles.cameraBtnText}>＋</Text>
                </TouchableOpacity>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="iMessage"
                        placeholderTextColor="#D9D9D9"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <Text style={styles.micIcon}>􀊰</Text>
                </View>
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
        paddingHorizontal: 18,
        paddingBottom: 16,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
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
        fontFamily: 'SF Pro',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
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
        paddingHorizontal: 16.5,
        paddingTop: 1,
        paddingBottom: 126,
    },
    timestampRow: {
        width: 360,
        height: 26,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingTop: 4,
        marginBottom: 4,
    },
    timestampTop: {
        marginTop: 1,
    },
    timestampDay: {
        fontFamily: 'SF Pro',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 22,
        color: 'rgba(60,60,67,0.6)',
    },
    timestampTime: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 22,
        color: 'rgba(60,60,67,0.6)',
    },
    messageRow: {
        width: 360,
        paddingBottom: 8,
    },
    messageRowRight: {
        alignItems: 'flex-end',
    },
    messageRowLeft: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: 280,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 20,
        justifyContent: 'center',
    },
    bubbleSent: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 20,
        overflow: 'visible',
    },
    bubbleReceived: {
        backgroundColor: 'rgba(120,120,128,0.16)',
        borderBottomLeftRadius: 20,
        overflow: 'visible',
    },
    textSent: {
        fontFamily: 'SF Pro',
        fontSize: 17,
        lineHeight: 22,
        color: '#FFFFFF',
    },
    textReceived: {
        fontFamily: 'SF Pro',
        fontSize: 17,
        lineHeight: 22,
        color: '#000000',
    },
    w140: {
        width: 140,
        minHeight: 40,
    },
    w152: {
        width: 152,
        minHeight: 40,
    },
    w170: {
        width: 170,
        minHeight: 40,
    },
    w171: {
        width: 171,
        minHeight: 40,
    },
    w188: {
        width: 188,
        minHeight: 40,
    },
    w222: {
        width: 222,
        minHeight: 40,
    },
    w249: {
        width: 249,
        minHeight: 40,
    },
    w252: {
        width: 252,
        minHeight: 40,
    },
    w280: {
        width: 280,
    },
    h61: {
        minHeight: 61,
    },
    h84: {
        minHeight: 84,
    },
    audioBubble: {
        minHeight: 76,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 21,
    },
    playBtn: {
        width: 33,
        height: 33,
        borderRadius: 16.5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playIcon: {
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftColor: '#007AFF',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        marginLeft: 2,
    },
    waveform: {
        width: 183,
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingLeft: 10,
        paddingRight: 15,
        marginLeft: 6,
    },
    waveBar: {
        width: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    audioDuration: {
        fontFamily: 'SF Pro',
        fontSize: 13,
        lineHeight: 22,
        color: 'rgba(255,255,255,0.6)',
    },
    sentTail: {
        position: 'absolute',
        right: 7,
        bottom: -7,
    },
    receivedTail: {
        position: 'absolute',
        left: 7,
        bottom: -7,
        transform: [{ scaleX: -1 }],
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 4,
        paddingHorizontal: 28,
        paddingBottom: 28,
        gap: 12,
        backgroundColor: '#A0A0A0',
    },
    cameraBtn: {
        width: 40,
        height: 40,
        borderRadius: 296,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBtnText: {
        fontSize: 28,
        lineHeight: 33,
        color: '#404040',
        fontWeight: '400',
    },
    inputWrapper: {
        flex: 1,
        height: 40,
        borderRadius: 296,
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 10,
        gap: 8,
    },
    textInput: {
        flex: 1,
        fontFamily: 'SF Pro',
        fontSize: 17,
        lineHeight: 20,
        color: '#000000',
        paddingVertical: 0,
    },
    micIcon: {
        fontFamily: 'SF Pro',
        fontSize: 17,
        lineHeight: 20,
        color: '#D9D9D9',
    },
});
