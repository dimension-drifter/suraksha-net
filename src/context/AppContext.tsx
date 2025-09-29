import React, { createContext } from 'react';

interface AppContextType {
  showAlert: (title: string, message: string, showAnimation?: boolean, onDismiss?: () => void) => void;
  hideAlert: () => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  lastCheckInTime: Date | null;
  performCheckIn: () => void;
  isChameleonMode: boolean;
  toggleChameleonMode: () => void;
  isWiped: boolean;               // Add wipe state
  triggerBurnNotice: () => void;  // Add wipe trigger function
}

export const AppContext = createContext<AppContextType>({
  showAlert: () => {},
  hideAlert: () => {},
  isStealthMode: false,
  toggleStealthMode: () => {},
  lastCheckInTime: null,
  performCheckIn: () => {},
  isChameleonMode: false,
  toggleChameleonMode: () => {},
  isWiped: false,
  triggerBurnNotice: () => {},
});