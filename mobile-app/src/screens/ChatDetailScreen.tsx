import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, STEALTH_COLORS, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';
import { MOCK_DEVICE_FINGERPRINT, generateDnaKey, encryptWithDnaKey } from '../utils/cryptoSim';
import { checkOpsecViolation } from '../utils/opsecScanner';
import { generateBlockchainTrail } from '../utils/blockchainSim';

// --- MOCK DATA ---
const MOCK_MESSAGES: { [key: number]: any[] } = {
  1: [
    { id: 'm4', sender: 'You', text: 'Copy that. Standing by for confirmation.', time: '10:02 AM', status: 'read' },
    { id: 'm3', sender: 'Raaj Sharma', text: 'Roger that. Reinforcements en route. ETA 15 minutes.', time: '10:01 AM' },
    { id: 'm2', sender: 'You', text: 'Requesting immediate backup.', time: '10:00 AM', status: 'read', expiresIn: 10 },
    { id: 'm1', sender: 'Raaj Sharma', text: 'Situation report: Enemy forces spotted near the border.', time: '09:59 AM' },
  ],
  2: [
    { id: 'hq3', sender: 'You', text: 'Acknowledged, command. Moving to secure the data.', time: '09:17 AM', status: 'read' },
    { id: 'hq2', sender: 'CO HQ', text: 'Priority one is to ensure data integrity. Do not engage unless necessary. Over.', time: '09:16 AM' },
    { id: 'hq1', sender: 'CO HQ', text: 'Orders received. Standby.', time: '09:15 AM' },
  ],
  3: [{ id: 'm1', sender: 'Home Base', text: 'ETA for dinner?', time: 'Yesterday' }],
  4: [{ id: 'm1', sender: 'R. Sharma', text: 'Roger that.', time: 'Mon' }],
  5: [{ id: 'm1', sender: 'V. Patel', text: 'Acknowledged.', time: 'Sun' }],
};

// --- TimeLockModal Component ---
const TimeLockModal = ({ visible, onSelect, onCancel, activeColors }: {
    visible: boolean;
    onSelect: (duration: number) => void;
    onCancel: () => void;
    activeColors: typeof COLORS;
}) => (
    <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.surface }]}>
                <Text style={[styles.modalTitle, { color: activeColors.text }]}>Set Time-Lock Duration</Text>
                {[15, 30, 60].map(duration => (
                    <TouchableOpacity key={duration} style={[styles.modalButton, { borderColor: activeColors.primary }]} onPress={() => onSelect(duration)}>
                        <Text style={{ color: activeColors.text }}>{duration} Seconds</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={[styles.modalButton, { borderColor: activeColors.danger, marginTop: 15 }]} onPress={onCancel}>
                    <Text style={{ color: activeColors.danger }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);


// --- MessageBubble Component ---
const MessageBubble = ({ item, activeColors }: { item: any, activeColors: typeof COLORS }) => {
  const { showAlert, hideAlert, lastCheckInTime } = useContext(AppContext);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(item.timeLockDuration || 0);
  const isTimeLocked = timeLeft > 0;

  useEffect(() => {
    if (item.expiresIn) {
      const timer = setTimeout(() => setIsExpired(true), item.expiresIn * 1000);
      return () => clearTimeout(timer);
    }
  }, [item.expiresIn]);

  useEffect(() => {
    if (item.timeLockDuration) {
      const interval = setInterval(() => {
        setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [item.timeLockDuration]);

  useEffect(() => {
    if (item.timeLockDuration && item.sender === 'You') {
      setTimeLeft(item.timeLockDuration);
    }
  }, [lastCheckInTime]);

  const handleLongPress = () => {
    if (!item.text || isTimeLocked) return;
    const dnaKey = generateDnaKey(MOCK_DEVICE_FINGERPRINT);
    const ciphertext = encryptWithDnaKey(item.text, dnaKey);
    const messageDetails = `Device Fingerprint:\n${MOCK_DEVICE_FINGERPRINT}\n\nGenerated DNA Key:\n${dnaKey}\n\nCiphertext:\n${ciphertext}`;
    showAlert('DNA Encryption Details', messageDetails, false, hideAlert);
  };

  const handleVerifyOnLedger = () => {
    const trail = generateBlockchainTrail(item);
    const formattedTrail = trail.map(block => `Block #${block.blockNumber}\nData: ${block.data}\nHash: ${block.hash}\nPrev Hash: ${block.previousHash}\n------------------`).join('\n');
    showAlert('Command Chain Verification', formattedTrail, false, hideAlert);
  };

  if (isTimeLocked) {
    return (
        <View style={[styles.messageBubble, styles.myMessage, { backgroundColor: activeColors.surface, borderColor: activeColors.accent, borderWidth: 1 }]}>
            <Text style={[styles.timerText, { color: activeColors.accent, fontSize: 14, marginBottom: 8 }]}>🔒 MESSAGE TIME-LOCKED</Text>
            <Text style={[styles.timerText, { color: activeColors.text, fontSize: 18, fontWeight: 'bold' }]}>{timeLeft}s</Text>
            <Text style={[styles.timerText, { color: activeColors.textSecondary, marginTop: 4 }]}>until message is revealed</Text>
            <Text style={[styles.messageTime, { color: activeColors.textSecondary, marginTop: 8 }]}>{item.time}</Text>
        </View>
    );
  }

  if (isExpired) {
    return ( <View style={[styles.messageBubble, styles.myMessage, { backgroundColor: activeColors.surface }]}><Text style={[styles.expiredText, { color: activeColors.textSecondary }]}>Message Expired</Text></View> );
  }

  const isMyMessage = item.sender === 'You';
  return (
    <TouchableOpacity onLongPress={handleLongPress} activeOpacity={0.7}>
      <View style={[styles.messageBubble, isMyMessage ? [styles.myMessage, { backgroundColor: activeColors.primary }] : [styles.theirMessage, { backgroundColor: activeColors.surface }]]}>
        {!isMyMessage && <Text style={[styles.senderName, { color: activeColors.accent }]}>{item.sender}</Text>}
        {item.expiresIn && <Text style={[styles.timerText, { color: activeColors.accent }]}>⏳ Disappears in {item.expiresIn}s</Text>}
        <Text style={[styles.messageText, { color: activeColors.text }]}>{item.text}</Text>
        <View style={styles.messageInfo}>
          {item.sender === 'CO HQ' && ( <TouchableOpacity onPress={handleVerifyOnLedger} style={[styles.verifyButton, { borderColor: activeColors.accent }]}><Text style={[styles.verifyButtonText, { color: activeColors.accent }]}>Verify on Ledger</Text></TouchableOpacity> )}
          <Text style={[styles.messageTime, { color: activeColors.textSecondary }]}>{item.time}</Text>
          {isMyMessage && item.status && ( <Text style={{color: item.status === 'read' ? activeColors.accent : activeColors.textSecondary, marginLeft: 5, fontWeight: 'bold'}}>{item.status === 'read' ? '✓✓' : '✓'}</Text> )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDetail'>;

const ChatDetailScreen = ({ navigation, route }: Props) => {
  const { chatId, chatName } = route.params;
  const { showAlert, hideAlert, isStealthMode } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  const [messages, setMessages] = useState(MOCK_MESSAGES[chatId] || []);
  const [inputText, setInputText] = useState('');
  const [disappearingEnabled, setDisappearingEnabled] = useState(false);
  const [opsecWarning, setOpsecWarning] = useState<string | null>(null);
  const [isTimeLockModalVisible, setTimeLockModalVisible] = useState(false);

  useEffect(() => {
    const result = checkOpsecViolation(inputText);
    if (result.hasViolation) {
      setOpsecWarning(result.suggestion || null);
    } else {
      setOpsecWarning(null);
    }
  }, [inputText]);

  const handleAttachment = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({});
        if (result.canceled) {
            return;
        }
        if (result.assets && result.assets[0]) {
            const file = result.assets[0];
            if (file.name.endsWith('.exe') || file.name.endsWith('.dll')) { showAlert('MALWARE DETECTED', `The file "${file.name}" is a high-risk executable and has been blocked.`, true, () => hideAlert()); return; }
            const newMessage = { id: `file-${Date.now()}`, sender: 'You', text: `File attached: ${file.name}`, file: file, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'sent' };
            setMessages(prev => [newMessage, ...prev]);
        }
    } catch (error) {
        console.error("Error picking document:", error);
        showAlert('Error', 'Could not open file picker.', false, hideAlert);
    }
  };

  const handleSend = (timeLockDuration?: number) => {
    if (opsecWarning) { showAlert('OPSEC VIOLATION', 'Your message may contain sensitive information. Please revise before sending.', false, hideAlert); return; }
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: `msg-${Date.now()}`, sender: 'You', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'sent',
      ...(disappearingEnabled && { expiresIn: 15 }),
      ...(timeLockDuration && { timeLockDuration }),
    };
    setMessages(prev => [newMessage, ...prev]); setInputText('');
    if (!timeLockDuration) {
        setTimeout(() => { setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)); }, 1000);
        setTimeout(() => { setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)); }, 2500);
    }
  };

  const onTimeLockSelect = (duration: number) => {
    if (inputText.trim().length === 0) { showAlert('Cannot Send', 'Please type a message before setting a time-lock.', false, hideAlert); setTimeLockModalVisible(false); return; }
    handleSend(duration); setTimeLockModalVisible(false);
  };
  
  const handleCall = (type: 'Voice' | 'Video') => {
    showAlert('Calling...', `${type} call to ${chatName} initiated.`, true);
    setTimeout(() => { showAlert('Connecting...', `Establishing secure quantum-tunnel...`, true); }, 2000);
    setTimeout(() => { showAlert('Call Connected', `Secure line established. Duration: 00:01`, false, () => hideAlert()); }, 4000);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeColors.background }]}>
      <TimeLockModal visible={isTimeLockModalVisible} onSelect={onTimeLockSelect} onCancel={() => setTimeLockModalVisible(false)} activeColors={activeColors} />
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} >
        <View style={[styles.header, { borderBottomColor: activeColors.surface }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Text style={[styles.backButtonText, { color: activeColors.text }]}>‹</Text></TouchableOpacity>
            <View style={styles.headerTitleContainer}>
                <Text style={[styles.headerTitle, { color: activeColors.text }]}>{chatName}</Text>
                <View style={styles.encryptionStatus}>
                    <Image source={require('../assets/images/lock-icon.png')} style={[styles.lockIcon, { tintColor: activeColors.success }]} />
                    <Text style={[styles.encryptionText, { color: activeColors.success }]}>Quantum Encrypted</Text>
                </View>
            </View>
             <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => handleCall('Voice')}><Image source={require('../assets/images/phone-icon.png')} style={[styles.headerIcon, { tintColor: activeColors.text }]} /></TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall('Video')}><Image source={require('../assets/images/video-icon.png')} style={[styles.headerIcon, { tintColor: activeColors.text, marginLeft: 20 }]} /></TouchableOpacity>
             </View>
        </View>
        <FlatList data={messages} renderItem={({ item }) => <MessageBubble item={item} activeColors={activeColors} />} keyExtractor={(item) => item.id} style={styles.messageList} inverted />
        {opsecWarning && ( <View style={[styles.opsecBanner, { backgroundColor: activeColors.accent }]}><Text style={[styles.opsecText, { color: activeColors.background }]}>{opsecWarning}</Text></View> )}
        <View style={[styles.inputContainer, { borderTopColor: activeColors.surface, backgroundColor: activeColors.background }]}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setTimeLockModalVisible(true)}><Text style={{fontSize: 24}}>🕰️</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setDisappearingEnabled(!disappearingEnabled)}><Text style={{fontSize: 24}}>{disappearingEnabled ? '⏳' : '⌛'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleAttachment}><Image source={require('../assets/images/paperclip-icon.png')} style={[styles.icon, { tintColor: activeColors.textSecondary }]} /></TouchableOpacity>
            <TextInput style={[styles.textInput, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: opsecWarning ? activeColors.danger : activeColors.surface, borderWidth: 2, }]} value={inputText} onChangeText={setInputText} placeholder="Type message..." placeholderTextColor={activeColors.textSecondary} />
             <TouchableOpacity style={[styles.sendButton, { backgroundColor: activeColors.primary }]} onPress={() => handleSend()}><Text style={[styles.sendButtonText, { color: activeColors.text }]}>SEND</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    keyboardAvoidingView: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SIZES.base, paddingHorizontal: SIZES.padding, borderBottomWidth: 1, },
    backButton: { width: 40, alignItems: 'flex-start' },
    backButtonText: { fontSize: 36, fontWeight: '200' },
    headerTitleContainer: { flex: 1, alignItems: 'center' },
    headerTitle: { ...FONTS.h3, fontWeight: 'bold' },
    encryptionStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    lockIcon: { width: 12, height: 12, marginRight: 5 },
    encryptionText: { ...FONTS.body, fontSize: 12 },
    headerIcons: { flexDirection: 'row' },
    headerIcon: { width: 24, height: 24 },
    messageList: { flex: 1, paddingHorizontal: SIZES.padding },
    messageBubble: { maxWidth: '80%', padding: SIZES.padding / 1.5, borderRadius: SIZES.radius, marginBottom: SIZES.padding, marginTop: 5 },
    myMessage: { alignSelf: 'flex-end' },
    theirMessage: { alignSelf: 'flex-start' },
    senderName: { ...FONTS.body, fontWeight: 'bold', marginBottom: 4 },
    messageText: { ...FONTS.body, fontSize: 16 },
    messageInfo: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginTop: 8 },
    messageTime: { fontSize: 12 },
    timerText: { fontSize: 10, fontStyle: 'italic', marginBottom: 4, alignSelf: 'flex-start', textAlign: 'center', width: '100%' },
    expiredText: { fontStyle: 'italic' },
    inputContainer: { flexDirection: 'row', padding: SIZES.padding, borderTopWidth: 1, alignItems: 'center' },
    textInput: { flex: 1, borderRadius: 20, paddingVertical: 10, paddingHorizontal: SIZES.padding },
    iconButton: { paddingHorizontal: SIZES.base },
    icon: { width: 24, height: 24 },
    sendButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, marginLeft: SIZES.base },
    sendButtonText: { ...FONTS.body, fontWeight: 'bold' },
    opsecBanner: { padding: SIZES.base, marginHorizontal: SIZES.padding, marginBottom: SIZES.base / 2, borderRadius: SIZES.radius / 2, },
    opsecText: { ...FONTS.body, fontSize: 12, textAlign: 'center', fontWeight: 'bold', },
    verifyButton: { borderWidth: 1, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 6, marginRight: 8, },
    verifyButtonText: { fontSize: 10, fontWeight: 'bold', },
    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '80%', padding: SIZES.padding, borderRadius: SIZES.radius, alignItems: 'center', borderWidth: 1 },
    modalTitle: { ...FONTS.h3, marginBottom: SIZES.padding, fontWeight: 'bold' },
    modalButton: { width: '100%', borderWidth: 1, borderRadius: SIZES.radius, padding: SIZES.padding, marginVertical: SIZES.base / 2, alignItems: 'center' },
});

export default ChatDetailScreen;