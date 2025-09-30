import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import CustomAlert from './src/components/CustomAlert';
import { AppContext } from './src/context/AppContext';
import * as ScreenCapture from 'expo-screen-capture';
import CalculatorScreen from './src/screens/CalculatorScreen';
import WipeScreen from './src/screens/WipeScreen';

export default function App() {
  const [alert, setAlert] = useState({
    visible: false, title: '', message: '', showAnimation: false,
    onClose: undefined as (() => void) | undefined,
  });
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<Date | null>(null);
  const [isChameleonMode, setIsChameleonMode] = useState(false);
  const [isWiped, setIsWiped] = useState(false);
  const [appKey, setAppKey] = useState(0); // Add a key to force re-render

  useEffect(() => {
    const activateProtection = async () => { await ScreenCapture.preventScreenCaptureAsync(); };
    activateProtection();
    const subscription = ScreenCapture.addScreenshotListener(() => {
      showAlert('SECURITY ALERT', 'Screenshot attempt detected. This activity has been logged and reported to HQ.', false, hideAlert);
    });
    return () => { subscription.remove(); };
  }, []);

  const showAlert = (title: string, message: string, showAnimation = false, onDismiss?: () => void) => {
    const closeHandler = () => {
      setAlert({ visible: false, title: '', message: '', showAnimation: false, onClose: undefined });
      if (onDismiss) onDismiss();
    };
    setAlert({ visible: true, title, message, showAnimation, onClose: onDismiss ? closeHandler : undefined });
  };

  const hideAlert = () => { setAlert({ ...alert, visible: false }); };
  const toggleStealthMode = () => { setIsStealthMode(prev => !prev); };
  const performCheckIn = () => {
    setLastCheckInTime(new Date());
    showAlert('Check-in Confirmed', 'Your operational status has been confirmed. All active time-lock timers have been reset.', false, hideAlert);
  };
  const toggleChameleonMode = () => { setIsChameleonMode(prev => !prev); };
  
  const triggerBurnNotice = () => {
    setIsWiped(true);
    // Simulate a forced logout and app reset after the animation
    setTimeout(() => {
        setIsWiped(false);
        // Changing the key of AppNavigator will unmount the entire navigation stack and remount it from scratch
        setAppKey(prevKey => prevKey + 1); 
    }, 4000); // Display wipe screen for 4 seconds
  };

  const contextValue = {
    showAlert,
    hideAlert,
    isStealthMode,
    toggleStealthMode,
    lastCheckInTime,
    performCheckIn,
    isChameleonMode,
    toggleChameleonMode,
    isWiped,
    triggerBurnNotice,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {isWiped ? <WipeScreen /> : isChameleonMode ? <CalculatorScreen /> : (
        <>
          <AppNavigator key={appKey} />
          <CustomAlert
            visible={alert.visible}
            title={alert.title}
            message={alert.message}
            onClose={alert.onClose}
            showAnimation={alert.showAnimation}
          />
        </>
      )}
      <StatusBar style="light" />
    </AppContext.Provider>
  );
}