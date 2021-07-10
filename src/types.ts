export interface MessageReply {
  success: boolean;
  error?: string;
  value?: any;
}

export type ConfigOperation =
  | "get"
  | "set"
  | "has"
  | "reset"
  | "delete"
  | "clear"
  | "path"
  | "store"
  | "size";
