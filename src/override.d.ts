import 'grapesjs';

declare module "grapesjs" {
  namespace grapesjs {
    interface ButtonOptions {
      id?: string;
      label?: string;
      tagName?: 'span';
      className?: string;
      command?: string | ((editor: Editor, opts?: any) => void);
      context?: string;
      buttons?: any[];
      attributes?: object;
      options?: object;
      active?: boolean;
      dragDrop?: boolean;
      togglable?: boolean;
      runDefaultCommand?: boolean;
      stopDefaultCommand?: boolean;
      disable?: boolean;  
    }
  }
}