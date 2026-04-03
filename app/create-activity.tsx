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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
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
  const insets = useSafeAreaInsets();
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

      <View style={[styles.heroPanel, { minHeight: HERO_PANEL_MIN_HEIGHT, paddingTop: Math.max(20, insets.top + 8) }]}>
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
        contentContainerStyle={[
          styles.contentInner,
          {
            paddingHorizontal: CONTENT_HORIZONTAL,
            paddingBottom: Math.max(20, insets.bottom + 16),
          },
        ]}
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
                <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6667 2.80889C11.6667 1.25758 12.9103 0 14.4444 0C15.9785 0 17.2221 1.25758 17.2221 2.80889C17.2221 4.3602 15.9785 5.61779 14.4444 5.61779C12.9103 5.61779 11.6667 4.3602 11.6667 2.80889ZM9.00731 4.41349C9.58056 4.06567 10.3175 4.18019 10.761 4.68601C11.7807 5.84892 13.3428 6.72788 14.9986 7.3164C16.6492 7.9031 18.2361 8.14579 19.1665 8.14579C21.7744 8.14579 23.8886 10.2837 23.8886 12.9209C23.8886 13.9574 23.562 14.9168 23.0072 15.6995C22.8913 15.863 23.0495 16.1151 23.2425 16.0614C23.9821 15.8558 24.7465 16.2953 24.9499 17.0432C25.1533 17.7911 24.7186 18.5641 23.979 18.7698L1.75746 24.9494C1.01788 25.155 0.253449 24.7155 0.0500635 23.9676C-0.153322 23.2197 0.281353 22.4467 1.02094 22.241C1.61515 22.0758 1.72773 21.1587 1.30458 20.71C0.4965 19.8531 0.000350171 18.6927 0.000350171 17.4151C0.000350171 14.7779 2.1145 12.64 4.72244 12.64C7.33037 12.64 9.44452 14.7779 9.44452 17.4151C9.44452 18.3966 10.4416 19.6212 11.3871 19.3583L12.6154 19.0167C14.101 18.6036 14.7119 15.1375 14.4933 13.6111C14.4611 13.3857 14.4444 13.1553 14.4444 12.9209C14.4444 12.3846 14.5318 11.8689 14.6931 11.3876C14.8799 10.83 14.6316 10.1633 14.0775 9.96637C13.4742 9.75196 12.8551 9.49545 12.2445 9.19183C11.4636 8.80356 10.5352 8.74031 9.78706 9.18839C9.52455 9.3456 9.59184 9.73234 9.88852 9.8072C10.0696 9.85289 10.239 9.89765 10.3929 9.94175C11.0829 10.1395 11.842 10.4165 12.4341 10.9974C13.0721 11.6235 13.3428 12.421 13.4488 13.2832C13.5507 14.1129 13.5165 15.1444 13.4228 16.3975C13.3649 17.1709 12.698 17.7505 11.9332 17.692C11.1683 17.6336 10.5952 16.9592 10.653 16.1857C10.7458 14.9438 10.757 14.1569 10.6922 13.6295C10.6325 13.1429 10.527 13.0399 10.5009 13.0145L10.4997 13.0132C10.4299 12.9448 10.2443 12.8186 9.63564 12.6442C9.28067 12.5425 8.90474 12.4543 8.44392 12.3461C8.0803 12.2607 7.66383 12.1629 7.1631 12.0363C6.54241 11.8794 5.99524 11.6859 5.54256 11.4372C5.09637 11.1921 4.64979 10.8425 4.3676 10.3289C3.70421 9.12138 4.37219 8.01143 4.8425 7.44932C5.35632 6.8352 6.10091 6.27164 6.80415 5.79452C7.4462 5.35891 8.15074 4.93228 8.77675 4.5532C8.85492 4.50586 8.93186 4.45927 9.00731 4.41349ZM19.1665 10.9547C18.0926 10.9547 17.2221 11.835 17.2221 12.9209C17.2221 14.0068 18.0926 14.8871 19.1665 14.8871C20.2403 14.8871 21.1109 14.0068 21.1109 12.9209C21.1109 11.835 20.2403 10.9547 19.1665 10.9547ZM4.72244 15.4489C3.64858 15.4489 2.77805 16.3292 2.77805 17.4151C2.77805 18.5011 3.64858 19.3814 4.72244 19.3814C5.79629 19.3814 6.66683 18.5011 6.66683 17.4151C6.66683 16.3292 5.79629 15.4489 4.72244 15.4489ZM24.9411 21.5063C25.1615 22.2492 24.7446 23.0322 24.0099 23.2551L18.4545 24.9404C17.7198 25.1633 16.9455 24.7417 16.7251 23.9987C16.5047 23.2558 16.9216 22.4729 17.6563 22.25L23.2117 20.5646C23.9464 20.3417 24.7207 20.7633 24.9411 21.5063Z"
                    fill="#007AFF"
                  />
                </Svg>
              </View>
              <Text style={styles.activityCardType}>{'Gravel\nCycling'}</Text>
              <View style={styles.activityCardFooter}>
                <Text style={styles.activityCardDistance}>87 km</Text>
                <View style={styles.routeIconBtn}>
                  <Svg width={17} height={24} viewBox="0 0 17 24" fill="none">
                    <Path
                      d="M11.6939 18.6504L10.6124 17.5806C10.3117 17.2833 10.0544 16.9476 9.85122 16.5877L9.55763 16.0677C9.26668 15.5524 8.80018 15.1309 8.26061 14.896C7.88974 14.7345 7.55004 14.4833 7.27818 14.1696L6.38262 13.1361C5.99588 12.6898 5.56381 12.2819 5.09008 11.9298C4.26011 11.3129 3.1636 10.5109 3.14052 10.4799C3.10945 10.438 3.49515 9.22521 2.92412 8.92795C2.35309 8.63069 3.86781 8.09987 3.86781 8.09987C3.86781 8.09987 7.46828 7.33549 8.00324 7.37409C8.10028 7.38109 8.18199 7.34065 8.25074 7.26975C8.83968 6.66237 9.33751 5.19014 8.42698 4.71616C8.37159 4.68732 8.30578 4.65532 8.2321 4.62105C6.90622 4.00423 5.69898 3.05621 4.39373 2.37675C3.53718 1.93087 4.32159 1.85946 4.23143 1.21283C4.17246 0.789965 2.72778 0.580787 1.62114 0.499884C1.19711 0.468883 0.836976 0.658389 0.64591 0.988507C0.436646 1.35007 0.458927 1.83482 0.704829 2.27036L1.03257 2.85085C1.25023 3.23638 1.55381 3.57911 1.90767 3.86095C3.15991 4.85831 4.96128 6.447 5.06095 7.16178C5.17636 7.98946 5.28937 8.7999 5.33145 9.10166C5.46521 10.0609 6.10759 10.9837 7.01363 11.5181L7.08673 11.5612C7.21471 11.6367 7.34623 11.7039 7.48024 11.7623L8.6885 12.2884C8.97401 12.4371 10.8133 14.2341 10.9726 13.4774C11.0211 13.2472 11.1502 13.1848 11.3029 13.2031C11.5547 13.2333 12.5614 13.8959 12.7903 14.0465C12.8694 14.0985 12.9243 14.1817 12.9363 14.2676L13.0341 14.9691C13.0866 15.3451 12.9992 15.6981 12.7884 15.9623L12.6296 16.1613C12.5034 16.3194 12.4059 16.5004 12.3404 16.6984L11.6939 18.6504ZM11.6939 18.6504L11.748 19.0384M11.748 19.0384L13.0343 20.6675C13.2881 21.0357 13.1065 21.1848 13.1606 21.5728C13.2147 21.9608 16.5326 22.9683 15.7302 22.9104C15.6715 22.9062 15.6087 22.9037 15.5428 22.9028C14.0733 22.8819 12.5996 22.8229 11.1033 22.5863C11.03 22.5748 10.9665 22.5667 10.9156 22.563C10.7226 22.5491 10.6548 22.4443 10.6469 22.316C10.6231 21.9289 10.7782 21.5781 10.7238 21.1876L10.6579 20.7151C10.5949 20.2632 10.797 19.8697 11.1785 19.7015L11.4745 19.5709C11.6749 19.4825 11.7811 19.2758 11.748 19.0384Z"
                      stroke="#007AFF"
                    />
                  </Svg>
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
              <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" style={styles.pencilIcon}>
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4688 1.57035L18.4744 2.5647L22.0099 6.10024L23.0043 5.10589C23.4314 4.67875 23.4314 3.98623 23.0043 3.55909L21.0155 1.57035C20.5884 1.14322 19.8959 1.14322 19.4688 1.57035ZM1.95689 19.0822L17.5905 3.44859L21.1261 6.98412L5.49243 22.6177C5.31292 22.7973 5.07657 22.9087 4.82388 22.9331L1.30244 23.2722L1.64158 19.7508C1.66592 19.4981 1.77739 19.2617 1.95689 19.0822ZM1.07301 18.1983C0.688359 18.583 0.449484 19.0895 0.397337 19.6309L0.00368794 23.7184C-0.0434087 24.2074 0.367204 24.6181 0.856234 24.571L4.94371 24.1773C5.48519 24.1252 5.99166 23.8863 6.37631 23.5016L23.8882 5.98977C24.8035 5.07448 24.8035 3.5905 23.8882 2.67521L21.8994 0.686468C20.9841 -0.228823 19.5002 -0.228823 18.5849 0.686469L1.07301 18.1983ZM4.77421 20.6843L17.6458 7.81278C17.8898 7.56871 17.8898 7.17298 17.6458 6.9289C17.4017 6.68482 17.006 6.68482 16.7619 6.9289L3.89033 19.8005C3.64625 20.0445 3.64625 20.4403 3.89033 20.6843C4.13441 20.9284 4.53013 20.9284 4.77421 20.6843Z"
                  fill="#F5F5F5"
                />
              </Svg>
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
