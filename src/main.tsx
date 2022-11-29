import ReactEmailModule from './index';
import { BEE_JSON_MOCK } from './mock';

const instance = await ReactEmailModule.renderTemplate({
  containerId: 'root',
  projectId: 116465,
  beeJSON: BEE_JSON_MOCK,
  unlayerOptions: {
    tools: {
      custom_media: {
        enabled: true
      }
    }
  },
  // templateJSON: demo,
  // templateHTML: '<b>helo</b>',
  onSave: async (json, html) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log(json);
  },
  onAutoSave: (json) => {},
  onSend: async (html) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log(html);
  },
});

document.getElementById('button')?.addEventListener('click', () => {
  instance.saveTemplate();
});

