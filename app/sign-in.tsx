import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    PixelRatio,
    useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import { Button } from '../src/components/Button';
import { TextInput } from '../src/components/TextInput';
import { AtlasLogo } from '../src/components/AtlasLogo';
import { Colors } from '../src/constants/theme';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function SignInScreen() {
    const router = useRouter();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const scaleX = screenWidth / BASE_WIDTH;
    const scaleY = screenHeight / BASE_HEIGHT;
    const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
    const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

    const handleVerify = () => {
        router.push({ pathname: '/verify-email', params: { email } });
    };

    return (
        <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={{ minHeight: screenHeight }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={{ width: screenWidth, height: sy(BASE_HEIGHT), position: 'relative' }}>
                    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}>
                        <Ellipse cx={195.5} cy={192.5} rx={235.5} ry={236.5} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
                        <Ellipse cx={195} cy={193} rx={156} ry={157} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
                        <Ellipse cx={195.5} cy={193.5} rx={104.5} ry={102.5} stroke="#A0A0A0" strokeOpacity={0.2} strokeWidth={1} fill="none" />
                    </Svg>

                    <View
                        style={[
                            styles.logoWrap,
                            {
                                width: sx(100),
                                height: sy(100),
                                left: sx((BASE_WIDTH - 100) / 2 - 0.5),
                                top: sy(142),
                                borderRadius: sx(30),
                            },
                        ]}
                    >
                        <AtlasLogo size={sx(100)} />
                    </View>

                    <TouchableOpacity style={[styles.backTouch, { left: sx(26), top: sy(65) }]} activeOpacity={0.7} onPress={() => router.back()}>
                        <Text allowFontScaling={false} style={[styles.backText, { fontSize: sx(16), lineHeight: sy(19), height: sy(19) }]}>{'< Back'}</Text>
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.cardSection,
                            {
                                width: sx(393),
                                height: sy(529),
                                left: 0,
                                top: sy(323),
                                borderTopLeftRadius: sx(30),
                                borderTopRightRadius: sx(30),
                            },
                        ]}
                    />

                    <Text allowFontScaling={false} style={[styles.heading, { width: sx(335), left: sx(29), top: sy(370), height: sy(89), fontSize: sx(32), lineHeight: sy(39) }]}>
                        Sign in
                    </Text>

                    <Text allowFontScaling={false} style={[styles.subtitle, { width: sx(266), left: sx(65), top: sy(450), height: sy(38), fontSize: sx(16), lineHeight: sy(19) }]}>
                        To sign in to an account, enter{"\n"}your email and password
                    </Text>

                    <View style={[styles.inputWrap, { width: sx(314), left: sx((BASE_WIDTH - 314) / 2 - 0.5), top: sy(510) }]}>
                        <TextInput
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            containerStyle={{ width: sx(314), height: sy(53), borderRadius: sx(24) }}
                        />
                    </View>

                    <View style={[styles.inputWrap, { width: sx(314), left: sx((BASE_WIDTH - 314) / 2 - 0.5), top: sy(574) }]}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            containerStyle={{ width: sx(314), height: sy(53), borderRadius: sx(24) }}
                        />
                    </View>

                    <TouchableOpacity style={{ width: sx(266), left: sx(65), top: sy(644), position: 'absolute' }} onPress={() => router.push('/sign-in')} activeOpacity={0.6}>
                        <Text allowFontScaling={false} style={[styles.linkText, { fontSize: sx(12), lineHeight: sy(15), height: sy(15) }]}>
                            Already have an account? <Text style={styles.linkBold}>Log in</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: sx(314), left: sx((BASE_WIDTH - 314) / 2 - 0.5), top: sy(680), position: 'absolute' }}>
                        <Button
                            title="Verify Code"
                            onPress={handleVerify}
                            style={{ width: sx(314), height: sy(53), borderRadius: sx(24) }}
                        />
                    </View>

                    <TouchableOpacity style={{ width: sx(266), left: sx(65), top: sy(793), position: 'absolute' }} activeOpacity={0.7} onPress={() => { }}>
                        <Text allowFontScaling={false} style={[styles.supportText, { fontSize: sx(12), lineHeight: sy(15), height: sy(15) }]}>
                            Having issues? <Text style={styles.supportBold}>Contact Support</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scroll: {
        flex: 1,
    },
    logoWrap: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backTouch: {
        position: 'absolute',
    },
    backText: {
        color: Colors.textDark,
        fontWeight: '400',
        includeFontPadding: false,
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
        includeFontPadding: false,
    },
    subtitle: {
        position: 'absolute',
        fontWeight: '400',
        color: Colors.textGray,
        textAlign: 'center',
        includeFontPadding: false,
    },
    inputWrap: {
        position: 'absolute',
    },
    linkText: {
        color: Colors.textGray,
        textAlign: 'center',
        includeFontPadding: false,
    },
    linkBold: {
        color: Colors.textDark,
        fontWeight: '500',
    },
    supportText: {
        color: Colors.textGray,
        textAlign: 'center',
        includeFontPadding: false,
    },
    supportBold: {
        color: Colors.textDark,
        fontWeight: '500',
    },
});
