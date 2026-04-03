import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewCollectionVariantScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);

  return (
    <View style={styles.backdrop}>
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => router.back()} />

      {/* Behind: Activity photo preview (dimmed) */}
      <View style={styles.behindPreview}>
        <Image source={require('../assets/images/feed/activity_skiing_card.png')} style={styles.previewImage} />
      </View>

      <TouchableOpacity style={styles.dismissArea2} activeOpacity={1} onPress={() => router.back()} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <SafeAreaView style={[styles.sheet, { paddingBottom: Math.max(20, insets.bottom + 12) }]} edges={['top', 'bottom']}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>New Collection</Text>

          {/* Name field */}
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Collection name"
              placeholderTextColor="#666"
              autoFocus
            />
          </View>

          {/* Toggle: Make private */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Make private</Text>
              <Text style={styles.toggleDesc}>Only you can see this collection</Text>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: '#3A3A3A', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Toggle: Collaborative */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Collaborative</Text>
              <Text style={styles.toggleDesc}>Allow others to add to this collection</Text>
            </View>
            <Switch
              value={isCollaborative}
              onValueChange={setIsCollaborative}
              trackColor={{ false: '#3A3A3A', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Invite link */}
          {isCollaborative && (
            <TouchableOpacity style={styles.inviteRow} activeOpacity={0.7} onPress={() => router.push('/friends-grid')}>
              <Text style={styles.inviteText}>Invite</Text>
              <Text style={styles.inviteChevron}>›</Text>
            </TouchableOpacity>
          )}

          {/* Create button */}
          <TouchableOpacity
            style={[styles.createBtn, !name.trim() && styles.createBtnDisabled]}
            activeOpacity={0.7}
            onPress={() => { if (name.trim()) router.back(); }}
          >
            <Text style={styles.createBtnText}>Create Collection</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  dismissArea: { height: 60 },
  behindPreview: { height: 180, opacity: 0.3 },
  previewImage: { width: '100%', height: '100%' },
  dismissArea2: { flex: 1 },
  keyboardView: { justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#282828', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontFamily: 'Inter', fontSize: 20, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 24 },
  field: { marginBottom: 20 },
  label: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: '#A0A0A0', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#3A3A3A', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontFamily: 'Inter', fontSize: 16, color: '#FFFFFF' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.1)' },
  toggleLabel: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  toggleDesc: { fontFamily: 'Inter', fontSize: 12, color: '#A0A0A0', marginTop: 2 },
  inviteRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  inviteText: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#007AFF' },
  inviteChevron: { fontSize: 22, color: '#007AFF' },
  createBtn: { backgroundColor: '#007AFF', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  createBtnDisabled: { opacity: 0.4 },
  createBtnText: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
