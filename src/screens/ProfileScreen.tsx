import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, STEALTH_COLORS, FONTS, SIZES } from '../constants/theme';
import { AppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/AppNavigator';

const SettingRow = ({ label, isToggle = false, value, onToggle }: {
  label: string;
  isToggle?: boolean;
  value?: boolean;
  onToggle?: () => void;
}) => {
  const { isStealthMode } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  return (
    <View style={[styles.settingRow, { backgroundColor: activeColors.surface }]}>
      <Text style={[styles.settingLabel, { color: activeColors.text }]}>{label}</Text>
      {isToggle ? (
        <TouchableOpacity
          style={[styles.toggleContainer, value ? { backgroundColor: activeColors.success } : { backgroundColor: activeColors.background }]}
          onPress={onToggle}
        >
          <View style={[
            styles.toggleCircle,
            value ? { transform: [{ translateX: 20 }], backgroundColor: activeColors.text } : { backgroundColor: activeColors.textSecondary }
          ]} />
        </TouchableOpacity>
      ) : (
        <Text style={[styles.arrow, { color: activeColors.textSecondary }]}>›</Text>
      )}
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
  const { isStealthMode, toggleStealthMode, performCheckIn, toggleChameleonMode, triggerBurnNotice } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: activeColors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: activeColors.text }]}>‹</Text>
        </TouchableOpacity>
        
        <View>
          <Text style={[styles.headerTitle, { color: activeColors.text }]}>HQ</Text>
          <TouchableOpacity 
            onPress={toggleChameleonMode}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/person-logo.png')}
            style={[styles.profileImage, { borderColor: activeColors.primary }]}
          />
          <Text style={[styles.profileName, { color: activeColors.text }]}>Major Vikram Singh</Text>
          <Text style={[styles.profileCallsign, { color: activeColors.accent }]}>CALLSIGN: VIPER</Text>
        </View>

        <View style={styles.settingsContainer}>
            <Text style={[styles.sectionHeader, { color: activeColors.textSecondary }]}>OPERATIONS</Text>
            <TouchableOpacity 
              style={[styles.checkInButton, { backgroundColor: activeColors.success }]}
              onPress={performCheckIn}
              onLongPress={triggerBurnNotice}
            >
              <Text style={[styles.checkInButtonText, { color: activeColors.background }]}>OPERATOR CHECK-IN</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionHeader, { color: activeColors.textSecondary }]}>PROFILE</Text>
            <SettingRow label="Edit Profile" />
            <SettingRow label="Status & Availability" />

            <Text style={[styles.sectionHeader, { color: activeColors.textSecondary }]}>COMMS</Text>
            <SettingRow label="Stealth Mode" isToggle value={isStealthMode} onToggle={toggleStealthMode} />
            <SettingRow label="Audio Alerts" isToggle value={true} />

            <Text style={[styles.sectionHeader, { color: activeColors.textSecondary }]}>SECURITY</Text>
            <SettingRow label="Encryption Keys" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingBottom: SIZES.padding * 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    borderBottomWidth: 1,
  },
  backButton: { width: 40, alignItems: 'flex-start' },
  backButtonText: { fontSize: 36, fontWeight: '200' },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold' },
  profileSection: { alignItems: 'center', marginVertical: SIZES.padding * 2 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 3 },
  profileName: { ...FONTS.h2, marginTop: SIZES.padding },
  profileCallsign: { ...FONTS.h3, letterSpacing: 2, marginTop: SIZES.base },
  settingsContainer: { paddingHorizontal: SIZES.padding },
  sectionHeader: { ...FONTS.body, fontWeight: 'bold', marginVertical: SIZES.padding, letterSpacing: 1 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  settingLabel: { ...FONTS.h3 },
  arrow: { ...FONTS.h1 },
  toggleContainer: { width: 50, height: 30, borderRadius: 15, justifyContent: 'center', padding: 2 },
  toggleCircle: { width: 26, height: 26, borderRadius: 13 },
  checkInButton: {
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  checkInButtonText: {
    ...FONTS.h3,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;