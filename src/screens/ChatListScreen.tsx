import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, STEALTH_COLORS, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';

const MOCK_CHATS_DATA = [
    { id: 1, name: 'Alpha Squad', unread: 2, lastMessage: 'Sitrep @ 0600. Over.', timestamp: '10:42', typing: false, category: 'OPERATIONAL' },
    { id: 2, name: 'CO HQ', unread: 3, lastMessage: 'Orders received. Standby.', timestamp: '09:15', typing: false, category: 'OPERATIONAL' },
    { id: 4, name: 'R. Sharma', lastMessage: 'Roger that.', timestamp: 'Mon', typing: false, category: 'OPERATIONAL' },
    { id: 5, name: 'V. Patel', lastMessage: 'Acknowledged.', timestamp: 'Sun', typing: false, category: 'OPERATIONAL' },
    { id: 3, name: 'Home Base', unread: 1, lastMessage: 'ETA for dinner?', timestamp: 'Yesterday', typing: false, category: 'FAMILY & PERSONAL' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'ChatList'>;

const ChatListScreen = ({ navigation }: Props) => {
  const [chats, setChats] = useState(MOCK_CHATS_DATA);
  const { isStealthMode } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  useEffect(() => {
    const interval = setInterval(() => {
      setChats(currentChats =>
        currentChats.map(chat =>
          (chat.id === 5 ? { ...chat, typing: !chat.typing } : chat)
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const operationalChats = chats.filter(c => c.category === 'OPERATIONAL');
  const familyChats = chats.filter(c => c.category === 'FAMILY & PERSONAL');
  const sections = [
      { title: 'OPERATIONAL', data: operationalChats },
      { title: 'FAMILY & PERSONAL', data: familyChats },
  ];

  const renderChatItem = ({ item }: { item: typeof MOCK_CHATS_DATA[0] }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id, chatName: item.name })}
    >
      <Image source={require('../assets/images/person-logo.png')} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={[styles.chatName, { color: activeColors.text }]}>{item.name}</Text>
        <Text style={[styles.lastMessage, { color: activeColors.textSecondary }]} numberOfLines={1}>
          {item.typing ? 'typing...' : item.lastMessage}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={[styles.timestamp, { color: activeColors.textSecondary }]}>{item.timestamp}</Text>
        { (item.unread && item.unread > 0) && (
          <View style={[styles.unreadBadge, { backgroundColor: activeColors.accent }]}>
            <Text style={[styles.unreadText, { color: activeColors.background }]}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeColors.background }]}>
      <View style={styles.container}>
        <View style={[styles.header, { borderBottomColor: activeColors.surface }]}>
          <Text style={[styles.headerTitle, { color: activeColors.text }]}>SEC-COM</Text>
          {isStealthMode && <Text style={[styles.stealthBadge, { color: activeColors.accent, backgroundColor: activeColors.primary }]}>STEALTH ACTIVE</Text>}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/images/person-logo.png')} style={styles.profileAvatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Missions..."
            placeholderTextColor={activeColors.textSecondary}
            style={[styles.searchInput, { backgroundColor: activeColors.surface, color: activeColors.text }]}
          />
        </View>
        
        {isStealthMode ? (
            <SectionList
                sections={sections}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.sectionHeader, { color: activeColors.textSecondary, backgroundColor: activeColors.surface }]}>{title}</Text>
                )}
                ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: activeColors.surface }]} />}
            />
        ) : (
            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: activeColors.surface }]} />}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.padding, borderBottomWidth: 1 },
    headerTitle: { ...FONTS.h2, fontWeight: 'bold' },
    stealthBadge: { ...FONTS.body, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4, overflow: 'hidden' },
    profileAvatar: { width: 40, height: 40, borderRadius: 20 },
    searchContainer: { padding: SIZES.padding },
    searchInput: { padding: SIZES.padding / 1.5, borderRadius: SIZES.radius, ...FONTS.body },
    chatItem: { flexDirection: 'row', alignItems: 'center', padding: SIZES.padding },
    avatar: { width: 55, height: 55, borderRadius: 30, marginRight: SIZES.padding, backgroundColor: COLORS.surface },
    chatInfo: { flex: 1 },
    chatName: { ...FONTS.h3, fontWeight: '600' },
    lastMessage: { ...FONTS.body, paddingTop: 4 },
    chatMeta: { alignItems: 'flex-end' },
    timestamp: { ...FONTS.body, fontSize: 12 },
    unreadBadge: { borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginTop: 5 },
    unreadText: { fontWeight: 'bold', fontSize: 12 },
    separator: { height: 1, width: '100%' },
    sectionHeader: { ...FONTS.body, fontWeight: 'bold', padding: SIZES.padding, letterSpacing: 1 }
});

export default ChatListScreen;