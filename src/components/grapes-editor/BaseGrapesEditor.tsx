import React, { useEffect, useRef, useState } from 'react';

import GrapesJS from 'grapesjs';

import juice from 'juice';
import { LoadingOverlay } from '~/components/elements';
import { TemplateConfig } from '~/interface';
import { GrapesjsReact } from 'grapesjs-react';

import 'grapesjs/dist/css/grapes.min.css';
import styled from 'styled-components';
import { addButtons } from './utils';

export type GrapesEditorProps = {
  grapesConfig: GrapesJS.EditorConfig;
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};

const SECOND_MS = 1000;
const MINIMAL_AUTOSAVE_SECOND = 1;
const DEFAULT_AUTOSAVE_SECOND = 3;

export function BaseGrapesEditor({ grapesConfig, templateConfig }: GrapesEditorProps) {
  const [loading, setLoading] = useState(false);
  const {
    uid,
    onSave,
    onSend,
    onAutoSave,
    templateJSON,
    templateHTML,
    autosave = DEFAULT_AUTOSAVE_SECOND,
  } = templateConfig;

  const grapesEditor = useRef<GrapesJS.Editor | null>(null);

  const handleOnInit = async (editor?: GrapesJS.Editor) => {
    if (editor) {
      grapesEditor.current = editor;

      if (templateJSON) {
        editor.loadProjectData(templateJSON);
      } else {
        editor.setComponents(templateHTML, {});
      }

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
          command: onHandleSave,
          attributes: { title: 'Save Template' },
        },
        {
          panelId: 'options',
          id: 'send',
          label: ' Send',
          className: 'fa fa-send-o',
          command: onHandleSend,
          attributes: { title: 'Save Template' },
        },
      ];

      addButtons(editor, buttons);
    }
  };

  const getInlineCssHtml = (editor: GrapesJS.Editor) => {
    const html = editor.getHtml();
    const css = editor.getCss();
    return juice(html, { extraCss: css as string });
  };

  const onHandleSave = async () => {
    const editor = grapesEditor.current;

    if (editor) {
      const htmlInlineCss = getInlineCssHtml(editor);
      const grapesJson = editor.getProjectData();

      if (!onSave) {
        console.warn(
          '[React Email Module] You do not have listener for on save hook. Pass one to be able to get template data on save',
        );
      } else {
        handleActionWithLoader(() => onSave(grapesJson, htmlInlineCss));
      }
    }
  };

  const onHandleSend = async () => {
    const editor = grapesEditor.current;

    if (editor) {
      const htmlInlineCss = getInlineCssHtml(editor);

      if (!onSend) {
        console.warn(
          '[React Email Module] You do not have listener for on send hook. Pass one to be able to send html',
        );
      } else {
        handleActionWithLoader(() => onSend(htmlInlineCss));
      }
    }
  };

  const handleActionWithLoader = async (action: () => Promise<void> | void) => {
    try {
      setLoading(true);
      await action();
    } catch (e) {
      console.error('[React Email Module] Error occured while executing an action: ', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const editor = grapesEditor.current;
      if (editor) {
        onAutoSave?.(editor.getProjectData());
      }
    }, SECOND_MS * Math.max(MINIMAL_AUTOSAVE_SECOND, autosave));

    return () => clearInterval(interval);
  }, []);

  return (
    <ContainerStyled>
      <GrapesjsReact {...grapesConfig} onInit={handleOnInit} id={uid} storageManager={false} />
      <LoadingOverlay active={loading} />
    </ContainerStyled>
  );
}

export const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;
