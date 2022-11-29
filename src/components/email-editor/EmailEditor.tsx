import { useCallback, useRef, useState } from 'react';
import ReactEmailEditor, { HtmlExport } from 'react-email-editor';
import styled from 'styled-components';
import { Unlayer2be } from 'unlayer2be';
import { TemplateConfig } from '~/interface';
import { autoSaveHook } from './autoSaveHook';
import { EditorBar } from './EditorBar';

export type EmailEditorRef = {
  editor: ReactEmailEditor;
};

type Props = {
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};

export const EmailEditor = ({ templateConfig }: Props) => {
  const emailEditorRef = useRef<EmailEditorRef>(null);
  
  const [isLoading, setLoading] = useState(true);

  const {
    projectId,
    unlayerOptions,
    beeJSON,
    templateJSON,
    templateHTML,
    onSave,
    onSend,
    onAutoSave,
    onHandleInit,
  } = templateConfig;


  const autoSaveDesign = () => {
    exportDesign().then(({ design }) => onAutoSave?.(JSON.stringify(design)));
  };

  autoSaveHook(emailEditorRef, autoSaveDesign);

  const exportDesign = () => {
    return new Promise<HtmlExport>((resolve, reject) => {
      try {
        emailEditorRef.current!.editor.exportHtml((data) => resolve(data), {
          minify: true,
          cleanup: true,
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const saveDesign = async () => {
    if (onSave) {
      const { design, html } = await exportDesign();
      return onSave?.(design, html);
    } else {
      console.warn('[React Email Module] onSave callback not passed');
    }
  };

  const sendDesign = async () => {
    if (onSend) {
      const { html } = await exportDesign();
      return onSend?.(html);
    } else {
      console.warn('[React Email Module] onSend callback not passed');
    }
  };

  const handleActionWithEditor = (action: () => Promise<void> | void) => {
    return async (): Promise<void> => {
      try {
        setLoading(true);
        await Promise.resolve(action());
      } catch (e) {
        console.error('[React Email Module] Error occured while executing an action: ', e);
      } finally {
        setLoading(false);
      }
    };
  };

  const loadDesign = (editor: ReactEmailEditor) => {
    let design = templateJSON;
    // load from bee json
    if (!templateJSON && beeJSON) {
      design = Unlayer2be.design(beeJSON as any);
    }
    // load from html
    else if (!templateJSON && templateHTML) {
      design = Unlayer2be.fromHtml(templateHTML);
    }
    
    editor.loadDesign(design as any);
  };

  // used interval to fix: onLoad fires before ref
  const onLoadEditor = useCallback(() => {
    const timer = setInterval(function() {
      if (emailEditorRef.current?.editor) {
        loadDesign(emailEditorRef.current.editor)
        clearInterval(timer);
      }
    }, 500);
  }, [ emailEditorRef ]);

  
  const onReady = () => {
    onHandleInit?.({
      saveTemplate: handleActionWithEditor(saveDesign),
      sendTemplate: handleActionWithEditor(sendDesign),
    });
    setLoading(false);
  };

  return (
    <ContainerStyled>
      <EditorBar
        onSave={handleActionWithEditor(saveDesign)}
        onSend={handleActionWithEditor(sendDesign)}
        isLoading={isLoading}
      />
      <ReactEmailEditor
        options={{
          ...unlayerOptions,
          projectId,
        }}
        ref={emailEditorRef as any}
        onLoad={onLoadEditor}
        onReady={onReady}
      />
    </ContainerStyled>
  );
};


export const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: 100%;
  overflow-y: auto;
  flex-direction: column;
`;