export const isNode = globalThis?.process?.versions?.node !== undefined;

export const createStoreMessage = (storeName: string): string => `store:${storeName}`;
