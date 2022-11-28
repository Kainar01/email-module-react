import { useEffect, useState } from 'react';
import ReactEmailEditor from 'react-email-editor';

export const autoSaveHook = (
  editor: ReactEmailEditor | null,
  onAutoSave?: VoidFunction,
  frequencyInSeconds: number = 5,
) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (editor)
      editor.addEventListener('design:updated', () => {
        setIsUpdated(true);
      });
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const id = setInterval(() => {
        if (isUpdated) {
          onAutoSave?.();
          setIsUpdated(false);
        }
      }, frequencyInSeconds * 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [editor, isUpdated]);
};
