import Conf, { Options } from "conf";
export default class Store extends Conf {
    private storeName;
    private listening;
    constructor(options?: Partial<Options<any>>);
    private setupListeners;
    private messageHandler;
}
