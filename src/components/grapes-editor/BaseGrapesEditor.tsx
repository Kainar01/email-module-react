import React, { useEffect, useRef } from 'react';

import GrapesJS from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

import { Stack } from '~/components/elements';
import { TemplateConfig } from '~/interface';
import { GrapesjsReact } from 'grapesjs-react';

export type GrapesEditorProps = {
  grapesConfig: GrapesJS.EditorConfig;
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};

export function GrapesEditor({ grapesConfig, templateConfig }: GrapesEditorProps) {
  const { uid, onSave } = templateConfig;

  const grapesEditor = useRef<GrapesJS.Editor | null>(null);

  const handleOnInit = (editor?: GrapesJS.Editor) => {
    if (editor) {
      grapesEditor.current = editor;
    }
    // editor.runCommand('gjs-get-inlined-html')
  };

  const onHandleSave = () => {
    if (grapesEditor.current) {
      const html = grapesEditor.current.runCommand('gjs-get-inlined-html', {});
      // todo: send to server
    }
  };
  return (
    <Stack>
      <GrapesjsReact onInit={} id={uid} {...grapesConfig} />
    </Stack>
  );
}
