export interface Tag {
  name: string;
  value: string;
}

export interface TemplateConfig {
  uid: string;
  containerId: string;
  preventClose?: boolean;
  mergeTags?: Tag[];
  onSave?: () => void;
  onSend?: () => void;
  onError?: (err: Error) => void;
  onAutoSave?: () => void;
}
