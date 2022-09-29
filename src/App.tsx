import React from 'react';
import { AppProvider } from './providers/app';

import 'normalize.css';
import { WebGrapesEditor } from './components/grapes-editor';
import { TemplateConfig } from '~/interface';

type Props = {
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};
function App({ templateConfig }: Props) {
  return (
    <AppProvider>
      <WebGrapesEditor
        templateConfig={templateConfig}
        grapesConfig={{}}
      />
    </AppProvider>
  );
}

export default App;
