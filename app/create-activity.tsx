import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';
import { scaleHeight, scaleUniform, scaleWidth } from '../src/utils/globalScale';

const HERO_PANEL_MIN_HEIGHT = scaleHeight(224);
const HERO_PREVIEW_WIDTH = scaleWidth(100);
const HERO_PREVIEW_HEIGHT = scaleHeight(170);
const HERO_BADGE_WIDTH = scaleWidth(16);
const HERO_BADGE_HEIGHT = scaleHeight(12);
const HERO_BADGE_RADIUS = scaleUniform(6);
const CONTENT_HORIZONTAL = scaleWidth(25);

const DIFFICULTY_LEVELS = [
  { id: 1, label: 'Easy' },
  { id: 2, label: 'Intermediate' },
  { id: 3, label: 'Difficult' },
  { id: 4, label: 'Advanced' },
];

const TAGGED_FRIENDS = [
  { id: 1, username: '@andyros96', image: require('../assets/images/feed/friend_avatar_andyros.png') },
  { id: 2, username: '@rowbat88', image: require('../assets/images/feed/friend_rowbat88.png') },
  { id: 3, username: '@jhonny', image: require('../assets/images/feed/friend_jhonny.png') },
  { id: 4, username: '@carol3', image: require('../assets/images/feed/friend_carol3.png') },
];

export default function CreateActivityScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(3);

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />

      <View style={[styles.heroPanel, { minHeight: HERO_PANEL_MIN_HEIGHT }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <BackArrowIcon width={20} height={20} color="#282828" />


          </TouchableOpacity>

          <View style={[styles.heroPreviewWrap, { width: HERO_PREVIEW_WIDTH, height: HERO_PREVIEW_HEIGHT }]}>
            <Image
              source={require('../assets/images/feed/mountains_hero.png')}
              style={styles.heroPreview}
              resizeMode="cover"
            />
            <View style={[styles.heroBadge, { width: HERO_BADGE_WIDTH, height: HERO_BADGE_HEIGHT, borderRadius: HERO_BADGE_RADIUS }]}>
              <Text style={styles.heroBadgeText}>1</Text>
            </View>
          </View>
          <View style={styles.headerSpacer} />
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/create-activity')}
          >
            <Text style={styles.nextBtnText}>Post</Text>
          </TouchableOpacity>
        </View>


      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentInner, { paddingHorizontal: CONTENT_HORIZONTAL }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity Section */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionLabel}>Activity (1)</Text>
          <View style={styles.activityRow}>
            {/* Left: stacked action buttons */}
            <View style={styles.activityActionBtns}>
              <TouchableOpacity
                style={[styles.activityActionBtn, { height: scaleHeight(63) }]}
                activeOpacity={0.7}
                onPress={() => router.push('/activity-filter-selection')}
              >
                <Text style={styles.activityActionPlus}>+</Text>
                <Text style={styles.activityActionBtnText}>{'Import\nGPX'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.activityActionBtn, { height: scaleHeight(68) }]} activeOpacity={0.7} onPress={() => router.push('/activity-filter-selection')}>
                <Text style={styles.activityActionPlus}>+</Text>
                <Text style={styles.activityActionBtnText}>{'Select\nActivity'}</Text>
              </TouchableOpacity>
            </View>

            {/* Vertical divider */}
            <View style={styles.activityDivider} />

            {/* Right: activity info card */}
            <View style={styles.activityInfoCard}>
              <View style={styles.activityCardHeader}>
                <View>
                  <Text style={styles.activityCardDay}>16</Text>
                  <Text style={styles.activityCardMonth}>MAR</Text>
                </View>
                <View style={styles.cyclingCircle} />
              </View>
              <Text style={styles.activityCardType}>{'Gravel\nCycling'}</Text>
              <View style={styles.activityCardFooter}>
                <Text style={styles.activityCardDistance}>87 km</Text>
                <View style={styles.routeIconBtn}>
                  <View style={styles.routeIconInner} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Decription</Text>
          <View style={styles.textareaContainer}>
            <View style={styles.textareaRow}>
              <TextInput
                style={styles.textarea}
                placeholder="Add a description"
                placeholderTextColor="#A0A0A0"
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={100}
              />
              <Text style={styles.pencilIcon}>✏</Text>
            </View>
            <Text style={styles.charCount}>{description.length}/100</Text>
          </View>
        </View>

        {/* Tag Friends Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tag friends (1)</Text>
          <View style={styles.tagFriendsRow}>
            <TouchableOpacity style={styles.addFriendBtn} activeOpacity={0.7} onPress={() => router.push('/friends-grid')}>
              <Text style={styles.addFriendText}>+</Text>
            </TouchableOpacity>
            <View style={styles.tagFriendsDivider} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendAvatarList}>
              {TAGGED_FRIENDS.map((friend) => (
                <View key={friend.id} style={styles.friendItem}>
                  <Image source={friend.image} style={styles.friendAvatar} />
                  <Text style={styles.friendUsername}>{friend.username}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Level / Difficulty Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {`Level - ${selectedDifficulty} ${DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.label}`}
          </Text>
          <View style={styles.difficultyRow}>
            {DIFFICULTY_LEVELS.map((level) => (
              <View key={level.id} style={styles.difficultyItem}>
                <TouchableOpacity
                  style={[styles.difficultyCircle, selectedDifficulty === level.id && styles.difficultyCircleActive]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDifficulty(level.id)}
                >
                  <Text style={[styles.difficultyNumber, selectedDifficulty === level.id && styles.difficultyNumberActive]}>
                    {level.id}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.difficultyLabel, selectedDifficulty === level.id && styles.difficultyLabelActive]}>
                  {level.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#282828',
  },
  heroPanel: {
    backgroundColor: '#A0A0A0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 18,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 48,
  },
  heroPreviewWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 2,
    marginLeft: 75,
    // height: 200
  },

  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    gap: 4,
  },
  nextBtnText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  nextIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heroPreview: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadgeText: {
    color: '#F2F2F2',
    fontSize: 9,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  // ── Activity Section ──────────────────────────────────────────
  activitySection: {
    marginBottom: 20,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityActionBtns: {
    width: scaleWidth(91),
    gap: 8,
  },
  activityActionBtn: {
    width: scaleWidth(91),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 6,
  },
  activityActionPlus: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#A0A0A0',
  },
  activityActionBtnText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#F5F5F5',
  },
  activityDivider: {
    width: 1,
    backgroundColor: '#A0A0A0',
    marginHorizontal: 12,
    height: scaleHeight(58),
    marginTop: scaleHeight(20),
  },
  activityInfoCard: {
    width: scaleWidth(101),
    height: scaleHeight(135),
    backgroundColor: '#CFD0D1',
    borderRadius: 20,
    padding: 9,
    justifyContent: 'space-between',
  },
  activityCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activityCardDay: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    lineHeight: 26,
  },
  activityCardMonth: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    lineHeight: 26,
  },
  cyclingCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#007AFF',
  },
  activityCardType: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#282828',
  },
  activityCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityCardDistance: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  routeIconBtn: {
    width: 30,
    height: 37,
    borderRadius: 10,
    backgroundColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeIconInner: {
    width: 16,
    height: 22,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#555555',
  },

  // ── Shared Section ────────────────────────────────────────────
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
    marginBottom: 12,
  },

  // ── Description Section ───────────────────────────────────────
  textareaContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    minHeight: scaleHeight(120),
  },
  textareaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textarea: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#F5F5F5',
    minHeight: 60,
    paddingTop: 0,
  },
  pencilIcon: {
    fontSize: 18,
    color: '#F5F5F5',
    marginLeft: 8,
    marginTop: 2,
  },
  charCount: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
    color: '#A0A0A0',
    marginTop: 6,
  },

  // ── Tag Friends Section ───────────────────────────────────────
  tagFriendsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addFriendBtn: {
    width: scaleWidth(59),
    height: scaleHeight(59),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendText: {
    fontSize: 24,
    color: '#F5F5F5',
    fontWeight: '300',
  },
  tagFriendsDivider: {
    width: 1,
    height: scaleHeight(58),
    backgroundColor: '#A0A0A0',
    marginHorizontal: 14,
  },
  friendAvatarList: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  friendItem: {
    alignItems: 'center',
    gap: 4,
  },
  friendAvatar: {
    paddingTop: 2,
    width: scaleWidth(50),
    height: scaleHeight(50),
    borderRadius: 20,
  },
  friendUsername: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#F5F5F5',
  },

  // ── Difficulty Section ────────────────────────────────────────
  difficultyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyItem: {
    alignItems: 'center',
    gap: 8,
  },
  difficultyCircle: {
    width: scaleWidth(60),
    height: scaleHeight(62),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyCircleActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  difficultyNumber: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  difficultyNumberActive: {
    color: '#FFFFFF',
  },
  difficultyLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#F5F5F5',
  },
  difficultyLabelActive: {
    color: '#007AFF',
  },
});
