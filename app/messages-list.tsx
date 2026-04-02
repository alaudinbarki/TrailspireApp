import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon, EditIcon, SearchIcon } from '../src/components/icons';
import { scaleUniform } from '../src/utils/globalScale';

interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: any;
  unread: boolean;
}

const MESSAGES: Message[] = [
  {
    id: '1',
    name: 'Alejandra Delgado',
    message: "Hey there! Just wanted to drop you a quick message to say hi! Hope you're h...",
    time: '9:41 AM',
    avatar: require('../assets/images/feed/chat_avatar_alejandra.png'),
    unread: true,
  },
  {
    id: '2',
    name: 'Andre & Lorico',
    message: "Nice. I don't know why people get all worked up about hawaiian pizza. I like it.",
    time: '9:36 AM',
    avatar: require('../assets/images/feed/profile_photo2.png'),
    unread: true,
  },
  {
    id: '3',
    name: 'Jenny Court',
    message: '(Sad fact: you cannot search for a gif of the word "gif", just gives you gifs.)',
    time: '9:28 AM',
    avatar: require('../assets/images/feed/profile_photo3.png'),
    unread: false,
  },
  {
    id: '4',
    name: 'Jenica Chong',
    message: "Maybe email isn't the best form of communication.",
    time: '9:20 AM',
    avatar: require('../assets/images/feed/profile_photo1.png'),
    unread: false,
  },
  {
    id: '5',
    name: 'Herland Antezana',
    message: "Tabs make way more sense than spaces. Convince me I'm wrong. LOL.",
    time: '9:00 AM',
    avatar: require('../assets/images/feed/profile_photo2.png'),
    unread: false,
  },
  {
    id: '6',
    name: 'Dee & Po',
    message: "That's what I'm talking about!",
    time: '8:58 AM',
    avatar: require('../assets/images/feed/profile_photo3.png'),
    unread: false,
  },
];

export default function MessagesListScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <BackArrowIcon width={scaleUniform(20)} height={scaleUniform(20)} color="#282828" />
            </TouchableOpacity>

            <View style={styles.searchBar}>
              <SearchIcon width={scaleUniform(18)} height={scaleUniform(18)} color="#8C8C8C" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#8C8C8C"
              />
            </View>

            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
              <EditIcon width={scaleUniform(18)} height={scaleUniform(18)} color="#282828" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Messages List */}
      <ScrollView
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      >
        {MESSAGES.map((msg, index) => (
          <TouchableOpacity
            key={msg.id}
            style={styles.messageRow}
            activeOpacity={0.7}
            onPress={() => router.push('/chat-thread')}
          >
            <View style={styles.avatarContainer}>
              {msg.unread ? <View style={styles.unreadDot} /> : null}
              <Image source={msg.avatar} style={styles.avatar} />
            </View>

            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>{msg.name}</Text>
                <View style={styles.timeWrap}>
                  <Text style={styles.messageTime}>{msg.time}</Text>
                  <Text style={styles.chevronText}>›</Text>
                </View>
              </View>
              <Text style={styles.messageText} numberOfLines={2}>
                {msg.message}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  header: {
    backgroundColor: '#D9D9D9',
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    backgroundColor: '#CFD0D1',
    borderRadius: 15,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SF Pro',
    fontSize: 16,
    color: '#282828',
  },
  filterBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    flex: 1,
    marginTop: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 86,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 12,
    backgroundColor: '#A0A0A0',
  },
  avatarContainer: {
    width: 63,
    height: 74,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 7,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  unreadDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#0088FF',
  },
  messageContent: {
    flex: 1,
    alignSelf: 'stretch',
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    paddingBottom: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 22,
    marginBottom: 2,
  },
  messageName: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    color: '#000000',
    flexShrink: 1,
    paddingRight: 8,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  messageTime: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(60,60,67,0.6)',
  },
  messageText: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(60,60,67,0.6)',
    height: 40,
  },
  chevronText: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 32,
    color: 'rgba(60,60,67,0.3)',
    marginTop: -6,
  },
});
