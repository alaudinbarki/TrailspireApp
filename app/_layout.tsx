import React, { useEffect } from 'react';
import { Stack, usePathname } from 'expo-router';
import { StatusBar, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { enableGlobalStyleScaling } from '../src/utils/globalScale';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

enableGlobalStyleScaling();

export default function RootLayout() {
  const pathname = usePathname();
  const darkStatusRoutes = ['/image-viewer', '/photo-fullscreen-1', '/photo-fullscreen-2'];
  const isDark = darkStatusRoutes.includes(pathname);
  const statusBarStyle = isDark ? 'light' : 'dark';
  const statusBarBackground = isDark ? '#000000' : '#F2F2F2';
  const navBarBackground = isDark ? '#000000' : '#F2F2F2';
  const navBarButtonStyle = isDark ? 'light' : 'dark';

  // Re-apply imperatively on every render (fixes Expo Go hot-reload issue)
  useEffect(() => {
    setStatusBarBackgroundColor(statusBarBackground, false);
    setStatusBarStyle(statusBarStyle);
  }, [statusBarBackground, statusBarStyle]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    NavigationBar.setPositionAsync('relative');
    NavigationBar.setBackgroundColorAsync(navBarBackground);
    NavigationBar.setButtonStyleAsync(navBarButtonStyle);
  }, [navBarBackground, navBarButtonStyle]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style={statusBarStyle} backgroundColor={statusBarBackground} translucent={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F2F2F2' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="navigation-hub" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="verify-email" />
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen
          name="activity-detail"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="search"
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen name="explore-results" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen
          name="photo-gallery"
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen
          name="image-viewer"
          options={{ animation: 'fade', presentation: 'modal' }}
        />
        <Stack.Screen
          name="create-modal"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="photo-crop-portrait"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="photo-crop-landscape"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="messages-list"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="chat-thread"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="create-activity"
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen
          name="friends-grid"
          options={{ animation: 'slide_from_right', presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="activity-filter-selection"
          options={{ animation: 'slide_from_bottom', presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="saved-collections"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="collection-detail-feed"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="user-profile-atlas"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="activity-stats"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="save-to-collection"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="new-collection-modal"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="other-user-profile"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="feed-filters"
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="new-collection-variant"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="photo-fullscreen-1"
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="photo-fullscreen-2"
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="edit-collection"
          options={{ animation: 'slide_from_right' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
