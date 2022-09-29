import { BaseGrapesEditor, GrapesEditorProps } from './BaseGrapesEditor';
import GrapesJS from 'grapesjs';

// @ts-ignore: does not have type declaration
import styleBgPlugin from 'grapesjs-style-bg';
// @ts-ignore: does not have type declaration
import 'grapesjs-preset-webpage';
// @ts-ignore: does not have type declaration
import tabsPlugin from 'grapesjs-tabs';
// @ts-ignore: does not have type declaration
import touchPlugin from 'grapesjs-touch';
// @ts-ignore: does not have type declaration
// import typedPlugin from 'grapesjs-typed';

import 'grapesjs-blocks-basic';
import tooltipPlugin from 'grapesjs-tooltip';
import customCodePlugin from 'grapesjs-custom-code';
import imageEditorPlugin from 'grapesjs-tui-image-editor';

export const GrapesWebBuilder = ({ grapesConfig, ...props }: GrapesEditorProps) => (
  <BaseGrapesEditor
    {...props}
    grapesConfig={{
      ...grapesConfig,
      plugins: [
        'gjs-blocks-basic',
        tabsPlugin,
        touchPlugin,
        tooltipPlugin,
        // typedPlugin,
        customCodePlugin,
        imageEditorPlugin,
        styleBgPlugin,
        'gjs-preset-webpage',
      ],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
        'grapesjs-tui-image-editor': {
          script: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js',
          ],
          style: [
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
          ],
        },
        'grapesjs-tabs': {
          tabsBlock: { category: 'Extra' },
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: ['Text row one', 'Text row two', 'Text row three'],
            },
          },
        },
        'grapesjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel:
            '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function (editor: GrapesJS.Editor) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
        },
      },
    }}
  />
);
