import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PhotoPreviewFlowScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [showSecond, setShowSecond] = useState(false);

    return (
        <SafeAreaView style={styles.screen} edges={['bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <TouchableOpacity
                style={styles.fullTapArea}
                activeOpacity={1}
                onPress={() => {
                    if (showSecond) {
                        router.back();
                        return;
                    }
                    setShowSecond(true);
                }}
            >
                <Image
                    source={
                        showSecond
                            ? require('../assets/images/feed/photo_preview_2.png')
                            : require('../assets/images/feed/photo_preview_3.png')
                    }
                    style={styles.previewImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: "repeat",
        // marginBottom: 12,
    },
    fullTapArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // paddingBottom: Math.max(20, insets.bottom + 12),
        // marginBottom: Math.max(20, insets.bottom + 12),
    },
});
