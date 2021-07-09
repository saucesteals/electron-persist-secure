import { MessageHelper, MessageReply } from "@/types";
import { IpcMainInvokeEvent } from "electron";
export declare const createMessageHelper: (storeName: string) => MessageHelper;
export declare const wrapMessageHandler: (fn: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<MessageReply>) => (event: IpcMainInvokeEvent, ...args: any[]) => Promise<MessageReply>;
