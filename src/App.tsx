import React from 'react';
import { AppProvider } from './providers/app';

import 'normalize.css';
import { TemplateConfig } from '~/interface';
import { EmailEditor } from './components/email-editor/EmailEditor';

type Props = {
  templateConfig: Omit<TemplateConfig, 'containerId'>;
};
function App({ templateConfig }: Props) {
  return (
    <AppProvider>
      <EmailEditor templateConfig={templateConfig} />
    </AppProvider>
  );
}

export default App;