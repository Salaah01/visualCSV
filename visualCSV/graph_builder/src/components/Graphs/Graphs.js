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
  }
};

export default graph;
