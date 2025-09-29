// A mock, static device fingerprint for demonstration
export const MOCK_DEVICE_FINGERPRINT = 'IMEI-8675309-AXB-456-XYZ';

/**
 * Simulates converting a string into a DNA sequence (A,T,G,C).
 * This is a deterministic but visually random-looking conversion.
 */
export const generateDnaKey = (fingerprint: string): string => {
  let dnaKey = '';
  for (let i = 0; i < fingerprint.length; i++) {
    const charCode = fingerprint.charCodeAt(i);
    switch (charCode % 4) {
      case 0: dnaKey += 'A'; break;
      case 1: dnaKey += 'T'; break;
      case 2: dnaKey += 'G'; break;
      case 3: dnaKey += 'C'; break;
    }
  }
  return dnaKey;
};

/**
 * Simulates encrypting text using a simple character shift based on the DNA key.
 */
export const encryptWithDnaKey = (text: string, dnaKey: string): string => {
  let ciphertext = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar = dnaKey[i % dnaKey.length];
    let shift = 0;
    switch (keyChar) {
      case 'A': shift = 1; break;
      case 'T': shift = 2; break;
      case 'G': shift = 3; break;
      case 'C': shift = 4; break;
    }
    ciphertext += String.fromCharCode(text.charCodeAt(i) + shift);
  }
  return ciphertext;
};