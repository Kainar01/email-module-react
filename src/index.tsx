import * as ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { TemplateConfig } from './interface';
import { EventType, getEventType, trigger } from './events';

export default class ReactEmailModule {
  public static renderTemplate = (config: TemplateConfig) => {
    const { containerId, ...templateConfig } = config;

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

    return new GrapesPluginInstance(config);
  };
}

class GrapesPluginInstance {
  private uid: string;
  constructor({ uid }: TemplateConfig) {
    this.uid = uid;
  }

  public saveTemplate() {
    const eventType = getEventType(EventType.SAVE_TEMPLATE, this.uid);
    trigger(eventType);
  }

  public sendTemplate() {
    const eventType = getEventType(EventType.SEND_TEMPLATE, this.uid);
    trigger(eventType);
  }
}
