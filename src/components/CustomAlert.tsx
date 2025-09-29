import React, { useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS, STEALTH_COLORS, FONTS, SIZES } from '../constants/theme';
import { AppContext } from '../context/AppContext';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose?: () => void;
  showAnimation?: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose, showAnimation = false }) => {
  const { isStealthMode } = useContext(AppContext);
  const activeColors = isStealthMode ? STEALTH_COLORS : COLORS;

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={[styles.alertContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.accent }]}>
          {showAnimation && (
            <LottieView
              source={require('../assets/secure-animation.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          )}
          <Text style={[styles.title, { color: activeColors.accent }]}>{title}</Text>
          <Text style={[styles.message, { color: activeColors.text }]}>{message}</Text>
          {onClose && (
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: activeColors.primary }]} onPress={onClose}>
              <Text style={[styles.closeButtonText, { color: activeColors.text }]}>DISMISS</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '85%',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    borderWidth: 1,
  },
  animation: {
    width: 100,
    height: 100,
    marginBottom: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  message: {
    ...FONTS.body,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  closeButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
  },
  closeButtonText: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
});

export default CustomAlert;