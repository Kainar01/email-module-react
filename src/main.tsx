import ReactEmailModule from './index';

const demo = {
  assets: [],
  styles: [
    {
      selectors: ['#ifxr'],
      style: {
        height: '150px',
        margin: '0 auto 10px auto',
        padding: '5px 5px 5px 5px',
        width: '100%',
      },
    },
    {
      selectors: ['#in6e'],
      style: {
        padding: '0',
        margin: '0',
        'vertical-align': 'top',
      },
    },
    {
      selectors: ['#i9vj'],
      style: {
        height: '150px',
        margin: '0 auto 10px auto',
        padding: '5px 5px 5px 5px',
        width: '100%',
      },
    },
    {
      selectors: ['#in2w'],
      style: {
        padding: '0',
        margin: '0',
        'vertical-align': 'top',
        width: '33.3333%',
      },
    },
    {
      selectors: ['#iedy'],
      style: {
        padding: '0',
        margin: '0',
        'vertical-align': 'top',
        width: '33.3333%',
      },
    },
    {
      selectors: ['#i16oh'],
      style: {
        padding: '0',
        margin: '0',
        'vertical-align': 'top',
        width: '33.3333%',
      },
    },
    {
      selectors: ['#i1hn9'],
      style: {
        padding: '10px',
      },
    },
    {
      selectors: ['button'],
      style: {
        'background-color': '#c52121',
        'border-collapse': 'separate',
        border: '23px solid black',
      },
    },
    {
      selectors: ['divider'],
      style: {
        'background-color': 'rgba(0, 0, 0, 0.1)',
        height: '1px',
      },
    },
    {
      selectors: ['#iaul6'],
      style: {
        width: '100%',
        'margin-top': '10px',
        'margin-bottom': '10px',
      },
    },
  ],
  pages: [
    {
      frames: [
        {
          component: {
            type: 'wrapper',
            stylable: [
              'background',
              'background-color',
              'background-image',
              'background-repeat',
              'background-attachment',
              'background-position',
              'background-size',
            ],
            attributes: {
              id: 'ikiq',
            },
            components: [
              {
                type: 'table',
                attributes: {
                  id: 'ifxr',
                },
                components: [
                  {
                    type: 'tbody',
                    attributes: {
                      id: 'ia6g',
                    },
                    components: [
                      {
                        type: 'row',
                        components: [
                          {
                            type: 'cell',
                            attributes: {
                              id: 'in6e',
                            },
                            components: [
                              {
                                type: 'table',
                                attributes: {
                                  id: 'i9vj',
                                },
                                components: [
                                  {
                                    type: 'tbody',
                                    components: [
                                      {
                                        type: 'row',
                                        components: [
                                          {
                                            type: 'cell',
                                            attributes: {
                                              id: 'in2w',
                                            },
                                          },
                                          {
                                            type: 'cell',
                                            attributes: {
                                              id: 'iedy',
                                            },
                                            components: [
                                              {
                                                type: 'text',
                                                attributes: {
                                                  id: 'i1hn9',
                                                },
                                                components: [
                                                  {
                                                    type: 'textnode',
                                                    content:
                                                      'Hello, this is a demo template to see how grapes works',
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            type: 'cell',
                                            attributes: {
                                              id: 'i16oh',
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'table',
                attributes: {
                  id: 'iaul6',
                },
                components: [
                  {
                    type: 'tbody',
                    components: [
                      {
                        type: 'row',
                        components: [
                          {
                            type: 'cell',
                            classes: ['divider'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'link',
                classes: ['button'],
                components: [
                  {
                    type: 'textnode',
                    content: 'Button',
                  },
                ],
              },
            ],
          },
        },
      ],
      id: 'cFxIe54vFRxGAh7m',
    },
  ],
};
const instance = ReactEmailModule.renderTemplate({
  containerId: 'root',
  uid: 'helo',
  templateJSON: demo,
  templateHTML: '<b>helo</b>',
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

const instance1 = ReactEmailModule.renderTemplate({
  containerId: 'root1',
  uid: 'helo1',
  templateJSON: demo,
  templateHTML: '<b>helo</b>',
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

document.getElementById('button1')?.addEventListener('click', () => {
  instance1.saveTemplate();
});
