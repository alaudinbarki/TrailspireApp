import React, { useState } from 'react';
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
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const SELECTED_ACTIVITIES = [
  { id: 1, date: '01', month: 'MAR', type: 'Cycling', distance: '42 km' },
  { id: 2, date: '05', month: 'MAR', type: 'Running', distance: '12 km' },
  { id: 3, date: '16', month: 'MAR', type: 'Cycling', distance: '87 km' },
];

const ACTIVITIES = [
  {
    id: 1,
    date: '16',
    month: 'MAR',
    type: 'Cycling',
    location: 'Malibu Canyon, CA',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 2,
    date: '05',
    month: 'MAR',
    type: 'Running',
    location: 'Santa Monica, CA',
    distance: '12 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 3,
    date: '01',
    month: 'MAR',
    type: 'Cycling',
    location: 'Venice Beach, CA',
    distance: '42 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
];

export default function ActivityFilterSelectionScreen() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <BackArrowIcon width={20} height={20} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Filter</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Section */}
        <View style={styles.selectedSection}>
          <Text style={styles.selectedTitle}>Selected ({selectedIds.length})</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedCards}
          >
            {SELECTED_ACTIVITIES.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.selectedCard}
                activeOpacity={0.7}
                onPress={() => toggleSelection(activity.id)}
              >
                <View style={styles.selectedDateTag}>
                  <Text style={styles.selectedDateDay}>{activity.date}</Text>
                  <Text style={styles.selectedDateMonth}>{activity.month}</Text>
                </View>
                <Text style={styles.selectedType}>{activity.type}</Text>
                <Text style={styles.selectedDistance}>{activity.distance}</Text>
                <View style={styles.removeBtn}>
                  <Text style={styles.removeBtnText}>×</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Activities List */}
        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesTitle}>Activities</Text>
          {ACTIVITIES.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <Image
                source={activity.thumbnail}
                style={styles.activityThumbnail}
                resizeMode="cover"
              />

              <View style={styles.activityDateBadge}>
                <Text style={styles.activityDateDay}>{activity.date}</Text>
                <Text style={styles.activityDateMonth}>{activity.month}</Text>
              </View>

              <View style={styles.activityInfo}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>{activity.type}</Text>
                  <Text style={styles.activityDistance}>{activity.distance}</Text>
                </View>
                <Text style={styles.activityLocation}>{activity.location}</Text>
              </View>

              <TouchableOpacity
                style={styles.openBtn}
                activeOpacity={0.7}
                onPress={() => router.push('/activity-detail')}
              >
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 49,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#282828',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 20,
  },
  selectedSection: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  selectedTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  selectedCards: {
    paddingHorizontal: 16,
    gap: 12,
  },
  selectedCard: {
    width: 130,
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 12,
    position: 'relative',
  },
  selectedDateTag: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  selectedDateDay: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  selectedDateMonth: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedType: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 2,
  },
  selectedDistance: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#A0A0A0',
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  activitiesSection: {
    paddingHorizontal: 16,
  },
  activitiesTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FCFCFC',
    borderRadius: 30,
    marginBottom: 12,
    overflow: 'hidden',
  },
  activityThumbnail: {
    width: '100%',
    height: 160,
  },
  activityDateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  activityDateDay: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activityDateMonth: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityInfo: {
    padding: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityType: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#282828',
  },
  activityDistance: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  activityLocation: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#A0A0A0',
  },
  openBtn: {
    margin: 12,
    marginTop: 0,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openBtnText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
