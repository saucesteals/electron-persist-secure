"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreMessage = exports.isNode = void 0;
exports.isNode = ((_b = (_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.process) === null || _a === void 0 ? void 0 : _a.versions) === null || _b === void 0 ? void 0 : _b.node) !== undefined;
const createStoreMessage = (storeName) => `store:${storeName}`;
exports.createStoreMessage = createStoreMessage;
