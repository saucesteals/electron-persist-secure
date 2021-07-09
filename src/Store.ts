import { isNode } from "./utils/etc";

if (!isNode) {
  throw new Error("Do NOT import store from the renderer process.");
}

import { MessageHelper, MessageReply } from "./types";
import { createMessageHelper, wrapMessageHandler } from "./utils/messaging";
import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import Conf, { Options } from "conf";

export default class Store extends Conf {
  readonly messageHelper: MessageHelper;
  private listening: boolean = false;

  constructor(options: Partial<Options<any>> = {}) {
    super({
      ...options,
      cwd: options.cwd ?? app.getPath("userData"),
      projectVersion: options.projectVersion ?? app.getVersion(),
    });

    this.messageHelper = createMessageHelper(options.configName ?? "config");

    this.setupListeners();
  }

  private setupListeners(): void {
    if (this.listening) {
      throw new Error(`Listeners for store have already been setup`);
    }

    ipcMain.handle(this.messageHelper.GET, wrapMessageHandler(this.handleGet));

    ipcMain.handle(this.messageHelper.SET, wrapMessageHandler(this.handleSet));

    ipcMain.handle(this.messageHelper.DELETE, wrapMessageHandler(this.handleDelete));

    ipcMain.handle(this.messageHelper.DESTORY_STORE, wrapMessageHandler(this.handleDestoryStore));

    this.listening = true;
  }

  private async handleGet(event: IpcMainInvokeEvent, key: string): Promise<MessageReply> {
    return { success: true, value: this.get(key), key: key };
  }

  private async handleSet(
    event: IpcMainInvokeEvent,
    key: string,
    value: any
  ): Promise<MessageReply> {
    this.set("key", value);
    return { success: true, key: key };
  }

  private async handleDelete(event: IpcMainInvokeEvent, key: string): Promise<MessageReply> {
    this.delete("key");
    return { success: true, key: key };
  }

  private async handleDestoryStore(event: IpcMainInvokeEvent): Promise<MessageReply> {
    this.clear();
    return { success: true };
  }
}
