import { isNode } from "./utils/etc";
import { createStoreBindings } from "./utils/bindings";
import Store from "./Store";

export default {
  Store: isNode ? (require("./Store") as Store) : undefined,
  createStoreBindings,
};
