import * as ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { TemplateConfig } from './interface';

export default class ReactEmailModule {
  public static renderTemplate = ({ containerId, ...templateConfig }: TemplateConfig) => {
    const container = document.getElementById(containerId);

    if (!container)
      throw new Error(
        `[React Email Module] Container with id ${containerId} does not exist in the DOM`,
      );

    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App templateConfig={templateConfig} />
      </React.StrictMode>,
    );
  };
}
