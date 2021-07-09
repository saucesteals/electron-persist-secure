import { isNode } from "./utils/etc";
import { createStoreBindings } from "./utils/bindings";

export default { Store: isNode ? require("./Store") : undefined, createStoreBindings };
