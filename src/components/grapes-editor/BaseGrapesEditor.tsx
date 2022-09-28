import React, { useEffect, useRef, useState } from 'react';

import GrapesJS from 'grapesjs';

import juice from 'juice';
import { LoadingOverlay } from '~/components/elements';
import { TemplateConfig } from '~/interface';
import { GrapesjsReact } from 'grapesjs-react';

import 'grapesjs/dist/css/grapes.min.css';
import styled from 'styled-components';
import { addButtons, addCommands } from './utils';
import { EventType, getEventType, off, on } from '~/events';
import { CommandType } from './types';

export type GrapesEditorProps = {
  grapesConfig: GrapesJS.EditorConfig;
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};

export function BaseGrapesEditor({ grapesConfig, templateConfig }: GrapesEditorProps) {
  const [loading, setLoading] = useState(false);
  const { uid, onSave, onSend, onAutoSave, templateJSON, templateHTML } = templateConfig;

  const grapesEditor = useRef<GrapesJS.Editor | null>(null);

  const handleOnInit = async (editor?: GrapesJS.Editor) => {
    if (editor) {
      grapesEditor.current = editor;

      if (templateJSON) {
        editor.loadProjectData(templateJSON);
      } else {
        editor.setComponents(templateHTML, {});
      }

      const commands = [
        {
          id: CommandType.SAVE_TEMPLATE,
          command: handleActionWithEditor(editor, handleSave),
        },
        {
          id: CommandType.SEND_TEMPLATE,
          command: handleActionWithEditor(editor, handleSend),
        },
      ];

      const buttons = [
        {
          panelId: 'options',
          id: 'preview',
          className: 'fa fa-eye',
          command: 'preview',
          attributes: { title: 'Preview' },
        },
        {
          panelId: 'options',
          id: 'undo',
          className: 'fa fa-undo',
          command: 'undo',
          attributes: { title: 'Undo' },
        },
        {
          panelId: 'options',
          id: 'redo',
          className: 'fa fa-repeat',
          command: 'redo',
          attributes: { title: 'Redo' },
        },
        {
          panelId: 'options',
          id: 'save',
          label: ' Save',
          className: 'fa fa-floppy-o icon-blank',
          command: handleActionWithEditor(editor, handleSave),
          attributes: { title: 'Save Template' },
        },
        {
          panelId: 'options',
          id: 'send',
          label: ' Send',
          className: 'fa fa-send-o',
          command: handleActionWithEditor(editor, handleSend),
          attributes: { title: 'Save Template' },
        },
      ];

      addButtons(editor, buttons);
      addCommands(editor, commands);

      editor.on('storage:start:store', () => {
        onAutoSave?.(editor.getProjectData());
      });
    }
  };

  const getInlineCssHtml = (editor: GrapesJS.Editor) => {
    const html = editor.getHtml();
    const css = editor.getCss();
    return juice(html, { extraCss: css as string });
  };

  const handleActionWithEditor = (
    editor: GrapesJS.Editor,
    action: (editor: GrapesJS.Editor) => Promise<void> | void,
  ) => {
    return async (): Promise<void> => {
      try {
        setLoading(true);
        await action(editor);
      } catch (e) {
        console.error('[React Email Module] Error occured while executing an action: ', e);
      } finally {
        setLoading(false);
      }
    };
  };

  const handleSave = async (editor: GrapesJS.Editor) => {
    const htmlInlineCss = getInlineCssHtml(editor);
    const grapesJson = editor.getProjectData();

    if (!onSave) {
      console.warn(
        '[React Email Module] You do not have listener for on save hook. Pass one to be able to get template data on save',
      );
      return;
    }

    return onSave(grapesJson, htmlInlineCss);
  };

  const handleSend = async (editor: GrapesJS.Editor) => {
    const htmlInlineCss = getInlineCssHtml(editor);

    if (!onSend) {
      console.warn(
        '[React Email Module] You do not have listener for on send hook. Pass one to be able to send html',
      );
      return;
    }

    await onSend(htmlInlineCss);
  };

  useEffect(() => {
    function saveTemplate() {
      console.debug('[ReactEmailModule] saving template')
      const editor = grapesEditor.current;
      editor?.runCommand(CommandType.SAVE_TEMPLATE, {});
    }

    const eventType = getEventType(EventType.SAVE_TEMPLATE, uid);

    console.debug('[ReactEmailModule] react module save template add listener')
    on(eventType, saveTemplate);

    return () => {
      console.debug('[ReactEmailModule] react module save template remove listener')
      off(eventType, saveTemplate);
    };
  }, [grapesEditor.current]);

  return (
    <ContainerStyled>
      <GrapesjsReact
        {...grapesConfig}
        onInit={handleOnInit}
        id={`grapes-uid-${uid}`}
        storageManager={{ autoload: false, autosave: true }}
      />
      <LoadingOverlay active={loading} />
    </ContainerStyled>
  );
}

export const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;
