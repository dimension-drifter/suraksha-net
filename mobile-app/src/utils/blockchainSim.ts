// A simple function to simulate a cryptographic hash
const pseudoHash = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, '0')}`;
};

interface Block {
  blockNumber: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
}

export const generateBlockchainTrail = (message: any): Block[] => {
  const trail: Block[] = [];

  // 1. Genesis Block (The start of the ledger)
  const genesisBlock: Block = {
    blockNumber: 1,
    timestamp: new Date(Date.now() - 10000).toISOString(),
    data: 'Ledger Initialized',
    previousHash: '0'.repeat(10),
    hash: pseudoHash('1Ledger Initialized' + '0'.repeat(10)),
  };
  trail.push(genesisBlock);

  // 2. Commander's Signature Block
  const commanderSignature = {
    commanderId: 'GEN-A-K-SINGH',
    authorizationCode: 'AUTH-SEC-77B',
  };
  const commanderBlock: Block = {
    blockNumber: 2,
    timestamp: new Date(Date.now() - 5000).toISOString(),
    data: `Signed by: ${commanderSignature.commanderId}`,
    previousHash: genesisBlock.hash,
    hash: pseudoHash('2' + JSON.stringify(commanderSignature) + genesisBlock.hash),
  };
  trail.push(commanderBlock);
  
  // 3. Message Block
  const messageBlock: Block = {
    blockNumber: 3,
    timestamp: new Date().toISOString(),
    data: `Message: "${message.text}"`,
    previousHash: commanderBlock.hash,
    hash: pseudoHash('3' + message.text + commanderBlock.hash),
  };
  trail.push(messageBlock);

  return trail;
};