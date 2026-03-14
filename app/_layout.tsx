import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { enableGlobalStyleScaling } from '../src/utils/globalScale';

enableGlobalStyleScaling();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
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
    </>
  );
}
