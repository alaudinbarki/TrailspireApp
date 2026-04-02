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
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/theme';
import { SearchIcon } from '../src/components/icons/SearchIcon';
import { ProfileCategoryIcon, type ProfileCategoryIconName } from '../src/components/icons/ProfileCategoryIcon';
import { FilterIcon } from '../src/components/icons/FilterIcon';
import { TerrainProfileIcon } from '../src/components/icons/TerrainProfileIcon';
import { ElevationProfileIcon } from '../src/components/icons/ElevationProfileIcon';
import { GridIcon } from '../src/components/icons/GridIcon';
import { PlusIcon } from '../src/components/icons/PlusIcon';
import { DocumentStackIcon } from '../src/components/icons/DocumentStackIcon';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';


const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const COL_GAP = 6;
const SIDE_PAD = 2;
const COL_W = (BASE_WIDTH - SIDE_PAD * 2 - COL_GAP) / 2;


const RECENT_SEARCHES = [
  { id: '1', type: 'Gravel', location: 'Zurich, Switzerland' },
  { id: '2', type: 'Ultatrail', location: 'Italy' },
  { id: '3', type: 'Kayaking', location: 'Oslo, Norway' },


];

const NAV_ITEMS = [
  { key: 'plus', type: 'plus' as const },
  { key: 'profile-1', type: 'icon' as const, iconName: 'profile-1' as ProfileCategoryIconName },
  { key: 'profile-2', type: 'icon' as const, iconName: 'profile-2' as ProfileCategoryIconName },
  { key: 'profile-3', type: 'icon' as const, iconName: 'profile-3' as ProfileCategoryIconName },
  { key: 'profile-4', type: 'icon' as const, iconName: 'profile-4' as ProfileCategoryIconName },
  { key: 'profile-5', type: 'icon' as const, iconName: 'profile-5' as ProfileCategoryIconName },
  { key: 'profile-6', type: 'icon' as const, iconName: 'profile-6' as ProfileCategoryIconName },
] as const;

const RESULT_IMAGES = {
  card1_fullWidth: require('../assets/images/feed/home_card_1.png'),
  card2_left: require('../assets/images/feed/home_card_2.png'),
  card3_left: require('../assets/images/feed/home_card_3.png'),
  card4_right: require('../assets/images/feed/home_card_4.png'),
  card5_left: require('../assets/images/feed/home_card_5.png'),
  card6_fullWidth: require('../assets/images/feed/home_card_6.png'),
  card7_right: require('../assets/images/feed/home_card_7.png'),
  card8_fullWidth: require('../assets/images/feed/home_card_8.png'),
  card9_right: require('../assets/images/feed/figma_card_13.png'),
  flag1: require('../assets/images/feed/home_flag_1.png'),
  flag2: require('../assets/images/feed/home_flag_2.png'),
  flag3: require('../assets/images/feed/home_flag_3.png'),
};

const RESULT_PROFILE_IMAGES = {
  tomtom8: require('../assets/images/feed/home_profile_tomtom8.png'),
  tony: require('../assets/images/feed/home_profile_tony.png'),
  iamsimon: require('../assets/images/feed/home_profile_iamsimon.png'),
  nik66: require('../assets/images/feed/home_profile_nik66.png'),
  julian: require('../assets/images/feed/home_profile_julian.png'),
  rebsix: require('../assets/images/feed/home_profile_rebsix.png'),
  cusmin: require('../assets/images/feed/home_profile_cusmin.png'),
  ashley: require('../assets/images/feed/home_profile_ashley.png'),
};

interface CardItem {
  id: string;
  image: any;
  height: number;
  username: string;
  profileImage: any;
  activityType: string;
  elevation: string;
  distance: string;
  time: string;
  progress?: number;
  layout: 'full' | 'left' | 'right';
  flagImage?: any;
  elevationVariant?: 1 | 2 | 3 | 4 | 5;
  badgeType?: 'wide' | 'narrow';
}

const RESULT_CARD_DATA: CardItem[] = [
  { id: 'fw1', image: RESULT_IMAGES.card1_fullWidth, height: 258, username: '@tomtom8', profileImage: RESULT_PROFILE_IMAGES.tomtom8, activityType: 'Backcountry Skiing', elevation: '2550mt', distance: '33km', time: '5d 3h', progress: 0.63, layout: 'full', flagImage: RESULT_IMAGES.flag1, elevationVariant: 1, badgeType: 'wide' },
  { id: 'l2', image: RESULT_IMAGES.card2_left, height: 239, username: '@tony', profileImage: RESULT_PROFILE_IMAGES.tony, activityType: 'Hiking', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'left', flagImage: RESULT_IMAGES.flag2, elevationVariant: 2, badgeType: 'wide' },
  { id: 'r2', image: RESULT_IMAGES.card9_right, height: 286, username: '@iamsimon', profileImage: RESULT_PROFILE_IMAGES.iamsimon, activityType: 'Free Skiing', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', flagImage: RESULT_IMAGES.flag3, elevationVariant: 3, badgeType: 'narrow' },
  { id: 'l3', image: RESULT_IMAGES.card3_left, height: 239, username: '@nik_66', profileImage: RESULT_PROFILE_IMAGES.nik66, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'narrow' },
  { id: 'r3', image: RESULT_IMAGES.card7_right, height: 286, username: '@julian_', profileImage: RESULT_PROFILE_IMAGES.julian, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  { id: 'l4', image: RESULT_IMAGES.card4_right, height: 286, username: '@rebsix', profileImage: RESULT_PROFILE_IMAGES.rebsix, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'wide' },
  { id: 'r4', image: RESULT_IMAGES.card5_left, height: 189, username: '@cusmin', profileImage: RESULT_PROFILE_IMAGES.cusmin, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  { id: 'fw2', image: RESULT_IMAGES.card6_fullWidth, height: 219, username: '@_ashley', profileImage: RESULT_PROFILE_IMAGES.ashley, activityType: 'Backcountry Skiing', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'full', elevationVariant: 2, badgeType: 'wide' },
  { id: 'fw3', image: RESULT_IMAGES.card8_fullWidth, height: 485, username: '@tony', profileImage: RESULT_PROFILE_IMAGES.tony, activityType: '4x4 Overlanding', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'full', elevationVariant: 5, badgeType: 'wide' },
];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [activeNav, setActiveNav] = useState<(typeof NAV_ITEMS)[number]['key']>('profile-1');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / BASE_HEIGHT;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const scaledColW = sx(COL_W);
  const scaledFullW = sx(BASE_WIDTH - SIDE_PAD * 2);
  const scaledStatBarW = sx(87);
  const visibleNavItems = showResults
    ? NAV_ITEMS.filter((item) => item.type === 'icon').slice(0, 2)
    : NAV_ITEMS;

  const leftCards = RESULT_CARD_DATA.filter((c) => c.layout === 'left');
  const rightCards = RESULT_CARD_DATA.filter((c) => c.layout === 'right');
  const fullCards = RESULT_CARD_DATA.filter((c) => c.layout === 'full');

  const renderCard = (item: CardItem) => (
    <View key={item.id} style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.cardUserRow}
        activeOpacity={0.7}
        onPress={() => router.push('/other-user-profile')}
      >
        <Image source={item.profileImage} style={styles.cardUserAvatar} />
        <Text style={styles.cardUsername}>{item.username}</Text>
        {item.flagImage ? <Image source={item.flagImage} style={styles.flagIcon} /> : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/activity-detail')}
      >
        <Image
          source={item.image}
          style={[
            styles.cardImage,
            {
              height: sy(item.height),
              width: item.layout === 'full' ? scaledFullW : scaledColW,
            },
          ]}
          resizeMode="cover"
        />

        <View
          style={[
            styles.terrainBadge,
            item.badgeType === 'wide' ? styles.terrainBadgeWide : styles.terrainBadgeNarrow,
          ]}
        >
          {item.badgeType === 'wide' ? <View style={styles.terrainBadgeLayer2} /> : null}
          <View style={styles.terrainBadgeLayer3} />
          {item.badgeType === 'wide' ? (
            <View style={styles.terrainBadgeProfileWrap}>
              <View style={{ transform: [{ rotate: '170deg' }] }}>
                <TerrainProfileIcon width={sx(30)} height={sy(10)} color="#007AFF" />
              </View>
            </View>
          ) : null}
          <View style={styles.terrainBadgeIconWrap}>
            <View style={{ transform: [{ rotate: '82deg' }] }}>
              <TerrainProfileIcon width={sx(18)} height={sy(10)} color="#007AFF" />
            </View>
          </View>
          {item.badgeType === 'wide' ? <Text style={styles.terrainBadgeCount}>+2</Text> : null}
        </View>
      </TouchableOpacity>

      <View style={styles.statsSectionCard}>
        <Text style={styles.statsActivityType}>{item.activityType}</Text>
        <View style={styles.statsRowCard}>
          <Text style={styles.statsLabelFixed}>Elevation</Text>
          <ElevationProfileIcon
            width={sx(87)}
            height={sy(10)}
            color="#282828"
            variant={item.elevationVariant ?? 1}
          />
          <Text style={styles.statsValueRight}>{item.elevation}</Text>
        </View>
        <View style={styles.statsRowCard}>
          <Text style={styles.statsLabelFixed}>Distance </Text>
          <View style={styles.statsProgressBar}>
            <View
              style={[
                styles.statsProgressFill,
                { width: scaledStatBarW * (item.progress ?? 1) },
              ]}
            />
          </View>
          <Text style={styles.statsValueRight}>{item.distance}</Text>
        </View>
        <View style={styles.statsRowCard}>
          <Text style={styles.statsLabelFixed}>Time</Text>
          <View style={styles.statsTimeSpacer} />
          <Text style={styles.statsValueRight}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

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
          <TouchableOpacity
            style={styles.searchSideBtn}
            activeOpacity={0.7}
            onPress={() => {
              setIsFilterOpen((previous) => !previous);
              setShowResults(false);
            }}
          >
            <FilterIcon width={31} height={19} color={isFilterOpen || !showResults ? '#007AFF' : '#616264'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchPill} activeOpacity={0.7}>
            <Text style={styles.searchPillText}>Mallorca, Spain</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchSideBtnTarget}
            activeOpacity={0.7}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <View style={styles.targetDotActive}>
              <View style={styles.targetDotActiveOuter} />
              <View style={styles.targetDotActiveMid} />
              <View style={styles.targetDotActiveInner} />
              <View style={styles.targetDotActiveCore} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={() => router.push('/explore-results')}
          >
            <View style={styles.circleThumb} />
          </TouchableOpacity> */}
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
          <View style={styles.filterSection}>
            {/* Search Title + Close */}
            {showResults ? <View style={{
              flexDirection: 'row',
              alignContent: "space-between",
              justifyContent: "space-between",
              marginBottom: 18,
            }}>
              <View>
                <Text style={styles.searchTitle}>Olso, Norway
                </Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: 12,
                  color: "rgba(0, 122, 255, 1)",
                  marginTop: 4,
                }}>
                  235 activities found in this location</Text>
              </View>
              <View style={styles.headerActionsRow}>
                {showResults ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.headerEditButton}
                  >
                    <Svg width={24} height={24} viewBox="0 0 40 40" fill="none">
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.2075 9.25993L26.2132 10.2543L29.7487 13.7898L30.7431 12.7955C31.1702 12.3683 31.1702 11.6758 30.7431 11.2487L28.7543 9.25993C28.3272 8.83279 27.6347 8.83279 27.2075 9.25993ZM9.69566 26.7718L25.3293 11.1382L28.8648 14.6737L13.2312 30.3073C13.0517 30.4868 12.8153 30.5983 12.5627 30.6226L9.04121 30.9618L9.38035 27.4403C9.40469 27.1876 9.51616 26.9513 9.69566 26.7718ZM8.81178 25.8879C8.42713 26.2726 8.18825 26.779 8.13611 27.3205L7.74246 31.408C7.69536 31.897 8.10597 32.3076 8.595 32.2605L12.6825 31.8669C13.224 31.8147 13.7304 31.5759 14.1151 31.1912L31.6269 13.6793C32.5422 12.7641 32.5422 11.2801 31.6269 10.3648L29.6382 8.37604C28.7229 7.46075 27.2389 7.46075 26.3236 8.37604L8.81178 25.8879ZM12.513 28.3739L25.3845 15.5024C25.6286 15.2583 25.6286 14.8626 25.3845 14.6185C25.1405 14.3744 24.7447 14.3744 24.5007 14.6185L11.6291 27.49C11.385 27.7341 11.385 28.1298 11.6291 28.3739C11.8732 28.618 12.2689 28.618 12.513 28.3739Z"
                        fill="#007AFF"
                      />
                    </Svg>
                  </TouchableOpacity>) : null}
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            </View> :


              <View style={styles.searchTitleRow}>
                <Text style={styles.searchTitle}>Search</Text>
                <View style={styles.headerActionsRow}>
                  {/* <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.headerEditButton}
                  >
                    <Svg width={24} height={24} viewBox="0 0 40 40" fill="none">
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.2075 9.25993L26.2132 10.2543L29.7487 13.7898L30.7431 12.7955C31.1702 12.3683 31.1702 11.6758 30.7431 11.2487L28.7543 9.25993C28.3272 8.83279 27.6347 8.83279 27.2075 9.25993ZM9.69566 26.7718L25.3293 11.1382L28.8648 14.6737L13.2312 30.3073C13.0517 30.4868 12.8153 30.5983 12.5627 30.6226L9.04121 30.9618L9.38035 27.4403C9.40469 27.1876 9.51616 26.9513 9.69566 26.7718ZM8.81178 25.8879C8.42713 26.2726 8.18825 26.779 8.13611 27.3205L7.74246 31.408C7.69536 31.897 8.10597 32.3076 8.595 32.2605L12.6825 31.8669C13.224 31.8147 13.7304 31.5759 14.1151 31.1912L31.6269 13.6793C32.5422 12.7641 32.5422 11.2801 31.6269 10.3648L29.6382 8.37604C28.7229 7.46075 27.2389 7.46075 26.3236 8.37604L8.81178 25.8879ZM12.513 28.3739L25.3845 15.5024C25.6286 15.2583 25.6286 14.8626 25.3845 14.6185C25.1405 14.3744 24.7447 14.3744 24.5007 14.6185L11.6291 27.49C11.385 27.7341 11.385 28.1298 11.6291 28.3739C11.8732 28.618 12.2689 28.618 12.513 28.3739Z"
                        fill="#007AFF"
                      />
                    </Svg>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }


            <View style={styles.navRow}>
              {visibleNavItems.map((item) => {
                const isActive = item.key === activeNav;
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.navButton,
                      item.type === 'plus' && styles.navButtonPlus,
                      // isActive && styles.navButtonActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (item.type !== 'plus') {
                        setActiveNav(item.key);
                      }
                    }}
                  >
                    {item.type === 'plus' ? (
                      <Text style={styles.plusText}>+</Text>
                    ) : (
                      <ProfileCategoryIcon name={item.iconName} width={18} height={18} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.selectedText}>
              Selected: Gravel Cycling / Hiking
            </Text>
          </View>

          {!showResults ? (
            <View style={styles.recentFeedWrap}>
              <View style={styles.recentSection}>
                <View style={{ height: 20 }}></View>
                <Text style={styles.recentTitle}>Recent</Text>
                {RECENT_SEARCHES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recentItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSearchText(`${item.type} - ${item.location}`);
                      setShowResults(true);
                    }}
                  >
                    <SearchIcon width={25} height={25} color="#282828" />
                    <Text style={styles.recentText}>
                      <Text style={styles.recentType}>{item.type} - </Text>
                      <Text style={styles.recentLocation}>{item.location}</Text>
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          ) : (

            <View style={styles.resultsFeedWrap}>
              <Text style={styles.resultsTitle}>Results</Text>
              {fullCards[0] ? renderCard(fullCards[0]) : null}
              <View style={styles.masonryContainer}>
                <View style={styles.masonryCol}>
                  {leftCards.map(renderCard)}
                </View>
                <View style={styles.masonryCol}>
                  {rightCards.map(renderCard)}
                </View>
              </View>
              {fullCards[1] ? renderCard(fullCards[1]) : null}
              {fullCards[2] ? renderCard(fullCards[2]) : null}
              <View style={[styles.bottomSpacer, styles.bottomSpacerWithBar]} />

            </View>

          )}
        </ScrollView>



        {/* Search Input at bottom */}
        {!showResults ? (
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search location or activity..."
              placeholderTextColor="#838385"
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              onSubmitEditing={() => setShowResults(true)}
            />
          </View>) : null}
      </KeyboardAvoidingView>

      {showResults ? (
        <>
          <TouchableOpacity
            style={[styles.actionBtn, { bottom: 82 + insets.bottom }]}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <Path
                d="M2 2L16 16M16 2L2 16"
                stroke="#1F1F1F"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          <View
            style={[
              styles.resultsBottomBar,
              {
                height: 80 + insets.bottom,
                paddingBottom: Math.max(12, insets.bottom),
              },
            ]}
          >
            <View style={styles.resultsBottomBarRow}>
              <TouchableOpacity style={styles.resultsTabBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)/explore')}>
                <GridIcon width={26} height={26} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.resultsTabBtn} activeOpacity={0.8} onPress={() => router.push('/create-modal')}>
                <PlusIcon width={26} height={26} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.resultsTabBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)/activity')}>
                <DocumentStackIcon width={23} height={26} color="#F2F2F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.resultsTabBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)/profile')}>
                <View style={styles.resultsProfileTab}>
                  <Image
                    source={require('../assets/images/feed/profile_photo1.png')}
                    style={styles.resultsProfileImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
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
  searchSideBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSideBtnTarget: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  targetDotActive: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetDotActiveOuter: {
    position: 'absolute',
    width: 43,
    height: 43,
    borderRadius: 21.5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  targetDotActiveMid: {
    position: 'absolute',
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  targetDotActiveInner: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  targetDotActiveCore: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(63, 63, 63, 0.8)',
  },
  // navButton: {
  //   width: 49,
  //   height: 49,
  //   borderRadius: 15,
  //   backgroundColor: '#CFD0D1',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerEditButton: {
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
    paddingBottom: 80,
    paddingHorizontal: 20,
    marginHorizontal: -20,
    marginBottom: 16,
    zIndex: 2,
  },
  activityRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },

  actionBtn: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    elevation: 8,
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
    marginLeft: 10
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

  ///NAV STYLES
  navRow: {
    marginTop: 0,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconImage: {
    width: 18,
    height: 18,
  },
  navButtonWide: {
    width: 40,
  },
  navButtonActive: {
    backgroundColor: '#282828',
    borderRadius: 22,
  },
  navButtonPlus: {
    backgroundColor: '#282828',
    borderRadius: 22,
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
    includeFontPadding: false,
  },
  navText: {
    color: '#1F1F1F',
    fontSize: 17,
    lineHeight: 18,
  },
  navTextActive: {
    color: '#F2F2F2',
  },

  resultsHeaderCard: {
    backgroundColor: '#D8D8D8',
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  resultsTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(31, 31, 31, 1)',
    marginTop: 12,
    marginLeft: 4,
    marginBottom: 8,
    paddingHorizontal: 20,

  },
  recentFeedWrap: {
    // paddingHorizontal: SIDE_PAD,
    top: -70,
    zIndex: 3,
    paddingTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: -20,
    backgroundColor: 'rgba(160, 160, 160, 1)',
    // marginRight: 10
    paddingHorizontal: 20,
  },
  resultsFeedWrap: {
    // paddingHorizontal: SIDE_PAD,
    top: -70,
    zIndex: 3,
    paddingTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: -20,
    backgroundColor: 'rgba(160, 160, 160, 1)',
    // marginRight: 10
    // paddingHorizontal: 20,
  },

  cardWrapper: {
    marginBottom: 4,
  },
  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 4,
    paddingVertical: 4,
    gap: 4,
  },
  cardUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  cardUsername: {
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
  },
  flagIcon: {
    width: 17,
    height: 12,
    marginLeft: 2,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    borderRadius: 20,
  },
  statsSectionCard: {
    paddingLeft: 11,
    paddingTop: 5,
    paddingBottom: 2,
  },
  statsActivityType: {
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 3,
    width: 141,
  },
  statsRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    height: 12,
  },
  statsLabelFixed: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    width: 44,
  },
  statsValueRight: {
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'right',
    flex: 1,
  },
  statsProgressBar: {
    width: 87,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
  },
  statsProgressFill: {
    height: 6,
    backgroundColor: '#282828',
    borderRadius: 20,
  },
  statsTimeSpacer: {
    width: 87,
  },
  terrainBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  terrainBadgeWide: {
    width: 58,
  },
  terrainBadgeNarrow: {
    width: 30,
  },
  terrainBadgeLayer2: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 44,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 2,
  },
  terrainBadgeLayer3: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 3,
  },
  terrainBadgeProfileWrap: {
    position: 'absolute',
    left: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
  },
  terrainBadgeIconWrap: {
    position: 'absolute',
    left: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
  },
  terrainBadgeCount: {
    position: 'absolute',
    right: 3,
    fontSize: 8,
    fontWeight: '600',
    color: '#C9C9C9',
    textAlign: 'center',
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: COL_GAP,
  },
  masonryCol: {
    width: COL_W,
  },
  bottomSpacer: {
    height: 100,
  },
  bottomSpacerWithBar: {
    height: 180,
  },
  resultsBottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#282828',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    paddingTop: 12,
    zIndex: 30,
  },
  resultsBottomBarRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  resultsTabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  resultsProfileTab: {
    width: 29,
    height: 29,
    borderRadius: 10,
    overflow: 'hidden',
  },
  resultsProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
