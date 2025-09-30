interface OpsecResult {
  hasViolation: boolean;
  suggestion?: string;
}

// A list of sensitive keywords and their suggested alternatives
const VIOLATION_RULES: { [key: string]: string } = {
  'base': 'designated location',
  'hq': 'command',
  'tomorrow': 'at the scheduled time',
  'tonight': 'this evening',
  'alpha squad': 'assigned unit',
  'viper': 'callsigns',
};

export const checkOpsecViolation = (text: string): OpsecResult => {
  const lowerCaseText = text.toLowerCase();

  // Check for specific keywords
  for (const keyword in VIOLATION_RULES) {
    if (lowerCaseText.includes(keyword)) {
      return {
        hasViolation: true,
        suggestion: `OPSEC Warning: Avoid using "${keyword}". Consider using "${VIOLATION_RULES[keyword]}" instead.`
      };
    }
  }

  // Check for time patterns like "0800" or "21:30"
  const timePattern = /\b([01]?[0-9]|2[0-3]):?([0-5][0-9])?\s?(hrs|h)?\b/;
  if (timePattern.test(lowerCaseText)) {
    return {
      hasViolation: true,
      suggestion: 'OPSEC Warning: Avoid mentioning specific times. Use "scheduled time".'
    };
  }

  return { hasViolation: false };
};