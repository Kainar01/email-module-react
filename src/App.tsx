import React from 'react';
import { AppProvider } from './providers/app';

import 'normalize.css';
import { GrapesEditor } from './components/grapes-editor';
import { TemplateConfig } from '~/interface';

type Props = {
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};
function App({ templateConfig }: Props) {
  return (
    <AppProvider>
      <GrapesEditor
        templateConfig={templateConfig}
        grapesConfig={{}}
      />
    </AppProvider>
  );
}

export default App;
