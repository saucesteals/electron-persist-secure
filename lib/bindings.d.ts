export declare const createStoreBindings: (storeName?: string) => {
    getItem: (key: string) => Promise<any>;
    setItem: (key: string, value: any) => Promise<boolean>;
    removeItem: (key: string) => Promise<boolean>;
    destoryStore: () => Promise<boolean>;
};
