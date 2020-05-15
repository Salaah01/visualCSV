/**Graph Components */
import React from 'react';

import {
  Bar,
  Pie,
  Doughnut,
  HorizontalBar,
  Line,
  Polar,
  Radar,
  Scatter,
} from 'react-chartjs-2';

const graph = (type, graphProps) => {
  switch (type.toLowerCase()) {
    case 'bar':
      return <Bar {...graphProps} />;
    case 'pie':
      return <Pie {...graphProps} />;
    case 'doughnut':
      return <Doughnut {...graphProps} />;
    case 'horizontal bar':
      return <HorizontalBar {...graphProps} />;
    case 'line':
      return <Line {...graphProps} />;
    case 'polar':
      return <Polar {...graphProps} />;
    case 'radar':
      return <Radar {...graphProps} />;
    case 'scatter':
      return <Scatter {...graphProps} />;
    default:
      throw Error('chart not supported.');
  }
};

export default graph;
