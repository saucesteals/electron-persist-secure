import { ConfigOperation } from "./types";
import { ipcRenderer } from "electron";
import { createStoreMessage } from "./utils";

export const createStoreBindings = (storeName: string = "config") => {
  const storeMessage = createStoreMessage(storeName);

  const getReply = async (operation: ConfigOperation, ...args: any[]) => {
    const reply = await ipcRenderer.invoke(storeMessage, operation, ...args);
    if (reply.success) {
      return reply.value;
    } else {
      throw new Error(reply.error);
    }
  };

  return {
    get: async (key: string, defaultValue?: any): Promise<any> => {
      return getReply("get", key, defaultValue);
    },

    set: async (key: string | object, value?: any): Promise<any> => {
      return getReply("set", key, value);
    },

    has: async (key: string): Promise<boolean> => {
      return getReply("has", key);
    },

    reset: async (...keys: string[]): Promise<any> => {
      return getReply("reset", ...keys);
    },

    delete: async (key: string): Promise<any> => {
      return getReply("delete", key);
    },

    clear: async (): Promise<any> => {
      return getReply("clear");
    },
  };
};
