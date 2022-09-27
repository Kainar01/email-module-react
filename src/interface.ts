export interface Tag {
  name: string;
  value: string;
}

export interface TemplateConfig {
  uid: string;
  containerId: string;
  autosave?: number;
  templateJSON?: object;
  templateHTML?: string;
  preventClose?: boolean;
  mergeTags?: Tag[];
  onSave?: (json: object, html: string) => Promise<void> | void;
  onSend?: (html: string) => Promise<void> | void;
  onError?: (err: Error) => void;
  onAutoSave?: (json: object) => void;
}
