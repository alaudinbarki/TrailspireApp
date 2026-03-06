import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { GridIcon } from '../../src/components/icons/GridIcon';
import { PlusIcon } from '../../src/components/icons/PlusIcon';
import { DocumentStackIcon } from '../../src/components/icons/DocumentStackIcon';
import { Colors } from '../../src/constants/theme';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <GridIcon
              width={26}
              height={26}
              color={focused ? '#007AFF' : '#FFFFFF'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <PlusIcon
              width={26}
              height={26}
              color={focused ? '#007AFF' : '#FFFFFF'}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/create-modal');
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <DocumentStackIcon
              width={23}
              height={26}
              color={focused ? '#007AFF' : '#F2F2F2'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.profileTab,
                focused && styles.profileTabActive,
              ]}
            >
              <Image
                source={require('../../assets/images/feed/profile_photo1.png')}
                style={styles.profileImage}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#282828',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
    position: 'absolute',
    borderTopWidth: 0,
    paddingTop: 12,
    elevation: 0,
    shadowOpacity: 0,
  },
  profileTab: {
    width: 29,
    height: 29,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileTabActive: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
