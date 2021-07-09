import { MessageHelper } from "./types";
import Conf, { Options } from "conf";
export default class Store extends Conf {
    readonly messageHelper: MessageHelper;
    private listening;
    constructor(options?: Partial<Options<any>>);
    private setupListeners;
    private handleGet;
    private handleSet;
    private handleDelete;
    private handleDestoryStore;
}
