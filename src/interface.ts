import { UnlayerOptions } from 'react-email-editor';

export interface Tag {
  name: string;
  value: string;
}

export interface TemplateConfig {
  projectId: number;
  unlayerOptions?: UnlayerOptions;
  containerId: string;
  autosave?: number;
  beeJSON?: object
  templateJSON?: object;
  templateHTML?: string;
  preventClose?: boolean;
  mergeTags?: Tag[];
  onSave?: (json: object, html: string) => Promise<void> | void;
  onSend?: (html: string) => Promise<void> | void;
  onError?: (err: any) => void;
  onAutoSave?: (data: string) => void;
  onHandleInit?: (params: TemplateActions) => void;
}

export interface TemplateActions {
  saveTemplate: VoidFunction;
  sendTemplate: VoidFunction;
}
