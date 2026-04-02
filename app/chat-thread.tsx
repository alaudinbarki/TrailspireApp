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
        <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <View style={styles.header}>
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

                <View style={styles.inputContainer}>
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
                        <Svg width={13} height={19} viewBox="0 0 13 19" fill="none" style={styles.micIcon}>
                            <Path
                                d="M-0.000488281 8.93994V7.29639C-0.000488281 7.08057 0.0769857 6.89795 0.231934 6.74854C0.386882 6.59912 0.569499 6.52441 0.779785 6.52441C1.00114 6.52441 1.18929 6.59912 1.34424 6.74854C1.49919 6.89795 1.57666 7.08057 1.57666 7.29639V8.88184C1.57666 9.82259 1.77311 10.6471 2.16602 11.3555C2.56445 12.0583 3.12061 12.6034 3.83447 12.9907C4.54834 13.3781 5.37565 13.5718 6.31641 13.5718C7.2627 13.5718 8.09001 13.3781 8.79834 12.9907C9.50667 12.6034 10.0601 12.0583 10.4585 11.3555C10.8569 10.6471 11.0562 9.82259 11.0562 8.88184V7.29639C11.0562 7.08057 11.1336 6.89795 11.2886 6.74854C11.4435 6.59912 11.6289 6.52441 11.8447 6.52441C12.0605 6.52441 12.2432 6.59912 12.3926 6.74854C12.5475 6.89795 12.625 7.08057 12.625 7.29639V8.93994C12.625 10.0799 12.3898 11.0871 11.9194 11.9614C11.4491 12.8358 10.7961 13.5358 9.96045 14.0615C9.13037 14.5872 8.17025 14.9027 7.08008 15.0078V16.7095H10.1265C10.3423 16.7095 10.5277 16.7842 10.6826 16.9336C10.8376 17.0885 10.915 17.2739 10.915 17.4897C10.915 17.7 10.8376 17.8799 10.6826 18.0293C10.5277 18.1842 10.3423 18.2617 10.1265 18.2617H2.50635C2.29053 18.2617 2.10514 18.1842 1.9502 18.0293C1.79525 17.8799 1.71777 17.7 1.71777 17.4897C1.71777 17.2739 1.79525 17.0885 1.9502 16.9336C2.10514 16.7842 2.29053 16.7095 2.50635 16.7095H5.55273V15.0078C4.46257 14.9027 3.49967 14.5872 2.66406 14.0615C1.82845 13.5358 1.17546 12.8358 0.705078 11.9614C0.234701 11.0871 -0.000488281 10.0799 -0.000488281 8.93994ZM3.13721 8.57471V3.39502C3.13721 2.73096 3.27279 2.14437 3.54395 1.63525C3.8151 1.12614 4.18864 0.727702 4.66455 0.439941C5.146 0.146647 5.69661 0 6.31641 0C6.9362 0 7.48405 0.146647 7.95996 0.439941C8.44141 0.727702 8.81494 1.12614 9.08057 1.63525C9.35173 2.14437 9.4873 2.73096 9.4873 3.39502V8.57471C9.4873 9.23877 9.35173 9.82536 9.08057 10.3345C8.81494 10.8436 8.44141 11.2448 7.95996 11.5381C7.48405 11.8258 6.9362 11.9697 6.31641 11.9697C5.69661 11.9697 5.146 11.8258 4.66455 11.5381C4.18864 11.2448 3.8151 10.8436 3.54395 10.3345C3.27279 9.82536 3.13721 9.23877 3.13721 8.57471ZM4.71436 8.59961C4.71436 9.15299 4.85824 9.60124 5.146 9.94434C5.43929 10.2819 5.82943 10.4507 6.31641 10.4507C6.80892 10.4507 7.19629 10.2819 7.47852 9.94434C7.76628 9.60124 7.91016 9.15299 7.91016 8.59961V3.37012C7.91016 2.81673 7.76628 2.37126 7.47852 2.03369C7.19629 1.69059 6.80892 1.51904 6.31641 1.51904C5.82943 1.51904 5.43929 1.69059 5.146 2.03369C4.85824 2.37126 4.71436 2.81673 4.71436 3.37012V8.59961Z"
                                fill="#D9D9D9"
                            />
                        </Svg>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#A0A0A0',
    },
    keyboardContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 6,
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
        paddingTop: 8,
        paddingHorizontal: 28,
        paddingBottom: 8,
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
        width: 13,
        height: 19,
    },
});
