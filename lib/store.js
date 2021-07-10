"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
if (!utils_1.isNode) {
    throw new Error("Do NOT import store from the renderer process.");
}
const electron_1 = require("electron");
const conf_1 = __importDefault(require("conf"));
class Store extends conf_1.default {
    constructor(options = {}) {
        var _a, _b, _c;
        super(Object.assign(Object.assign({}, options), { cwd: (_a = options.cwd) !== null && _a !== void 0 ? _a : electron_1.app.getPath("userData"), projectVersion: (_b = options.projectVersion) !== null && _b !== void 0 ? _b : electron_1.app.getVersion() }));
        this.listening = false;
        this.storeName = (_c = options.configName) !== null && _c !== void 0 ? _c : "config";
        this.setupListeners();
    }
    setupListeners() {
        if (this.listening) {
            throw new Error(`Listener for store has already been setup`);
        }
        electron_1.ipcMain.handle(utils_1.createStoreMessage(this.storeName), this.messageHandler.bind(this));
        this.listening = true;
    }
    messageHandler(event, operation, ...args) {
        var value = undefined;
        try {
            const f = this[operation];
            if (typeof f === "function") {
                value = f(...args);
            }
            else {
                value = f;
            }
            return { success: true, value };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
}
exports.default = Store;
