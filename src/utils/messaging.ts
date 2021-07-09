import { MessageHelper, MessageReply } from "@/types";
import { IpcMainInvokeEvent } from "electron";

export const createMessageHelper = (storeName: string): MessageHelper => {
  return {
    GET: `store:${storeName}:get`,
    SET: `store:${storeName}:set`,
    DELETE: `store:${storeName}:delete`,
    DESTORY_STORE: `store:${storeName}:delete_store`,
  };
};

export const wrapMessageHandler = (
  fn: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<MessageReply>
): ((event: IpcMainInvokeEvent, ...args: any[]) => Promise<MessageReply>) => {
  return async (event: IpcMainInvokeEvent, ...args: any[]) => {
    try {
      return await fn(event, ...args);
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
};
