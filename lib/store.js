"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const etc_1 = require("./utils/etc");
if (!etc_1.isNode) {
    throw new Error("Do NOT import store from the renderer process.");
}
const messaging_1 = require("./utils/messaging");
const electron_1 = require("electron");
const conf_1 = __importDefault(require("conf"));
class Store extends conf_1.default {
    constructor(options = {}) {
        var _a, _b, _c;
        super(Object.assign(Object.assign({}, options), { cwd: (_a = options.cwd) !== null && _a !== void 0 ? _a : electron_1.app.getPath("userData"), projectVersion: (_b = options.projectVersion) !== null && _b !== void 0 ? _b : electron_1.app.getVersion() }));
        this.listening = false;
        this.messageHelper = messaging_1.createMessageHelper((_c = options.configName) !== null && _c !== void 0 ? _c : "config");
        this.setupListeners();
    }
    setupListeners() {
        if (this.listening) {
            throw new Error(`Listeners for store have already been setup`);
        }
        electron_1.ipcMain.handle(this.messageHelper.GET, messaging_1.wrapMessageHandler(this.handleGet.bind(this)));
        electron_1.ipcMain.handle(this.messageHelper.SET, messaging_1.wrapMessageHandler(this.handleSet.bind(this)));
        electron_1.ipcMain.handle(this.messageHelper.DELETE, messaging_1.wrapMessageHandler(this.handleDelete.bind(this)));
        electron_1.ipcMain.handle(this.messageHelper.DESTORY_STORE, messaging_1.wrapMessageHandler(this.handleDestoryStore.bind(this)));
        this.listening = true;
    }
    handleGet(event, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return { success: true, value: this.get(key), key: key };
        });
    }
    handleSet(event, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.set(key, value);
            return { success: true, key: key };
        });
    }
    handleDelete(event, key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.delete("key");
            return { success: true, key: key };
        });
    }
    handleDestoryStore(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            return { success: true };
        });
    }
}
exports.default = Store;
