export interface MessageReply {
    success: boolean;
    error?: string;
    [key: string]: any;
}
export interface MessageHelper {
    GET: string;
    SET: string;
    DELETE: string;
    DESTORY_STORE: string;
}
