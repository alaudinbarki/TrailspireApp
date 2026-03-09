import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/theme';
import { SearchIcon } from '../src/components/icons/SearchIcon';

const BASE_WIDTH = 393;

const ACTIVITY_TYPES = [
  { id: 'add', label: '+', color: '#282828', bg: '#282828', textColor: '#FFFFFF' },
  { id: 'skiing', label: '⛷️', color: '#282828', bg: 'transparent', textColor: '#282828' },
  { id: 'cycling', label: '🚴', color: '#FF3B30', bg: '#FF3B30', textColor: '#FFFFFF' },
  { id: 'hiking', label: '🥾', color: '#282828', bg: 'transparent', textColor: '#282828' },
  { id: 'climbing', label: '🧗', color: '#FF3B30', bg: '#FF3B30', textColor: '#FFFFFF' },
  { id: 'kayaking', label: '🏔️', color: '#282828', bg: 'transparent', textColor: '#282828' },
  { id: 'running', label: '🏃', color: '#282828', bg: 'transparent', textColor: '#282828' },
];

const RECENT_SEARCHES = [
  { id: '1', type: 'Gravel', location: 'Zurich, Switzerland' },
  { id: '2', type: 'Ultatrail', location: 'Italy' },
  { id: '3', type: 'Kayaking', location: 'Oslo, Norway' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.screen}>
      {/* Map Header */}
      <View style={styles.mapHeader}>
        <View style={styles.mapBanner}>
          <Image
            source={require('../assets/images/feed/search_map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>

        {/* Search Bar Row */}
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.7} onPress={() => router.push('/activity-filter-selection')}>
            <View style={styles.filterIconContainer}>
              <View style={[styles.filterLine, { width: 14, top: 6 }]} />
              <View style={[styles.filterLine, { width: 10, top: 12 }]} />
              <View style={[styles.filterLine, { width: 6, top: 18 }]} />
              <View style={[styles.filterDot, { left: 10, top: 4 }]} />
              <View style={[styles.filterDot, { left: 3, top: 10 }]} />
              <View style={[styles.filterDot, { left: 7, top: 16 }]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchPill} activeOpacity={0.7}>
            <Text style={styles.searchPillText}>Mallorca, Spain</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={() => router.push('/explore-results')}
          >
            <View style={styles.circleThumb} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Content */}
      <KeyboardAvoidingView
        style={styles.contentArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          keyboardShouldPersistTaps="handled"
        >
          {/* Activity Type Filters — includes Search title */}
          <View style={styles.filterSection}>
            {/* Search Title + Close */}
            <View style={styles.searchTitleRow}>
              <Text style={styles.searchTitle}>Search</Text>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.activityRow}
            >
              {ACTIVITY_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.activityChip,
                    type.bg !== 'transparent' && { backgroundColor: type.bg },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => router.push('/activity-filter-selection')}
                >
                  <Text style={[styles.activityChipText, { color: type.textColor }]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.selectedText}>
              Selected: Gravel Cycling / Hiking
            </Text>
          </View>

          {/* Recent Searches */}
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent</Text>
            {RECENT_SEARCHES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentItem}
                activeOpacity={0.7}
                onPress={() => router.push('/explore-results')}
              >
                <SearchIcon width={25} height={25} color="#282828" />
                <Text style={styles.recentText}>
                  <Text style={styles.recentType}>{item.type} - </Text>
                  <Text style={styles.recentLocation}>{item.location}</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Search Input at bottom */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search location or activity..."
            placeholderTextColor="#838385"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={() => router.push('/explore-results')}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  mapHeader: {
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 16,
    zIndex: 10,
  },
  mapBanner: {
    width: BASE_WIDTH - 11,
    height: 110,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 5,
    opacity: 0.8,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 10,
  },
  filterButton: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconContainer: {
    width: 20,
    height: 24,
    position: 'relative',
  },
  filterLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#282828',
    borderRadius: 1,
    left: 0,
  },
  filterDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#282828',
  },
  searchPill: {
    flex: 1,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPillText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: '#1F1F1F',
  },
  navButton: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleThumb: {
    width: 43,
    height: 43,
    borderRadius: 21.5,
    backgroundColor: '#A0A0A0',
  },
  contentArea: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  searchTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  searchTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 20,
    color: '#282828',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#282828',
    fontWeight: '500',
  },
  filterSection: {
    backgroundColor: '#D8D8D8',
    borderRadius: 40,
    paddingTop: 17,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginHorizontal: -20,
    marginBottom: 16,
  },
  activityRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  activityChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activityChipText: {
    fontSize: 20,
  },
  selectedText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 11,
    color: '#676767',
    marginTop: 4,
  },
  recentSection: {
    marginTop: 8,
  },
  recentTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#282828',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  recentText: {
    fontFamily: 'Inter',
    fontSize: 16,
    flex: 1,
  },
  recentType: {
    fontWeight: '400',
    color: '#282828',
  },
  recentLocation: {
    fontWeight: '400',
    color: '#676767',
  },
  searchInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
    backgroundColor: '#A0A0A0',
  },
  searchInput: {
    height: 48,
    backgroundColor: '#E8E8E6',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#282828',
  },
});
