import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';8

const CalculatorScreen = () => {
  const { toggleChameleonMode } = useContext(AppContext);

  const buttons = [
    'C', '+/-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onLongPress={toggleChameleonMode} style={styles.display}>
        <Text style={styles.displayText}>0</Text>
      </TouchableOpacity>
      <View style={styles.buttonGrid}>
        {buttons.map((btn) => (
          <TouchableOpacity key={btn} style={styles.button}>
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222' },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,
  },
  displayText: { fontSize: 80, color: 'white' },
  buttonGrid: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '25%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#444',
  },
  buttonText: { fontSize: 32, color: 'white' },
});

export default CalculatorScreen;
