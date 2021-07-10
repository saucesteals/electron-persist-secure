export interface MessageReply {
    success: boolean;
    error?: string;
    value?: any;
}
export declare type ConfigOperation = "get" | "set" | "has" | "reset" | "delete" | "clear";
