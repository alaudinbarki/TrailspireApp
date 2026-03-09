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
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

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
        <Text style={styles.headerTitle}>Create Activity</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity Card */}
        <View style={styles.activityCard}>
          <View style={styles.dateTag}>
            <Text style={styles.dateDay}>16</Text>
            <Text style={styles.dateMonth}>MAR</Text>
          </View>

          <View style={styles.activityInfo}>
            <View style={styles.activityIconBox}>
              <View style={styles.cyclingIcon}>
                <View style={styles.cyclingWheel} />
                <View style={[styles.cyclingWheel, { marginLeft: 8 }]} />
              </View>
            </View>
            <View style={styles.activityStats}>
              <Text style={styles.activityDistance}>87 km</Text>
              <Text style={styles.activityType}>Cycling</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => { }}>
              <Text style={styles.actionBtnText}>Import GPX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => router.push('/activity-filter-selection')}>
              <Text style={styles.actionBtnText}>Select Activity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <View style={styles.textareaContainer}>
            <TextInput
              style={styles.textarea}
              placeholder="Add a description..."
              placeholderTextColor="#A0A0A0"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={100}
            />
            <Text style={styles.charCount}>{description.length}/100</Text>
          </View>
        </View>

        {/* Tag Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tag Friends</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsList}
          >
            {TAGGED_FRIENDS.map((friend) => (
              <View key={friend.id} style={styles.friendChip}>
                <Image source={friend.image} style={styles.friendAvatar} />
                <Text style={styles.friendUsername}>{friend.username}</Text>
                <TouchableOpacity style={styles.removeFriendBtn} activeOpacity={0.7}>
                  <Text style={styles.removeFriendText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addFriendBtn} activeOpacity={0.7} onPress={() => router.push('/friends-grid')}>
              <Text style={styles.addFriendText}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Difficulty */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Difficulty</Text>
          <View style={styles.difficultyGrid}>
            {DIFFICULTY_LEVELS.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.difficultyBtn,
                  selectedDifficulty === level.id && styles.difficultyBtnActive,
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedDifficulty(level.id)}
              >
                <View style={styles.difficultyCircles}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.difficultyCircle,
                        i < level.id && styles.difficultyCircleFilled,
                        selectedDifficulty === level.id &&
                        i < level.id &&
                        styles.difficultyCircleActive,
                      ]}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    styles.difficultyLabel,
                    selectedDifficulty === level.id && styles.difficultyLabelActive,
                  ]}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postBtn} activeOpacity={0.8} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
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
    padding: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  dateDay: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dateMonth: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  activityIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cyclingIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cyclingWheel: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#282828',
  },
  activityStats: {
    flex: 1,
  },
  activityDistance: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    color: '#282828',
    marginBottom: 2,
  },
  activityType: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#A0A0A0',
  },
  actionBtns: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '600',
    color: '#282828',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 12,
  },
  textareaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
  },
  textarea: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#282828',
    minHeight: 60,
  },
  charCount: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
    marginTop: 4,
  },
  friendsList: {
    flexDirection: 'row',
    gap: 10,
  },
  friendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 4,
    paddingRight: 8,
    paddingVertical: 4,
    gap: 6,
  },
  friendAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  friendUsername: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    color: '#282828',
  },
  removeFriendBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeFriendText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  addFriendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendText: {
    fontSize: 24,
    color: '#282828',
    fontWeight: '300',
  },
  difficultyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  difficultyBtn: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  difficultyBtnActive: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  difficultyCircles: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  difficultyCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
  difficultyCircleFilled: {
    backgroundColor: '#A0A0A0',
  },
  difficultyCircleActive: {
    backgroundColor: '#007AFF',
  },
  difficultyLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    color: '#282828',
  },
  difficultyLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  postBtn: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  postBtnText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
