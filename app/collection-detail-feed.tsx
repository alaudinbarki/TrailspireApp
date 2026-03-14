import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import type { DimensionValue } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Svg, { Path, SvgUri } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { TerrainProfileIcon } from '../src/components/icons/TerrainProfileIcon';

const BASE_WIDTH = 393;
const DATA_PANEL_H = 82;
const COL_W = 191;
const GAP = 6;
const SIDE_PAD = 2;

function StatCurve() {
  return (
    <View style={styles.statCurveWrap}>
      <Svg width="100%" height={10} viewBox="0 0 88 10" fill="none" preserveAspectRatio="none">
        <Path
          d="M0.5 9.33627C7.53988 8.45449 10.667 6.7981 12.486 5.34054C14.7906 3.49389 17.4941 2.93532 20.3859 3.53404L24.7941 4.44669C27.2185 4.94863 29.715 4.99606 32.1567 4.58657L42.212 2.90026C43.3051 2.71695 44.4115 2.62481 45.5199 2.62481H50.2363C51.6553 2.62481 53.0503 2.25889 54.2865 1.5624C56.5593 0.2819 59.3038 0.151634 61.6877 1.2111L64.8687 2.62481L68.1903 4.47588C69.0586 4.95974 69.8457 5.57658 70.5231 6.30399C72.3241 8.2379 74.8478 9.33627 77.4904 9.33627H79.8814H87.2089"
          stroke="#282828"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

interface CardData {
  id: string;
  image: any;
  totalH: number;
  type: string;
  elev: string;
  dist: string;
  time: string;
  username: string;
  avatar: any;
  elevPct: DimensionValue;
  distPct: DimensionValue;
  timePct: DimensionValue;
}

const LEFT_CARDS: CardData[] = [
  {
    id: 'l1',
    image: require('../assets/images/feed/figma_card_1.png'),
    totalH: 189,
    type: 'Trail Running',
    elev: '2550mt', elevPct: '90%',
    dist: '33km', distPct: '80%',
    time: '5d 3h', timePct: '55%',
    username: '@will87',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
  {
    id: 'l2',
    image: require('../assets/images/feed/figma_card_3.png'),
    totalH: 239,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@nik_66',
    avatar: require('../assets/images/feed/figma_profile_nik66.png'),
  },
  {
    id: 'l3',
    image: require('../assets/images/feed/figma_card_5.png'),
    totalH: 286,
    type: 'Trail Running',
    elev: '1800mt', elevPct: '70%',
    dist: '11km', distPct: '30%',
    time: '2d 5h', timePct: '35%',
    username: '@julian_',
    avatar: require('../assets/images/feed/figma_profile_julian.png'),
  },
];

const RIGHT_CARDS: CardData[] = [
  {
    id: 'r1',
    image: require('../assets/images/feed/figma_card_2.png'),
    totalH: 286,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@lollomag',
    avatar: require('../assets/images/feed/figma_profile_cusmin.png'),
  },
  {
    id: 'r2',
    image: require('../assets/images/feed/figma_card_4.png'),
    totalH: 192,
    type: 'Running',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@tony',
    avatar: require('../assets/images/feed/figma_profile_tony.png'),
  },
  {
    id: 'r3',
    image: require('../assets/images/feed/figma_card_6.png'),
    totalH: 286,
    type: 'Trail Running',
    elev: '1800mt', elevPct: '70%',
    dist: '11km', distPct: '30%',
    time: '2d 5h', timePct: '35%',
    username: '@iamsimon',
    avatar: require('../assets/images/feed/figma_profile_iamsimon.png'),
  },
];

const LEFT_CARDS_2: CardData[] = [
  {
    id: 'l4',
    image: require('../assets/images/feed/figma_card_8.png'),
    totalH: 239,
    type: 'Hiking',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@gioforty',
    avatar: require('../assets/images/feed/figma_profile_gioforty.png'),
  },
  {
    id: 'l5',
    image: require('../assets/images/feed/figma_card_10.png'),
    totalH: 286,
    type: 'Trail Running',
    elev: '1800mt', elevPct: '70%',
    dist: '11km', distPct: '30%',
    time: '2d 5h', timePct: '35%',
    username: '@_ashley',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
];

const RIGHT_CARDS_2: CardData[] = [
  {
    id: 'r4',
    image: require('../assets/images/feed/figma_card_9.png'),
    totalH: 286,
    type: 'Backcountry Skiing',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@lollomag',
    avatar: require('../assets/images/feed/figma_profile_rebsix.png'),
  },
  {
    id: 'r5',
    image: require('../assets/images/feed/figma_card_11.png'),
    totalH: 192,
    type: 'Free Skiing',
    elev: '1200mt', elevPct: '50%',
    dist: '15km', distPct: '40%',
    time: '5h 30min', timePct: '45%',
    username: '@marconuvolari87',
    avatar: require('../assets/images/feed/figma_profile_marconuvolari87.png'),
  },
];

function ActivityCard({ card, width, imageH, iconW, iconH, isWideBadge }: { card: CardData; width: number; imageH: number; iconW: number; iconH: number; isWideBadge: boolean }) {
  return (
    <View style={[styles.cardWrapper, { width }]}>
      <View style={styles.cardUserRow}>
        <Image source={card.avatar} style={styles.userAvatar} />
        <Text style={styles.username}>{card.username}</Text>
      </View>

      <View style={styles.card}>
        <Image source={card.image} style={[styles.cardImage, { height: imageH }]} resizeMode="cover" />
        <View style={[
          styles.terrainBadge,
          isWideBadge ? styles.terrainBadgeWide : styles.terrainBadgeNarrow,
        ]}>
          {isWideBadge && <View style={styles.terrainBadgeLayer2} />}
          <View style={styles.terrainBadgeLayer3} />
          {isWideBadge && (
            <View style={styles.terrainBadgeProfileWrap}>
              <View style={{ transform: [{ rotate: '170deg' }] }}>
                <TerrainProfileIcon width={iconW} height={iconH} color="#007AFF" />
              </View>
            </View>
          )}
          <View style={styles.terrainBadgeIconWrap}>
            <View style={{ transform: [{ rotate: '82deg' }] }}>
              <TerrainProfileIcon width={Math.max(12, iconW * 0.6)} height={iconH} color="#007AFF" />
            </View>
          </View>
          {isWideBadge && <Text style={styles.terrainBadgeCount}>+2</Text>}
        </View>

      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsActivityType}>{card.type}</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Elevation</Text>
          <StatCurve />
          <Text style={styles.statValue}>{card.elev}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Distance</Text>
          <View style={styles.statBarBg}>
            <View style={[styles.statBarFill, { width: card.distPct }]} />
          </View>
          <Text style={styles.statValue}>{card.dist}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Time</Text>
          <View style={styles.statSpacer} />
          <Text style={styles.statValue}>{card.time}</Text>
        </View>
      </View>
    </View>
  );
}

export default function CollectionDetailFeedScreen() {
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const scaleX = screenWidth / BASE_WIDTH;
  const scaleY = screenHeight / 852;
  const sx = (value: number) => PixelRatio.roundToNearestPixel(value * scaleX);
  const sy = (value: number) => PixelRatio.roundToNearestPixel(value * scaleY);

  const scaledColW = sx(COL_W);
  const scaledFullW = sx(BASE_WIDTH - SIDE_PAD * 2);
  const allCards = [...LEFT_CARDS, ...RIGHT_CARDS, ...LEFT_CARDS_2, ...RIGHT_CARDS_2];
  const fullCards = allCards.filter((_, i) => i % 5 === 0);
  const gridCards = allCards.filter((_, i) => i % 5 !== 0);
  const leftCards = gridCards.filter((_, i) => i % 2 === 0);
  const rightCards = gridCards.filter((_, i) => i % 2 === 1);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ── Fixed Header ─────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.collectionTitle}>Skitouring Switzerland</Text>
          <Text style={styles.collectionSubtitle}>235 activities saved in this library</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/edit-collection')}
          >
            <Ionicons name="create-outline" size={20} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={22} color="#282828" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Fixed Filter Bar ─────────────────────────────────── */}
      <View style={styles.filterBar}>
        <View style={styles.filterBtns}>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
            <SvgUri
              uri={Image.resolveAssetSource(require('../assets/profile/profile-2.svg')).uri}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
            <SvgUri
              uri={Image.resolveAssetSource(require('../assets/profile/profile-4.svg')).uri}
              width={18}
              height={18}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.filterSelectedText}>Selected: Gravel Cycling / Hiking</Text>

      </View>

      {/* ── Scrollable Masonry Grid ───────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.feedContainer}>
          {fullCards[0] && (
            <TouchableOpacity key={fullCards[0].id} activeOpacity={0.85} onPress={() => { }}>
              <ActivityCard
                card={fullCards[0]}
                width={scaledFullW}
                imageH={sy(fullCards[0].totalH)}
                iconW={sx(30)}
                iconH={sy(10)}
                isWideBadge
              />
            </TouchableOpacity>
          )}

          {/* Masonry Grid */}
          <View style={styles.grid}>
            <View style={styles.column}>
              {leftCards.map((card) => (
                <TouchableOpacity key={card.id} activeOpacity={0.85} onPress={() => { }}>
                  <ActivityCard
                    card={card}
                    width={scaledColW}
                    imageH={sy(card.totalH)}
                    iconW={sx(18)}
                    iconH={sy(10)}
                    isWideBadge={false}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.column, { marginLeft: GAP }]}>
              {rightCards.map((card) => (
                <TouchableOpacity key={card.id} activeOpacity={0.85} onPress={() => { }}>
                  <ActivityCard
                    card={card}
                    width={scaledColW}
                    imageH={sy(card.totalH)}
                    iconW={sx(18)}
                    iconH={sy(10)}
                    isWideBadge={false}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {fullCards[1] && (
            <TouchableOpacity key={fullCards[1].id} activeOpacity={0.85} onPress={() => { }}>
              <ActivityCard
                card={fullCards[1]}
                width={scaledFullW}
                imageH={sy(fullCards[1].totalH)}
                iconW={sx(30)}
                iconH={sy(10)}
                isWideBadge
              />
            </TouchableOpacity>
          )}

          {fullCards[2] && (
            <TouchableOpacity key={fullCards[2].id} activeOpacity={0.85} onPress={() => { }}>
              <ActivityCard
                card={fullCards[2]}
                width={scaledFullW}
                imageH={sy(fullCards[2].totalH)}
                iconW={sx(30)}
                iconH={sy(10)}
                isWideBadge
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D8D8D8',
  },
  // ── Fixed Header ─────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 10,
    paddingHorizontal: 12,
    gap: 12,
    backgroundColor: '#D8D8D8',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexShrink: 0,
  },
  navLine: {
    width: 16,
    height: 2,
    backgroundColor: '#1F1F1F',
    borderRadius: 1,
  },
  headerText: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 16,
    color: '#282828',
    fontWeight: '700',
  },
  collectionTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 2,
  },
  collectionSubtitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
  },

  // ── Filter Bar ───────────────────────────────────────────────
  filterBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: '#D8D8D8',
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 30,
  },
  filterBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  filterBtnIconBlue: {
    width: 18,
    height: 2,
    backgroundColor: '#007AFF',
    borderRadius: 1,
  },
  filterBtnIconBlue2: {
    width: 12,
    height: 2,
    backgroundColor: '#007AFF',
    borderRadius: 1,
  },
  filterBtnIconRed: {
    width: 18,
    height: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 1,
  },
  filterBtnIconRed2: {
    width: 12,
    height: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 1,
  },
  filterSelectedText: {
    // flex: 1,
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
  },
  pencilIcon: {
    fontSize: 16,
    color: '#007AFF',
  },

  // Grid
  feedContainer: {
    marginTop: 0,
    paddingHorizontal: SIDE_PAD,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: GAP,
  },
  column: {
    width: COL_W,
    gap: GAP,
  },

  // Card
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
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
  },
  terrainBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 37,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  terrainBadgeLayer3: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 37,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
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
  statsSection: {
    paddingLeft: 11,
    paddingTop: 5,
    paddingBottom: 2,
  },
  statsActivityType: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 3,
    width: 141,
  },
  // Stats
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    height: 12,
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    width: 44,
  },
  statCurveWrap: {
    width: 87,
    height: 10,
    justifyContent: 'center',
  },
  statBarBg: {
    width: 87,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#282828',
    borderRadius: 20,
  },
  statSpacer: {
    width: 87,
  },
  statValue: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'right',
    flex: 1,
  },

  // User
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  username: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
    color: '#282828',
  },

  bottomSpacer: {
    height: 40,
  },

});
