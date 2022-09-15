import { GrapesEditor, GrapesEditorProps } from './BaseGrapesEditor';

import 'grapesjs-blocks-basic';
// @ts-ignore: does not have type declaration
import 'grapesjs-preset-webpage';

export const GrapesWebBuilder = ({ grapesConfig, ...props }: GrapesEditorProps) => (
  <GrapesEditor
    {...props}
    grapesConfig={{ ...grapesConfig, plugins: ['gjs-preset-webpage', 'gjs-preset-webpage'] }}
  />
);
