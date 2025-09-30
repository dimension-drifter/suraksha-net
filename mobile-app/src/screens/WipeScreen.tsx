import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { COLORS, FONTS } from '../constants/theme';

const WipeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../assets/wipe-animation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text style={styles.title}>COMPROMISE DETECTED</Text>
      <Text style={styles.subtitle}>PROTOCOL 7 INITIATED</Text>
      <Text style={styles.message}>Purging all local data... You will be logged out.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.danger,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    ...FONTS.h3,
    color: COLORS.danger,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 8,
  },
  message: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  }
});

export default WipeScreen;
