export type MessageSeverity = "error" | "warning" | "info" | "success";

export type Message = {
  text: string;
  severity: MessageSeverity;
}

