import { createStoreMessage, isNode } from "./utils";

if (!isNode) {
  throw new Error("Do NOT import store from the renderer process.");
}

import { ConfigOperation, MessageReply } from "./types";
import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import Conf, { Options } from "conf";

export default class Store extends Conf {
  private storeName: string;
  private listening: boolean = false;

  constructor(options: Partial<Options<any>> = {}) {
    super({
      ...options,
      cwd: options.cwd ?? app.getPath("userData"),
      projectVersion: options.projectVersion ?? app.getVersion(),
    });

    this.storeName = options.projectName ?? "config";

    this.setupListeners();
  }

  private setupListeners(): void {
    if (this.listening) {
      throw new Error(`Listener for store has already been setup`);
    }

    ipcMain.handle(createStoreMessage(this.storeName), this.messageHandler.bind(this));

    this.listening = true;
  }

  private messageHandler(
    event: IpcMainInvokeEvent,
    operation: ConfigOperation,
    ...args: any[]
  ): MessageReply {
    var value: any = undefined;

    try {
      const f = this[operation] as any;
      if (typeof f === "function") {
        value = (this[operation] as any)(...args);
      } else {
        value = f;
      }

      return { success: true, value };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}
