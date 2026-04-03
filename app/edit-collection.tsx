import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

export default function EditCollectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Skitouring Switzerland');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(true);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(24, insets.bottom + 12) }]}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => router.back()}>
              <BackArrowIcon width={20} height={20} color="#282828" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Collection</Text>
            <TouchableOpacity style={styles.doneBtnWrap} activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={styles.doneBtn}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coverSection}>
            <Image source={require('../assets/images/feed/edit_collection_cover.png')} style={styles.coverImage} />
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
              <Text style={styles.updateCoverText}>Update cover photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.nameBlock}>
            <Text style={styles.nameLabel}>Name</Text>
            <View style={styles.nameInputWrap}>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Collection name"
                placeholderTextColor="#6B6B6B"
              />
            </View>
          </View>

          <View style={styles.optionRow}>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>Make private</Text>
              <Text style={styles.optionSub}>Only you will see this collection</Text>
            </View>
            <TouchableOpacity
              style={styles.toggleTrack}
              activeOpacity={0.8}
              onPress={() => setIsPrivate((prev) => !prev)}
            >
              <View style={[styles.toggleKnob, isPrivate && styles.toggleKnobOn]} />
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>Collaborative</Text>
              <Text style={styles.optionSub}>Invite your friends</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggleButton, isCollaborative && styles.toggleButtonActive]}
              activeOpacity={0.8}
              onPress={() => setIsCollaborative((prev) => !prev)}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  isCollaborative ? styles.toggleButtonTextActive : styles.toggleButtonTextInactive,
                ]}
              >
                Invite
              </Text>
            </TouchableOpacity>
          </View>

          {/* {isCollaborative && (
            <TouchableOpacity style={styles.inviteRow} activeOpacity={0.7} onPress={() => router.push('/friends-grid')}>
              <Text style={styles.inviteText}>Invite</Text>
              <Text style={styles.inviteChevron}>›</Text>
            </TouchableOpacity>
          )} */}

          <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={styles.deleteBtnText}>Delete Collection</Text>
          </TouchableOpacity>
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
  scrollContent: {},
  panel: {
    minHeight: 852,
    backgroundColor: '#282828',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#F2F2F2',
  },
  doneBtnWrap: {
    width: 76,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtn: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '500',
    color: '#282828',
  },
  coverSection: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  coverImage: {
    width: 67.04,
    height: 67.04,
    borderRadius: 20,
  },
  updateCoverText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
    maxWidth: 222,
  },
  nameBlock: {
    marginTop: 18,
  },
  nameLabel: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#6B6B6B',
    marginBottom: 8,
  },
  nameInputWrap: {
    width: '100%',
    height: 49,
    borderRadius: 15,
    backgroundColor: '#353535',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  nameInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#B8B8B8',
    paddingVertical: 0,
  },
  optionRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#F2F2F2',
  },
  optionSub: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
    marginTop: 3,
  },
  toggleTrack: {
    width: 76,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#353535',
    flexShrink: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleKnob: {
    width: 38,
    height: 34,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignSelf: 'flex-start',
  },
  toggleKnobOn: {
    alignSelf: 'flex-end',
  },
  toggleButton: {
    width: 76,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#353535',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#353535',
  },
  toggleButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#F2F2F2',
  },
  toggleButtonTextInactive: {
    color: '#6B6B6B',
  },
  inviteRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#F2F2F2',
  },
  inviteChevron: {
    fontSize: 20,
    color: '#CFD0D1',
    marginRight: 2,
  },
  deleteBtn: {
    marginTop: 240,
    width: 183,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#353535',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#D92121',
  },
});
