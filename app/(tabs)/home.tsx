import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { TerrainProfileIcon } from '../../src/components/icons/TerrainProfileIcon';
import { ElevationProfileIcon } from '../../src/components/icons/ElevationProfileIcon';
import { FilterIcon } from '../../src/components/icons/FilterIcon';
import { SharedFeedFilterPanel } from '@/components/SharedFeedFilterPanel';

const BASE_WIDTH = 393;
const COL_GAP = 8;
const SIDE_PAD = 0;
const COL_W = (BASE_WIDTH - SIDE_PAD * 2 - COL_GAP) / 2;

/* ── Image assets (Figma node 1:3129 "02") ── */
const HOME_IMAGES = {
  mapBanner: require('../../assets/images/feed/figma_map_banner.png'),
  card1_fullWidth: require('../../assets/images/feed/home_card_1.png'),   // imgRectangle133 – backcountry skiing ice cave
  card2_left: require('../../assets/images/feed/home_card_2.png'),        // imgRectangle236 – hikers in snow
  card3_left: require('../../assets/images/feed/home_card_3.png'),        // imgRectangle181 – mountain hiking
  card4_right: require('../../assets/images/feed/home_card_4.png'),       // imgRectangle138 – snowy peaks
  card5_left: require('../../assets/images/feed/home_card_5.png'),        // imgRectangle180 – kayak/camp
  card6_fullWidth: require('../../assets/images/feed/home_card_6.png'),   // imgRectangle264 – volcanic landscape
  card7_right: require('../../assets/images/feed/home_card_7.png'),       // imgRectangle231 – hiker with gear
  card8_fullWidth: require('../../assets/images/feed/home_card_8.png'),   // imgRectangle154 – 4x4 overlanding
  card9_right: require('../../assets/images/feed/figma_card_13.png'),      // imgRectangle222 – free skiing snowy slope
  flag1: require('../../assets/images/feed/home_flag_1.png'),
  flag2: require('../../assets/images/feed/home_flag_2.png'),
  flag3: require('../../assets/images/feed/home_flag_3.png'),
};

const PROFILE_IMAGES = {
  tomtom8: require('../../assets/images/feed/home_profile_tomtom8.png'),
  tony: require('../../assets/images/feed/home_profile_tony.png'),
  iamsimon: require('../../assets/images/feed/home_profile_iamsimon.png'),
  nik66: require('../../assets/images/feed/home_profile_nik66.png'),
  julian: require('../../assets/images/feed/home_profile_julian.png'),
  rebsix: require('../../assets/images/feed/home_profile_rebsix.png'),
  cusmin: require('../../assets/images/feed/home_profile_cusmin.png'),
  ashley: require('../../assets/images/feed/home_profile_ashley.png'),
};

/* ── Card data matching Figma exactly ── */
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
  progress?: number;           // 0-1 fill ratio for distance bar
  layout: 'full' | 'left' | 'right';
  flagImage?: any;
  elevationVariant?: 1 | 2 | 3 | 4 | 5;
  badgeType?: 'wide' | 'narrow';
}

const CARD_DATA: CardItem[] = [
  // Row 1: full-width card – @tomtom8
  { id: 'fw1', image: HOME_IMAGES.card1_fullWidth, height: 258, username: '@tomtom8', profileImage: PROFILE_IMAGES.tomtom8, activityType: 'Backcountry Skiing', elevation: '2550mt', distance: '33km', time: '5d 3h', progress: 0.63, layout: 'full', flagImage: HOME_IMAGES.flag1, elevationVariant: 1, badgeType: 'wide' },
  // Row 2 left – @tony
  { id: 'l2', image: HOME_IMAGES.card2_left, height: 239, username: '@tony', profileImage: PROFILE_IMAGES.tony, activityType: 'Hiking', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'left', flagImage: HOME_IMAGES.flag2, elevationVariant: 2, badgeType: 'wide' },
  // Row 2 right – @iamsimon
  { id: 'r2', image: HOME_IMAGES.card9_right, height: 286, username: '@iamsimon', profileImage: PROFILE_IMAGES.iamsimon, activityType: 'Free Skiing', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', flagImage: HOME_IMAGES.flag3, elevationVariant: 3, badgeType: 'narrow' },
  // Row 3 left – @nik_66
  { id: 'l3', image: HOME_IMAGES.card3_left, height: 239, username: '@nik_66', profileImage: PROFILE_IMAGES.nik66, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'narrow' },
  // Row 3 right – @julian_
  { id: 'r3', image: HOME_IMAGES.card7_right, height: 286, username: '@julian_', profileImage: PROFILE_IMAGES.julian, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  // Row 4 left – @rebsix
  { id: 'l4', image: HOME_IMAGES.card4_right, height: 286, username: '@rebsix', profileImage: PROFILE_IMAGES.rebsix, activityType: 'Hiking', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'left', elevationVariant: 3, badgeType: 'wide' },
  // Row 4 right – @cusmin
  { id: 'r4', image: HOME_IMAGES.card5_left, height: 189, username: '@cusmin', profileImage: PROFILE_IMAGES.cusmin, activityType: 'Trail Running', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'right', elevationVariant: 4, badgeType: 'narrow' },
  // Row 5: full-width – @_ashley
  { id: 'fw2', image: HOME_IMAGES.card6_fullWidth, height: 219, username: '@_ashley', profileImage: PROFILE_IMAGES.ashley, activityType: 'Backcountry Skiing', elevation: '1800mt', distance: '11km', time: '2d 5h', progress: 1, layout: 'full', elevationVariant: 2, badgeType: 'wide' },
  // Row 6: full-width large – @tony (again)
  { id: 'fw3', image: HOME_IMAGES.card8_fullWidth, height: 485, username: '@tony', profileImage: PROFILE_IMAGES.tony, activityType: '4x4 Overlanding', elevation: '1200mt', distance: '15km', time: '5h 30min', progress: 1, layout: 'full', elevationVariant: 5, badgeType: 'wide' },
];

/* ── Component ── */
export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ view?: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'home' | 'youFollow' | 'explore'>(
    params.view === 'youFollow' ? 'youFollow' : params.view === 'explore' ? 'explore' : 'home'
  );
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (params.view === 'youFollow') {
      setSelectedView('youFollow');
      return;
    }
    if (params.view === 'explore') {
      setSelectedView('explore');
      return;
    }
    setSelectedView('home');
  }, [params.view]);

  useEffect(() => {
    if (selectedView !== 'explore' && isFilterOpen) {
      setIsFilterOpen(false);
    }
  }, [selectedView, isFilterOpen]);

  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / 852;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const followingUsers = new Set(['@tony', '@julian_', '@_ashley', '@iamsimon', '@rebsix']);
  const visibleCards = CARD_DATA.filter((item) => {
    if (selectedView === 'home') {
      return true;
    }
    if (selectedView === 'youFollow') {
      return followingUsers.has(item.username);
    }
    return !followingUsers.has(item.username);
  });

  const scaledColW = sx(COL_W);
  const scaledFullW = sx(BASE_WIDTH - SIDE_PAD * 2);
  const scaledStatBarW = sx(87);

  /* Split cards into left / right / full columns */
  const leftCards = visibleCards.filter((c) => c.layout === 'left');
  const rightCards = visibleCards.filter((c) => c.layout === 'right');
  const fullCards = visibleCards.filter((c) => c.layout === 'full');

  /* Render a single card */
  const renderCard = (item: CardItem) => (
    <View key={item.id} style={styles.cardWrapper}>
      {/* Profile row */}
      <TouchableOpacity
        style={styles.cardUserRow}
        activeOpacity={0.7}
        onPress={() => router.push('/other-user-profile')}
      >
        <Image source={item.profileImage} style={styles.cardUserAvatar} />
        <Text style={styles.cardUsername}>{item.username}</Text>
        {item.flagImage && (
          <Image source={item.flagImage} style={styles.flagIcon} />
        )}
      </TouchableOpacity>

      {/* Card image + terrain badge overlay */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/activity-detail')}
      >
        {item.image ? (
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
        ) : (
          <View
            style={[
              styles.cardPlaceholder,
              {
                height: sy(item.height),
                width: item.layout === 'full' ? scaledFullW : scaledColW,
              },
            ]}
          />
        )}

        {/* Terrain badge – overlaid on image bottom right */}
        <View style={[
          styles.terrainBadge,
          item.badgeType === 'wide' ? styles.terrainBadgeWide : styles.terrainBadgeNarrow,
        ]}>
          {item.badgeType === 'wide' && (
            <View style={styles.terrainBadgeLayer2} />
          )}
          <View style={styles.terrainBadgeLayer3} />
          {item.badgeType === 'wide' && (
            <View style={styles.terrainBadgeProfileWrap}>
              <View style={{ transform: [{ rotate: '170deg' }] }}>
                <TerrainProfileIcon width={sx(30)} height={sy(10)} color="#007AFF" />
              </View>
            </View>
          )}
          <View style={styles.terrainBadgeIconWrap}>
            <View style={{ transform: [{ rotate: '82deg' }] }}>
              <TerrainProfileIcon width={sx(18)} height={sy(10)} color="#007AFF" />
            </View>
          </View>
          {item.badgeType === 'wide' && (
            <Text style={styles.terrainBadgeCount}>+2</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Stats section – below image (Figma: positioned below card, not overlaid) */}
      <View style={styles.statsRowWithActions}>
        <View style={styles.statsSection}>
          <Text style={styles.statsActivityType}>{item.activityType}</Text>
          {/* Elevation row: label | Vector18 line | value (all inline) */}
          <View style={styles.statsRow}>
            <Text style={styles.statsLabelFixed}>Elevation</Text>
            <ElevationProfileIcon
              width={sx(87)}
              height={sy(10)}
              color="#282828"
              variant={item.elevationVariant ?? 1}
            />
            <Text style={styles.statsValueRight}>{item.elevation}</Text>
          </View>
          {/* Distance row: label | Rectangle133 progress bar | value (all inline) */}
          <View style={styles.statsRow}>
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
          {/* Time row: label | spacer | value */}
          <View style={styles.statsRow}>
            <Text style={styles.statsLabelFixed}>Time</Text>
            <View style={styles.statsTimeSpacer} />
            <Text style={styles.statsValueRight}>{item.time}</Text>
          </View>
        </View>

        {selectedView !== 'explore' && (
          <View style={styles.cardActionsRow}>
            <TouchableOpacity style={styles.elevationChip} activeOpacity={0.8}>
              <View style={styles.elevationIconWrap}>
                <Svg width={16} height={23} viewBox="0 0 16 23" fill="none">
                  <Path
                    d="M7.17006 0.525604C7.76248 -0.446227 9.32284 0.0275002 9.21952 1.14768L8.45712 9.41308H14.8967C15.7466 9.41308 16.2764 10.2937 15.8487 10.9954L8.8523 22.4743C8.25882 23.4481 6.69531 22.9703 6.80331 21.8482L7.59478 13.6235H7.06369L7.05995 13.6235H1.1033C0.253368 13.6235 -0.276434 12.7429 0.151331 12.0412L7.17006 0.525604Z"
                    fill="#007AFF"
                  />
                </Svg>
              </View>
              <Text style={styles.elevationChipText}>249</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trendChip} activeOpacity={0.8}>
              <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.62915 0.5C4.25395 0.5 3.94983 0.804118 3.94983 1.17932C3.94983 1.55453 4.25395 1.85864 4.62915 1.85864L18.3604 1.85864L-0.954971 21.174C-1.22027 21.4393 -1.22027 21.8694 -0.954971 22.1347C-0.689671 22.4 -0.259566 22.4 0.00573444 22.1347L19.3211 2.81932L19.3211 16.5506C19.3211 16.9258 19.6252 17.2299 20.0004 17.2299C20.3756 17.2299 20.6797 16.9258 20.6797 16.5506L20.6797 2.19834C20.6797 1.26034 19.9194 0.5 18.9814 0.5L4.62915 0.5Z"
                  fill="#282828"
                  stroke="#282828"
                  strokeWidth={0.75}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        )}
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.headerBlock}>
        <View style={[styles.headerSection, isFilterOpen ? styles.headerSectionWithFilter : styles.headerSectionClosed]}>
          <View style={styles.mapWrapper}>
            <Image
              source={HOME_IMAGES.mapBanner}
              style={styles.mapImage}
              resizeMode="cover"
            />

            {selectedView === 'explore' ? (
              <>
                <View style={styles.mapRightRadar} pointerEvents="none">
                  <View style={styles.radarRing180} />
                  <View style={styles.radarRing140} />
                  <View style={styles.radarRing95} />
                  <View style={styles.radarRing61} />
                  <View style={styles.radarRing36} />
                  <View style={styles.radarCoreDot} />
                </View>

                <View style={styles.mapLeftPulse}>
                  <View style={styles.mapLeftPulseOuter} />
                  <View style={styles.mapLeftPulseMid} />
                  <View style={styles.mapLeftPulseInner} />
                  <View style={styles.mapLeftPulseCore} />
                </View>

                <View style={styles.mapBadgeIcon}>
                  <View style={{ transform: [{ rotate: '170deg' }] }}>
                    <TerrainProfileIcon width={sx(30)} height={sy(10)} color="#007AFF" />
                  </View>
                </View>

                <View style={styles.headerTextBlock}>
                  <Text style={styles.headerTitle}>Current Location</Text>
                  <Text style={styles.headerSubtitle}>Oslo, Norway</Text>
                  <Text style={styles.headerCount}>3,576 activities found</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.routeLineWrap}>
                  <Svg width={sx(184)} height={sy(78)} viewBox="0 0 184 78" fill="none">
                    <Path
                      d="M147.971 21.1565L139.669 26.4986C137.511 27.8874 135.194 29.0127 132.768 29.8502L125.491 32.3625C122.807 33.2888 120.552 35.1598 119.147 37.6262C118.068 39.5193 116.482 41.0733 114.567 42.113L105.108 47.249C102.076 48.8957 99.2261 50.8557 96.6512 53.1534C92.1805 57.143 86.3965 62.4039 86.1515 62.5166C85.8214 62.6683 74.8898 61.0041 72.9163 63.7338C68.9576 69.2092 62.9078 56.5238 59.5059 50.6861C56.8548 46.137 54.165 41.2552 54.0484 39.9872C54.0061 39.5268 53.5649 39.1454 52.8716 38.8295C45.9353 35.6689 35.004 32.1499 30.5381 38.3271C25.8989 44.7439 20.6132 50.6422 15.3723 56.5778C15.057 56.935 14.7696 57.2894 14.5178 57.6377C11.5576 61.7322 10.1062 58.0434 4.59148 58.5506C1.85631 58.8022 1.03285 62.7957 1.00036 66.9908C0.96653 71.3577 4.26106 74.8697 8.46626 76.0473C10.669 76.6641 13.0074 76.5947 15.1696 75.8482L21.1363 73.7883C24.9703 72.4648 28.4897 70.3895 31.6532 67.8512C39.0103 61.9481 49.6624 54.4055 55.3265 53.8846C62.3853 53.2355 69.297 52.5998 71.8705 52.3631L76.286 51.957C81.9387 51.4372 87.1615 48.7192 90.8308 44.3879C91.6945 43.3684 92.462 42.2712 93.1235 41.1103L95.9599 36.1327C96.9466 34.7678 110.588 25.8687 103.854 25.2139C102.386 25.0712 101.621 24.7224 101.305 24.2704C100.513 23.1397 106.151 17.3081 107.111 16.3164C107.331 16.0892 107.625 15.9484 107.94 15.9195L114.911 15.2784C117.986 14.9956 121.085 15.4212 123.97 16.5224L125.159 16.9765C126.818 17.6096 128.537 18.0691 130.291 18.3477L147.971 21.1565ZM147.971 21.1565L151.28 20.8522M151.28 20.8522L164.05 14.5814C166.976 13.3385 168.462 14.1757 171.771 13.8714C175.08 13.5671 180.303 -2.20243 180.652 1.58779C181.352 9.20191 182.043 16.715 182.743 24.3291C182.836 25.3339 181.808 25.6358 180.537 25.635C177.578 25.633 174.615 25.0766 171.668 25.3476L164.877 25.9722C162.213 26.2172 159.573 25.2987 157.637 23.4529L156.994 22.8404C155.466 21.3838 153.382 20.6589 151.28 20.8522Z"
                      stroke="#007AFF"
                      strokeWidth={2}
                    />
                  </Svg>
                </View>
                <TouchableOpacity
                  style={styles.openButton}
                  activeOpacity={0.7}
                  onPress={() => router.push('/activity-detail')}
                >
                  <Text style={styles.openButtonText}>Open</Text>
                </TouchableOpacity>
                <View style={styles.mapBadgeIconLeft}>
                  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.6667 2.80889C11.6667 1.25758 12.9103 0 14.4444 0C15.9785 0 17.2221 1.25758 17.2221 2.80889C17.2221 4.3602 15.9785 5.61779 14.4444 5.61779C12.9103 5.61779 11.6667 4.3602 11.6667 2.80889ZM9.00731 4.41349C9.58056 4.06567 10.3175 4.18019 10.761 4.68601C11.7807 5.84892 13.3428 6.72788 14.9986 7.3164C16.6492 7.9031 18.2361 8.14579 19.1665 8.14579C21.7744 8.14579 23.8886 10.2837 23.8886 12.9209C23.8886 13.9574 23.562 14.9168 23.0072 15.6995C22.8913 15.863 23.0495 16.1151 23.2425 16.0614C23.9821 15.8558 24.7465 16.2953 24.9499 17.0432C25.1533 17.7911 24.7186 18.5641 23.979 18.7698L1.75746 24.9494C1.01788 25.155 0.253449 24.7155 0.0500635 23.9676C-0.153322 23.2197 0.281353 22.4467 1.02094 22.241C1.61515 22.0758 1.72773 21.1587 1.30458 20.71C0.4965 19.8531 0.000350171 18.6927 0.000350171 17.4151C0.000350171 14.7779 2.1145 12.64 4.72244 12.64C7.33037 12.64 9.44452 14.7779 9.44452 17.4151C9.44452 18.3966 10.4416 19.6212 11.3871 19.3583L12.6154 19.0167C14.101 18.6036 14.7119 15.1375 14.4933 13.6111C14.4611 13.3857 14.4444 13.1553 14.4444 12.9209C14.4444 12.3846 14.5318 11.8689 14.6931 11.3876C14.8799 10.83 14.6316 10.1633 14.0775 9.96637C13.4742 9.75196 12.8551 9.49545 12.2445 9.19183C11.4636 8.80356 10.5352 8.74031 9.78706 9.18839C9.52455 9.3456 9.59184 9.73234 9.88852 9.8072C10.0696 9.85289 10.239 9.89765 10.3929 9.94175C11.0829 10.1395 11.842 10.4165 12.4341 10.9974C13.0721 11.6235 13.3428 12.421 13.4488 13.2832C13.5507 14.1129 13.5165 15.1444 13.4228 16.3975C13.3649 17.1709 12.698 17.7505 11.9332 17.692C11.1683 17.6336 10.5952 16.9592 10.653 16.1857C10.7458 14.9438 10.757 14.1569 10.6922 13.6295C10.6325 13.1429 10.527 13.0399 10.5009 13.0145L10.4997 13.0132C10.4299 12.9448 10.2443 12.8186 9.63564 12.6442C9.28067 12.5425 8.90474 12.4543 8.44392 12.3461C8.0803 12.2607 7.66383 12.1629 7.1631 12.0363C6.54241 11.8794 5.99524 11.6859 5.54256 11.4372C5.09637 11.1921 4.64979 10.8425 4.3676 10.3289C3.70421 9.12138 4.37219 8.01143 4.8425 7.44932C5.35632 6.8352 6.10091 6.27164 6.80415 5.79452C7.4462 5.35891 8.15074 4.93228 8.77675 4.5532C8.85492 4.50586 8.93186 4.45927 9.00731 4.41349ZM19.1665 10.9547C18.0926 10.9547 17.2221 11.835 17.2221 12.9209C17.2221 14.0068 18.0926 14.8871 19.1665 14.8871C20.2403 14.8871 21.1109 14.0068 21.1109 12.9209C21.1109 11.835 20.2403 10.9547 19.1665 10.9547ZM4.72244 15.4489C3.64858 15.4489 2.77805 16.3292 2.77805 17.4151C2.77805 18.5011 3.64858 19.3814 4.72244 19.3814C5.79629 19.3814 6.66683 18.5011 6.66683 17.4151C6.66683 16.3292 5.79629 15.4489 4.72244 15.4489ZM24.9411 21.5063C25.1615 22.2492 24.7446 23.0322 24.0099 23.2551L18.4545 24.9404C17.7198 25.1633 16.9455 24.7417 16.7251 23.9987C16.5047 23.2558 16.9216 22.4729 17.6563 22.25L23.2117 20.5646C23.9464 20.3417 24.7207 20.7633 24.9411 21.5063Z"
                      fill="#007AFF"
                    />
                  </Svg>
                </View>
                <View style={styles.headerTextBlockHome}>
                  <Text style={styles.headerTitle}>Your last activity</Text>
                  <Text style={styles.headerSubtitle}>Oslo, Norway</Text>
                  <Text style={styles.headerCount}>87 km gravel ride</Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.searchBarRow}>
            {selectedView === 'explore' ? (
              <>
                <TouchableOpacity
                  style={styles.searchSideBtn}
                  activeOpacity={0.7}
                  onPress={() => setIsFilterOpen((prev) => !prev)}
                >
                  <FilterIcon width={31} height={19} color={isFilterOpen ? '#007AFF' : '#616264'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchBar}
                  activeOpacity={0.7}
                  onPress={() => router.push('/search')}
                >
                  <Text style={styles.searchBarText}>Search Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchSideBtnTarget}
                  activeOpacity={0.7}
                  onPress={() => router.replace('/(tabs)/explore')}
                >
                  <View style={styles.targetDotActive}>
                    <View style={styles.targetDotActiveOuter} />
                    <View style={styles.targetDotActiveMid} />
                    <View style={styles.targetDotActiveInner} />
                    <View style={styles.targetDotActiveCore} />
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.searchSideBtn}
                  activeOpacity={0.7}
                  onPress={() => router.push('/create-modal')}
                >
                  <Text style={styles.plusIcon}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchBar}
                  activeOpacity={0.7}
                  onPress={() => router.push('/search')}
                >
                  <Text style={styles.searchBarText}>Search Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchSideBtn}
                  activeOpacity={0.7}
                  onPress={() => router.push('/messages-list')}
                >
                  <Svg width={31} height={25} viewBox="0 0 31 25" fill="none">
                    <Path
                      d="M24.1253 6.42268e-06L4.94257 0.00158761C0.813781 0.169662 -0.000935775 1.89526 0 5.19387L0.00133372 13.4502C-0.000665515 16.7611 -0.0680461 20.0487 4.94257 19.8007L4.93893 22.9359C4.93886 23.407 4.63737 25.0678 5.5684 24.9979C5.83825 24.9775 13.119 20.3338 14.2006 19.8007H19.3296L23.612 19.8041C24.6863 19.8046 25.8855 19.9035 26.9295 19.676C29.906 19.0274 30.1596 17.0026 30.1596 14.8406L30.1585 4.12082C30.1475 0.28529 27.8711 -0.00157322 24.1253 6.42268e-06Z"
                      fill="#616264"
                    />
                    <Path
                      d="M7.48927 8.26378C9.52724 8.15463 9.70158 10.6132 7.81744 10.9072C5.88347 11.0604 5.51519 8.61699 7.48927 8.26378Z"
                      fill="#CFD0D1"
                    />
                    <Path
                      d="M14.6852 8.26398C16.94 8.22401 17.1618 10.3785 15.3689 10.9074C13.3832 11.1141 12.8275 9.06928 14.6852 8.26398Z"
                      fill="#CFD0D1"
                    />
                    <Path
                      d="M22.503 8.26331C24.3847 8.0687 24.7542 10.4336 22.8986 10.9067C20.8165 11.0398 20.5132 8.50594 22.503 8.26331Z"
                      fill="#CFD0D1"
                    />
                  </Svg>
                </TouchableOpacity>
              </>
            )}
          </View>

          {selectedView === 'explore' && (
            <SharedFeedFilterPanel
              visible={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              attached
            />
          )}
        </View>

      </View>

      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={styles.mainContent}
          scrollEnabled
          directionalLockEnabled
          canCancelContentTouches
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.tabRow}>
            <Pressable
              onPress={() => setSelectedView('explore')}
              hitSlop={2}
              pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
            >
              <Text style={[styles.tabText, selectedView === 'explore' && styles.tabTextActive]}>
                Explore
              </Text>
            </Pressable>


            <Pressable
              onPress={() => setSelectedView('youFollow')}
              hitSlop={2}
              pressRetentionOffset={{ top: 2, left: 2, right: 2, bottom: 2 }}
            >
              <Text style={[styles.tabText, selectedView === 'youFollow' && styles.tabTextActive]}>
                You Follow
              </Text>
            </Pressable>
          </View>

          <View style={styles.feedContainer}>
            {fullCards[0] && renderCard(fullCards[0])}

            <View style={styles.masonryContainer}>
              <View style={styles.masonryCol}>
                {leftCards.map(renderCard)}
              </View>
              <View style={styles.masonryCol}>
                {rightCards.map(renderCard)}
              </View>
            </View>

            {fullCards[1] && renderCard(fullCards[1])}
            {fullCards[2] && renderCard(fullCards[2])}
            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>

        {isFilterOpen && (
          <BlurView
            intensity={35}
            tint="light"
            pointerEvents="none"
            style={styles.contentBlurOverlay}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

/* ── Styles (pixel-perfect from Figma node 1:3129) ── */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  headerBlock: {
    backgroundColor: '#A0A0A0',
  },
  mainScroll: {
    flex: 1,
  },
  mainContent: {
    paddingBottom: 132,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  contentBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  headerSection: {
    marginTop: -1,
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
  },
  headerSectionClosed: {
    height: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerSectionWithFilter: {
    minHeight: 177,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  mapWrapper: {
    marginHorizontal: 5,
    marginTop: 5,
    width: 382,
    height: 110,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  routeLineWrap: {
    position: 'absolute',
    top: 8,
    right: 28,
  },
  openButton: {
    position: 'absolute',
    right: 10,
    top: 47,
    width: 85,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#282828',
  },
  mapRightRadar: {
    position: 'absolute',
    right: -12,
    top: -34,
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing180: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing140: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing95: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing61: {
    position: 'absolute',
    width: 61,
    height: 61,
    borderRadius: 30.5,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarRing36: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.25,
    borderColor: 'rgba(21, 131, 251, 0.8)',
    backgroundColor: 'rgba(21, 131, 251, 0.1)',
  },
  radarCoreDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  mapLeftPulse: {
    position: 'absolute',
    left: 18,
    top: 48,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLeftPulseOuter: {
    position: 'absolute',
    width: 31,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  mapLeftPulseMid: {
    position: 'absolute',
    width: 23.79,
    height: 23.79,
    borderRadius: 11.9,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  mapLeftPulseInner: {
    position: 'absolute',
    width: 16.58,
    height: 16.58,
    borderRadius: 8.29,
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  mapLeftPulseCore: {
    position: 'absolute',
    width: 10.81,
    height: 10.81,
    borderRadius: 5.405,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  mapBadgeIcon: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    width: 28,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBadgeIconLeft: {
    position: 'absolute',
    left: 14,
    top: 45,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextBlock: {
    position: 'absolute',
    top: 48,
    left: 53,
  },
  headerTextBlockHome: {
    position: 'absolute',
    top: 55,
    left: 53,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#282828',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
  },
  headerCount: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
    bottom: 6,
  },

  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 6,
    gap: 4,
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
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  targetDotActiveMid: {
    position: 'absolute',
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  targetDotActiveInner: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  targetDotActiveCore: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  searchBar: {
    width: 251,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F1F1F',
  },
  plusIcon: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '300',
    color: '#282828',
    marginTop: -2,
  },
  messagesIconWrap: {
    width: 30,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesGlyph: {
    fontSize: 20,
    lineHeight: 20,
    color: '#616264',
    fontWeight: '700',
  },
  messagesDot: {
    position: 'absolute',
    top: 1,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderColor: '#CFD0D1',
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    marginTop: 18,
    marginBottom: 6,
  },
  tabText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#838385',
  },
  tabTextActive: {

    color: '#282828',
  },

  /* ── Per-card user row ── */
  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: -2,
    paddingVertical: 4,
    gap: 4,
  },
  cardWrapper: {
    marginBottom: 4,
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

  /* ── Card image ── */
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    borderRadius: 20,
  },
  cardPlaceholder: {
    borderRadius: 20,
    backgroundColor: '#838383',
  },

  /* ── Stats section (Figma: below card image, not overlaid) ── */
  statsSection: {
    paddingLeft: 11,
    paddingTop: 5,
    paddingBottom: 2,
  },
  statsRowWithActions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
    paddingBottom: 6,
  },
  elevationChip: {
    width: 73,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#B8B8B8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  elevationIconWrap: {
    width: 16,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elevationChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'center',
  },
  trendChip: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B8B8B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsActivityType: {
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 3,
    width: 141,
  },
  statsRow: {
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

  /* ── Terrain badge (bottom-right, Figma exact) ── */
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

  /* ── Grid / masonry ── */
  feedContainer: {
    marginTop: 0,
    width: '100%',
    // right: -2,
    // left: -2,
    // paddingRight: -12
    // marginHorizontal: -12,
    // paddingHorizontal: SIDE_PAD,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: COL_GAP
  },
  masonryCol: {
    width: COL_W,
  },
  bottomSpacer: {
    height: 100,
  },
});
