import { faker } from '@faker-js/faker';

// Mock users data with Indian names
export const generateMockUsers = () => {
  const indianNames = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Khush Paliwal', 'Rohit Gupta',
    'Tanay Sharma', 'Aradhy Raghav Duvey', 'Meera Nair', 'Vikram Joshi', 'Ananya Das',
    'Karthik Rao', 'Divya Agarwal', 'Deepam Tater', 'Mahir Makar', 'Nyasa Sharma', 'Pooja Khanna', 
    'Sanjay Tiwari',
    'Ruchi Malhotra', 'Aditya Bhatt', 'Shweta Saxena', 'Manoj Kumar', 'Isha Bansal'
  ];
  const ranks = ['Major', 'Captain', 'Lieutenant', 'Colonel', 'Sergeant', 'Corporal'];
  const divisions = ['Alpha Squad', 'Bravo Team', 'Charlie Unit', 'Delta Force', 'Echo Platoon'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: indianNames[i % indianNames.length] || `Officer ${i + 1}`,
    rank: ranks[Math.floor(Math.random() * ranks.length)],
    division: divisions[Math.floor(Math.random() * divisions.length)],
    email: `${indianNames[i % indianNames.length]?.toLowerCase().replace(' ', '.')}@SurakshaNET.ops` || `user${i}@SurakshaNET.ops`,
    status: ['active', 'suspended', 'pending'][Math.floor(Math.random() * 3)],
    lastSeen: faker.date.recent(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.string.uuid()}`,
    location: faker.location.city(),
    securityLevel: Math.floor(Math.random() * 5) + 1,
    joinedAt: faker.date.past()
  }));
};

// Mock groups data
export const generateMockGroups = () => {
  const groupNames = [
    'Alpha Squad', 'Bravo Team', 'Charlie Unit', 'Delta Force', 'Echo Platoon',
    'Foxtrot Division', 'Golf Company', 'Hotel Battalion', 'India Regiment'
  ];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: groupNames[i] || `Group ${i + 1}`,
    description: faker.lorem.sentence(),
    memberCount: Math.floor(Math.random() * 50) + 5,
    status: ['active', 'suspended', 'archived'][Math.floor(Math.random() * 3)],
    createdAt: faker.date.past(),
    lastActivity: faker.date.recent(),
    securityLevel: Math.floor(Math.random() * 5) + 1,
    commander: faker.person.fullName()
  }));
};

// Mock activity logs with Indian names and security activities
export const generateActivityLog = () => {
  const indianNames = [
    'Rajesh Khurana HAC', 'Priya Koirala HRC', 'Amit Joshi PCC', 'Sneha Malti HCC', 'Rohit Gupta',
    'Kavya Iyer', 'Mahir Makar', 'Nyasa Sharma', 'Meera Nair', 'Vikram Joshi', 'Ananya Das',
    'Karthik Rao', 'Deepam Tater', 'Divya Agarwal', 'Khush Paliwal', 'Pooja Khanna', 'Sanjay Tiwari',
    'Ruchi Malhotra', 'Tanay Sharma', 'Aradhy Raghav Duvey', 'Aditya Bhatt', 'Shweta Saxena', 'Manoj Kumar', 'Isha Bansal'
  ];
  
  const activities = [
    'Security scan completed',
    'User logged in', 
    'Message: Lost',
    'Privilege escalation attempt',
    'VPN connection established',
    'Encryption key rotated',
    'External share blocked',
    'Abnormal network switch detected',
    'User tried external share',
    'Security alert triggered'
  ];
  
  const details = [
    'Security scan completed successfully',
    'User logged in successfully', 
    'User tried to access restricted area',
    'Successful authentication to mode 7',
    'Network activity monitored',
    'Connection secured with encryption',
    'Blocked unauthorized external access',
    'Network switch detected - investigating'
  ];
  
  return {
    id: faker.string.uuid(),
    timestamp: new Date(),
    user: indianNames[Math.floor(Math.random() * indianNames.length)],
    action: activities[Math.floor(Math.random() * activities.length)],
    details: details[Math.floor(Math.random() * details.length)],
    severity: ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)],
    location: faker.location.city()
  };
};

// Mock security events
export const generateSecurityEvent = () => {
  const events = [
    'Failed login attempt',
    'Unauthorized access blocked',
    'Malware detected',
    'Phishing attempt blocked',
    'Data exfiltration prevented',
    'Suspicious network activity',
    'Brute force attack detected',
    'Privilege escalation attempt'
  ];
  
  return {
    id: faker.string.uuid(),
    timestamp: new Date(),
    type: events[Math.floor(Math.random() * events.length)],
    severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
    source: faker.internet.ip(),
    target: faker.person.fullName(),
    status: ['resolved', 'investigating', 'blocked'][Math.floor(Math.random() * 3)]
  };
};