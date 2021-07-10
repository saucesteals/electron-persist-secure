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
const utils_1 = require("./utils");
const createStoreBindings = (storeName = "config") => {
    const storeMessage = utils_1.createStoreMessage(storeName);
    const getReply = (operation, ...args) => __awaiter(void 0, void 0, void 0, function* () {
        const reply = yield electron_1.ipcRenderer.invoke(storeMessage, operation, ...args);
        if (reply.success) {
            return reply.value;
        }
        else {
            throw new Error(reply.error);
        }
    });
    return {
        get: (key, defaultValue) => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("get", key, defaultValue);
        }),
        set: (key, value) => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("set", key, value);
        }),
        has: (key) => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("has", key);
        }),
        reset: (...keys) => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("reset", ...keys);
        }),
        delete: (key) => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("delete", key);
        }),
        clear: () => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("clear");
        }),
        getPath: () => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("path");
        }),
        getStore: () => __awaiter(void 0, void 0, void 0, function* () {
            return getReply("store");
        }),
        getSize: () => {
            return getReply("size");
        },
    };
};
exports.createStoreBindings = createStoreBindings;
