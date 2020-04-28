/**Line graph options */

// IMPORTS
// Third Party Imports
import React from 'react';

// Local Imports

export const line = (props) => {
  const yAxisStackOpt = (
    <select>
      <option>Yes</option>
      <option selected>No</option>
    </select>
  );

  return yAxisStackOpt;
};

