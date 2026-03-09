import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ACTIVITIES = [
  {
    id: 1,
    user: 'Andrea R',
    username: '@andyros96',
    avatar: require('../assets/images/feed/user_profile_andrea.png'),
    type: 'Skiing',
    location: 'Interlaken, Switzerland',
    date: '16 MAR',
    distance: '24 km',
    duration: '3h 12m',
    elevation: '1,245 m',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 2,
    user: 'Andrea R',
    username: '@andyros96',
    avatar: require('../assets/images/feed/user_profile_andrea.png'),
    type: 'Skiing',
    location: 'Grindelwald, Switzerland',
    date: '12 MAR',
    distance: '18 km',
    duration: '2h 45m',
    elevation: '982 m',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 3,
    user: 'Andrea R',
    username: '@andyros96',
    avatar: require('../assets/images/feed/user_profile_andrea.png'),
    type: 'Skiing',
    location: 'Zermatt, Switzerland',
    date: '08 MAR',
    distance: '32 km',
    duration: '4h 20m',
    elevation: '1,654 m',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
];

export default function CollectionDetailFeedScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.collectionTitle}>Skitouring Switzerland</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/edit-collection')}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.collectionSubtitle}>235 activities saved</Text>
        </View>

        {/* Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
          {['All', 'Skiing', 'Running', 'Cycling'].map((type) => (
            <TouchableOpacity key={type} activeOpacity={0.7} onPress={() => { }}>
              <Text style={styles.filterText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Feed */}
        <ScrollView
          style={styles.feed}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
        >
          {ACTIVITIES.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              activeOpacity={0.7}
              onPress={() => router.push('/activity-detail')}
            >
              {/* Map Thumbnail */}
              <Image
                source={activity.thumbnail}
                style={styles.mapThumbnail}
                resizeMode="cover"
              />

              {/* User Info */}
              <View style={styles.userInfo}>
                <Image source={activity.avatar} style={styles.userAvatar} />
                <View style={styles.userText}>
                  <Text style={styles.userName}>{activity.user}</Text>
                  <Text style={styles.userUsername}>{activity.username}</Text>
                </View>
              </View>

              {/* Activity Details */}
              <View style={styles.activityDetails}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>{activity.type}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <Text style={styles.activityLocation}>{activity.location}</Text>

                {/* Elevation Graph Placeholder */}
                <View style={styles.elevationGraph}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.elevationBar,
                        { height: Math.random() * 30 + 10 },
                      ]}
                    />
                  ))}
                </View>

                {/* Stats */}
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Distance</Text>
                    <Text style={styles.statValue}>{activity.distance}</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>{activity.duration}</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Elevation</Text>
                    <Text style={styles.statValue}>{activity.elevation}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.closeBtnText}>×</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#F2F2F2',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  collectionTitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    color: '#282828',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editIcon: {
    fontSize: 20,
  },
  collectionSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#A0A0A0',
  },
  filterBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
  },
  filterContent: {
    gap: 8,
  },
  filterText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#007AFF',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 16,
    gap: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapThumbnail: {
    width: '100%',
    height: 180,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userText: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#282828',
  },
  userUsername: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#A0A0A0',
  },
  activityDetails: {
    padding: 12,
    paddingTop: 0,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityType: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#282828',
  },
  activityDate: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
    color: '#007AFF',
  },
  activityLocation: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 12,
  },
  elevationGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    gap: 2,
    marginBottom: 16,
  },
  elevationBar: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 1,
    opacity: 0.6,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 2,
  },
  statValue: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#282828',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  closeBtn: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
