import { BaseGrapesEditor, GrapesEditorProps } from './BaseGrapesEditor';

import 'grapesjs-blocks-basic';
// @ts-ignore: does not have type declaration
import 'grapesjs-preset-webpage';

export const GrapesWebBuilder = ({ grapesConfig, ...props }: GrapesEditorProps) => (
  <BaseGrapesEditor
    {...props}
    grapesConfig={{ ...grapesConfig, plugins: ['grapesjs-blocks-basic', 'gjs-preset-webpage'] }}
  />
);
