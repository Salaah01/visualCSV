/**Dropdown options to selecting the bar type. */

// IMPORTS
// Third Party Imports
import React, { Fragment } from 'react';

// Local Imports
import classes from './GraphTypeDropDown.module.scss';

const graphTypeDropDown = (props) => {
  const options = [
    'Bar',
    'Line',
    'Pie',
    'Doughnut',
    'Horizontal Bar',
    'Polar',
    'Scatter',
    'Radar',
  ].map((option) => (
    <Fragment key={option}>
      <label
        className="dropdown_menu__options__label"
        htmlFor={`graph_option_${option}`}
      >
        {option}
      </label>
      <input
        className="dropdown_menu__options__radio_btn"
        type="radio"
        name={option}
        id={`graph_option_${option}`}
        value={option}
        onClick={() => props.onUpdateType(option)}
      />
    </Fragment>
  ));

  return (
    <form style={{ width: 'fit-content' }}>
      <div className="dropdown_menu">
        <div
          className={`dropdown_menu__selected ${classes.dropdown_menu__selected}`}
        >
          <span>Bar</span>
        </div>
        <div
          className={`dropdown_menu__options dropdown_menu__options--hide ${classes.dropdown_menu__options}`}
        >
          {options}
        </div>
      </div>
    </form>
  );
};

export default graphTypeDropDown;
