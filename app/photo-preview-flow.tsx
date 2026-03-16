import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function PhotoPreviewFlowScreen() {
    const router = useRouter();
    const [showSecond, setShowSecond] = useState(false);

    return (
        <View style={styles.screen}>
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

        </View>
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
    },
    fullTapArea: {
        flex: 1,
    },
});
