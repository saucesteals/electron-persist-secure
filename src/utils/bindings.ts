import { MessageReply } from "../types";
import { ipcRenderer } from "electron";
import { createMessageHelper } from "./messaging";

export const createStoreBindings = (storeName: string = "config"): Record<string, Function> => {
  const messageHelper = createMessageHelper(storeName);
  return {
    getItem: async (key: string): Promise<boolean> => {
      const result: MessageReply = await ipcRenderer.invoke(messageHelper.GET, key);
      if (result.success) {
        return result.value;
      } else {
        throw new Error(result.error);
      }
    },
    setItem: async (key: string, value: any): Promise<boolean> => {
      const result: MessageReply = await ipcRenderer.invoke(messageHelper.SET, key, value);
      if (result.success) {
        return result.value;
      } else {
        throw new Error(result.error);
      }
    },
    removeItem: async (key: string): Promise<boolean> => {
      const result: MessageReply = await ipcRenderer.invoke(messageHelper.DELETE, key);
      if (result.success) {
        return true;
      } else {
        throw new Error(result.error);
      }
    },
    destoryStore: async (): Promise<boolean> => {
      const result: MessageReply = await ipcRenderer.invoke(messageHelper.DESTORY_STORE);
      if (result.success) {
        return true;
      } else {
        throw new Error(result.error);
      }
    },
  };
};
