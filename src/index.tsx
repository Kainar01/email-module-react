import * as ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { TemplateActions, TemplateConfig } from './interface';

export default class ReactEmailModule {
  public static renderTemplate = (config: TemplateConfig) => {
    const { containerId, ...templateConfig } = config;

    const container = document.getElementById(containerId);

    if (!container)
      throw new Error(
        `[React Email Module] Container with id ${containerId} does not exist in the DOM`,
      );

    return new Promise<GrapesPluginInstance>((resolve, reject) => {
      try {
        const onHandleInit: TemplateConfig['onHandleInit'] = (templateActions) => {
          resolve(new GrapesPluginInstance(config, templateActions));
        };

        ReactDOM.createRoot(container).render(
          <React.StrictMode>
            <App templateConfig={{ ...templateConfig, onHandleInit }} />
          </React.StrictMode>,
        );
      } catch (err) {
        config.onError?.(err);
        reject(err);
      }
    });
  };
}

class GrapesPluginInstance {
  private projectId: number;
  private actions: TemplateActions;
  constructor(
    { projectId }: TemplateConfig,
    actions: { saveTemplate: VoidFunction; sendTemplate: VoidFunction },
  ) {
    this.projectId = projectId;
    this.actions = actions;
  }

  public saveTemplate() {
    this.actions.saveTemplate();
  }

  public sendTemplate() {
    this.actions.sendTemplate();
  }
}
