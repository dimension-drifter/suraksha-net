import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { COLORS, STEALTH_COLORS, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [loginStep, setLoginStep] = useState<'form' | 'securing' | 'success'>('form');
  const { isStealthMode } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  const handleAuthentication = () => {
    setLoginStep('securing');
    setTimeout(() => {
      setLoginStep('success');
    }, 2500); // Simulate securing delay
  };

  const onSuccessAnimationFinish = () => {
    navigation.replace('ChatList'); // Use replace to prevent going back to login
  };

  if (loginStep === 'securing') {
    return (
      <View style={[styles.safeArea, styles.centered, { backgroundColor: activeColors.background }]}>
        <LottieView
          source={require('../assets/secure-animation.json')}
          autoPlay
          loop={true}
          style={styles.animation}
        />
        <Text style={[styles.authText, { color: activeColors.accent }]}>ESTABLISHING SECURE CHANNEL...</Text>
      </View>
    );
  }

  if (loginStep === 'success') {
    return (
      <View style={[styles.safeArea, styles.centered, { backgroundColor: activeColors.background }]}>
        <LottieView
          source={require('../assets/success-animation.json')}
          autoPlay
          loop={false}
          style={styles.animation}
          onAnimationFinish={onSuccessAnimationFinish}
        />
        <Text style={[styles.authText, { color: activeColors.success }]}>AUTHENTICATION SUCCESSFUL</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeColors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/army-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Operator ID"
            placeholderTextColor={activeColors.textSecondary}
            style={[styles.input, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.primary }]}
          />
          <TextInput
            placeholder="Passcode"
            placeholderTextColor={activeColors.textSecondary}
            style={[styles.input, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.primary }]}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: activeColors.primary }]} onPress={handleAuthentication}>
            <Text style={[styles.primaryButtonText, { color: activeColors.text }]}>AUTHENTICATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: SIZES.padding * 2, justifyContent: 'space-between' },
  header: { alignItems: 'center', flex: 2, justifyContent: 'center' },
  logo: { width: 120, height: 120, marginBottom: SIZES.padding * 2 },
  title: { ...FONTS.h1, letterSpacing: 5, fontWeight: 'bold' },
  subtitle: { ...FONTS.body, letterSpacing: 3, marginTop: SIZES.base },
  formContainer: { width: '100%', flex: 1.5, justifyContent: 'center' },
  input: { padding: SIZES.padding, borderRadius: SIZES.radius, marginBottom: SIZES.padding, fontSize: SIZES.h3, borderWidth: 1 },
  buttonContainer: { width: '100%', flex: 1, justifyContent: 'flex-start' },
  primaryButton: { padding: SIZES.padding, borderRadius: SIZES.radius, alignItems: 'center' },
  primaryButtonText: { ...FONTS.h3, fontWeight: 'bold' },
  animation: { width: 200, height: 200 },
  authText: { ...FONTS.h3, marginTop: 20, letterSpacing: 2, fontWeight: 'bold' }
});

export default LoginScreen;