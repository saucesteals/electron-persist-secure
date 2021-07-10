export declare const createStoreBindings: (storeName?: string) => {
    get: (key: string, defaultValue?: any) => Promise<any>;
    set: (key: string | object, value?: any) => Promise<any>;
    has: (key: string) => Promise<boolean>;
    reset: (...keys: string[]) => Promise<any>;
    delete: (key: string) => Promise<any>;
    clear: () => Promise<any>;
};
