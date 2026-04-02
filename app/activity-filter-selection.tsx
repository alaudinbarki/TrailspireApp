import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon, ConfirmCheckIcon, SearchIcon, TerrainProfileIcon } from '../src/components/icons';
import { scaleUniform } from '../src/utils/globalScale';

const ACTIVITIES = [
  {
    id: 1,
    date: '16',
    month: 'MAR',
    type: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 2,
    date: '11',
    month: 'MAR',
    type: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 3,
    date: '05',
    month: 'MAR',
    type: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 4,
    date: '01',
    month: 'MAR',
    type: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
  {
    id: 5,
    date: '26',
    month: 'FEB',
    type: 'Gravel cycling',
    location: 'Oslo, Norway',
    distance: '87 km',
    thumbnail: require('../assets/images/feed/activity_map_thumb.png'),
  },
];

export default function ActivityFilterSelectionScreen() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);
  const selectedActivities = ACTIVITIES.filter((item) => selectedIds.includes(item.id));

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <BackArrowIcon width={scaleUniform(20)} height={scaleUniform(20)} color="#282828" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <SearchIcon width={scaleUniform(18)} height={scaleUniform(18)} color="#7D7D7D" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.7} onPress={() => router.back()}>
          <ConfirmCheckIcon width={scaleUniform(18)} height={scaleUniform(12)} color="#D9D9D9" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.selectedSection}>
          <Text style={styles.selectedTitle}>Selected ({selectedIds.length})</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedCards}
          >
            {selectedActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.selectedCard}
                activeOpacity={0.7}
                onPress={() => toggleSelection(activity.id)}
              >
                <Image source={activity.thumbnail} style={styles.selectedCardImage} resizeMode="cover" />
                <View style={styles.selectedStroke}>
                  <View style={{ transform: [{ rotate: '170deg' }] }}>
                    <TerrainProfileIcon width={100} height={28} color="#007AFF" />
                  </View>
                </View>
                <View style={styles.selectedDateOverlay}>
                  <Text style={styles.selectedOverlayText}>{`${activity.date} ${activity.month}`}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesTitle}>Activities</Text>
          {ACTIVITIES.map((activity) => (
            <View
              key={activity.id}
              style={[
                styles.activityCard,
                selectedIds.includes(activity.id) ? styles.activityCardActive : styles.activityCardInactive,
              ]}
            >
              <View style={styles.activityThumbWrap}>
                <Image
                  source={activity.thumbnail}
                  style={styles.activityThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.activityStroke} pointerEvents="none">
                  <View style={{ transform: [{ rotate: '170deg' }] }}>
                    <TerrainProfileIcon width={120} height={40} color="#007AFF" />
                  </View>
                </View>
                {/* <View style={styles.activityDatePill}>
                  <Text style={styles.activityDatePillText}>{`${activity.date} ${activity.month}`}</Text>
                </View> */}

                <TouchableOpacity
                  style={styles.openBtn}
                  activeOpacity={0.7}
                  onPress={() => router.push('/gpx-route-view')}
                >
                  <Text style={styles.openBtnText}>Open</Text>
                </TouchableOpacity>
                {/* <View style={styles.activityIconWrap} /> */}
              </View>

              <View style={styles.activityInfo}>
                <Text style={styles.activityDateText}>{`${activity.date}\n${activity.month}`}</Text>
                <Text style={styles.activityType}>{activity.type}</Text>
                <Text style={styles.activityLocation}>{activity.location}</Text>
                <Text style={styles.activityDistance}>{activity.distance}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.checkBtn,
                  selectedIds.includes(activity.id) ? styles.checkBtnActive : styles.checkBtnInactive,
                ]}
                activeOpacity={0.7}
                onPress={() => toggleSelection(activity.id)}
              >
                <ConfirmCheckIcon
                  width={scaleUniform(15)}
                  height={scaleUniform(15)}
                  color={selectedIds.includes(activity.id) ? '#FFFFFF' : '#D9D9D9'}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 6,
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
  searchBar: {
    flex: 1,
    height: 49,
    marginLeft: 8,
    marginRight: 6,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#282828',
    flex: 1,
  },
  confirmBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 24,
  },
  selectedSection: {
    paddingTop: 4,
    marginBottom: 4,
  },
  selectedTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    paddingHorizontal: 30,
    marginBottom: 10,
    marginTop: 12,
  },
  selectedCards: {
    paddingHorizontal: 30,
    gap: 6,
  },
  selectedCard: {
    width: 97,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    overflow: 'hidden',
    position: 'relative',
  },
  selectedCardImage: {
    width: '100%',
    height: '100%',
  },
  selectedStroke: {
    position: 'relative',
    left: 12,
    top: 3,
    right: 0,
    bottom: 20,
    padding: 5,
    zIndex: 1,
  },
  selectedDateOverlay: {
    position: 'absolute',
    left: 10,
    top: 6,
    width: 73,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  selectedOverlayText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    color: '#282828',
  },
  activitiesSection: {
    paddingHorizontal: 10,
  },
  activitiesTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 10,
  },
  activityCard: {
    height: 106,
    borderRadius: 30,
    marginBottom: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityCardActive: {
    backgroundColor: '#FCFCFC',
  },
  activityCardInactive: {
    backgroundColor: '#CFD0D1',
  },
  activityThumbWrap: {
    width: 164,
    height: 91,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  activityThumbnail: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },

  activityInfo: {
    marginLeft: 10,
    flex: 1,
  },
  activityDateText: {
    marginTop: 8,
    fontFamily: 'Inter',
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '600',
    color: '#007AFF',
    // marginBottom: 6,
  },
  activityType: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500',
    color: '#282828',
  },
  activityLocation: {
    fontFamily: 'Inter',
    fontSize: 10,
    // lineHeight: 17,
    color: '#007AFF',
  },
  activityDistance: {
    fontFamily: 'Inter',
    marginTop: 1,
    fontSize: 10,
    // lineHeight: 17,
    color: '#007AFF',
  },
  openBtn: {
    position: 'absolute',
    left: 25,
    top: 26,
    width: 85,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(40,40,40,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  activityStroke: {
    position: 'absolute',
    left: 12,
    top: 19,
    // zIndex: 1,
  },
  activityDatePill: {
    position: 'absolute',
    left: 36,
    top: 16,
    width: 85,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  activityDatePillText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    color: '#282828',
  },
  openBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  checkBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkBtnActive: {
    backgroundColor: '#007AFF',
  },
  checkBtnInactive: {
    backgroundColor: '#A0A0A0',
  },
});
