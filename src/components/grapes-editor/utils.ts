import GrapesJS from 'grapesjs';
import { CommandType } from './types';

export interface GrapesButton {
  panelId: string;
  id?: string;
  label?: string;
  tagName?: 'span';
  className?: string;
  command?: string | ((editor: GrapesJS.Editor, opts?: any) => void);
  context?: string;
  buttons?: any[];
  attributes?: object;
  options?: object;
  active?: boolean;
  dragDrop?: boolean;
  togglable?: boolean;
  runDefaultCommand?: boolean;
  stopDefaultCommand?: boolean;
  disable?: boolean;
}

export interface GrapesCommand {
  id: CommandType;
  command: () => Promise<void> | void;
}

export const addButtons = (editor: GrapesJS.Editor, buttons: GrapesButton[]) => {
  buttons.forEach(({ panelId, ...btnOpts }) =>
    editor.Panels.addButton('options', btnOpts as GrapesJS.ButtonOptions),
  );
};

export const addCommands = (editor: GrapesJS.Editor, commands: GrapesCommand[]) => {
  commands.forEach((cmd) =>
    editor.Commands.add(cmd.id, cmd.command),
  );
};
