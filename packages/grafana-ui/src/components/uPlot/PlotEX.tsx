import {
  compareArrayValues,
  compareDataFrameStructures,
  DataFrame,
  formattedValueToString,
  outerJoinDataFrames,
} from '@grafana/data';
import React, { PureComponent } from 'react';
import { AlignedData } from 'uplot';
import { Themeable } from '../../types';
import { UPlotConfigBuilder } from './config/UPlotConfigBuilder';
import { PlotConfig } from './types';

// Things needed by uPlot
export interface PlotProps {
  data: AlignedData;
  config: PlotConfig; // extends uplot config?
}

export interface CustomCompProps extends Themeable {
  data: DataFrame[];
  something: number;
  somethingElse: string;
}

export interface CustomCompState extends PlotProps {
  moreThings: string;
}

export class CustomComp extends PureComponent<CustomCompProps, CustomCompState> {
  componentDidUpdate(oldProps: CustomCompProps) {
    // Explicitly detect changes that matter for uPlot config
    const configNeedsUpdate =
      oldProps.something !== this.props.something || // a
      oldProps.somethingElse !== this.props.somethingElse; // b

    // Data has changed
    if (configNeedsUpdate || this.props.data !== oldProps.data) {
      const update = {} as CustomCompState;
      const join = outerJoinDataFrames({
        frames: this.props.data,
        enforceSort: true,
        keepOriginIndices: true,
      });
      update.data = join!.fields.map((f) => f.values.toArray()) as AlignedData;

      // Check if the structure has changed
      if (configNeedsUpdate || !compareArrayValues(this.props.data, oldProps.data, compareDataFrameStructures)) {
        const builder = new UPlotConfigBuilder();
        // TODO...
        builder.addAxis({
          scaleKey: 'xxx',
          theme: this.props.theme,
          formatValue: (v: any) => {
            // No need to useRef for any functions!! :)
            return formattedValueToString(this.props.data[0].fields[0].display!(v));
          },
        });

        update.config = builder.getConfig();
      }
      this.setState(update);
    }
  }

  render() {
    const { data, config } = this.state;
    console.log('DATA', data, config);
    return <div>TODO The </div>;
  }
}
