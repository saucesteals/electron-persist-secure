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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreBindings = void 0;
const electron_1 = require("electron");
const messaging_1 = require("./utils/messaging");
const createStoreBindings = (storeName = "config") => {
    const messageHelper = messaging_1.createMessageHelper(storeName);
    return {
        getItem: (key) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield electron_1.ipcRenderer.invoke(messageHelper.GET, key);
            if (result.success) {
                return result.value;
            }
            else {
                throw new Error(result.error);
            }
        }),
        setItem: (key, value) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield electron_1.ipcRenderer.invoke(messageHelper.SET, key, value);
            if (result.success) {
                return true;
            }
            else {
                throw new Error(result.error);
            }
        }),
        removeItem: (key) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield electron_1.ipcRenderer.invoke(messageHelper.DELETE, key);
            if (result.success) {
                return true;
            }
            else {
                throw new Error(result.error);
            }
        }),
        destoryStore: () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield electron_1.ipcRenderer.invoke(messageHelper.DESTORY_STORE);
            if (result.success) {
                return true;
            }
            else {
                throw new Error(result.error);
            }
        }),
    };
};
exports.createStoreBindings = createStoreBindings;
