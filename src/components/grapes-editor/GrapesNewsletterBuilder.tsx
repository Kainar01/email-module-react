import { BaseGrapesEditor, GrapesEditorProps } from './BaseGrapesEditor';

import 'grapesjs-preset-newsletter';

export const GrapesNewsletterBuilder = ({ grapesConfig, ...props }: GrapesEditorProps) => (
  
  <BaseGrapesEditor
    {...props}
    grapesConfig={{ ...grapesConfig, plugins: ['gjs-preset-newsletter'] }}
  />
);
