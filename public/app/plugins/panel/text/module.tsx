import { PanelPlugin } from '@grafana/data';

import { TextPanel } from './TextPanel';
import { textPanelMigrationHandler } from './textPanelMigrationHandler';
import { TextPanelEditor } from './TextPanelEditor';
import { Options, defaultOptions, TextMode } from './model.gen';

export const plugin = new PanelPlugin<Options>(TextPanel)
  .setPanelOptions((builder) => {
    builder
      .addRadio({
        path: 'mode',
        name: 'Mode',
        description: 'text mode of the panel',
        settings: {
          options: [
            { value: TextMode.Markdown, label: 'Markdown' },
            { value: TextMode.Html, label: 'HTML' },
          ],
        },
        defaultValue: defaultOptions.mode,
      })
      .addCustomEditor({
        id: 'content',
        path: 'content',
        name: 'Content',
        description: 'Content of the panel',
        defaultValue: defaultOptions.content,
        editor: TextPanelEditor,
      });
  })
  .setMigrationHandler(textPanelMigrationHandler);
