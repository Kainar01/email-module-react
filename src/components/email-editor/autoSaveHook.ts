import { Ref, RefObject, useEffect, useState } from 'react';
import { EmailEditorRef } from './EmailEditor';

export const autoSaveHook = (
  editor: RefObject<EmailEditorRef>,
  onAutoSave?: VoidFunction,
  frequencyInSeconds: number = 5,
) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (editor.current?.editor)
      editor.current.editor.addEventListener('design:updated', () => {
        setIsUpdated(true);
      });
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const timer = setInterval(() => {
        if (isUpdated) {
          onAutoSave?.();
          setIsUpdated(false);
        }
      }, frequencyInSeconds * 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [editor, isUpdated]);
};
