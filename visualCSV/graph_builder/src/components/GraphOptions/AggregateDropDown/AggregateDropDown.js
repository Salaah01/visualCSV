/**Dropdown options to selecting the aggregate method.. */

// IMPORTS
// Third Party Imports
import React, { Fragment } from 'react';

// Local Imports
import classes from './AggregateDropDown.module.scss';

const aggregateDropDown = (props) => {
  const onClickHandler = (option) => {
    /**Depending on what button the user clicks on dispatches an action to the
     * redux store to either aggregate the values or to un-aggregate.
     */
    if (option) {
      props.onReAggregate(option.toUpperCase());
    } else {
      props.onUnAggregate();
    }
  };

  const nullOption = (
    <Fragment>
      <label
        className="dropdown_menu__options__label"
        htmlFor={`aggregate_option_none`}
      >
        (None)
      </label>
      <input
        className="dropdown_menu__options__radio_btn"
        type="radio"
        name="none"
        id={`aggregate_option_none`}
        value="none"
        onClick={() => onClickHandler('')}
      />
    </Fragment>
  );

  const options = ['Count', 'Sum', 'Average'].map((option) => (
    <Fragment key={option}>
      <label
        className="dropdown_menu__options__label"
        htmlFor={`aggregate_option_${option}`}
      >
        {option}
      </label>
      <input
        className="dropdown_menu__options__radio_btn"
        type="radio"
        name={option}
        id={`aggregate_option_${option}`}
        value={option}
        onClick={() => onClickHandler(option)}
      />
    </Fragment>
  ));

  return (
    <form style={{ width: 'fit-content' }}>
      <div className="dropdown_menu">
        <div
          className={`dropdown_menu__selected ${classes.dropdown_menu__selected}`}
        >
          <span>(None)</span>
        </div>
        <div
          className={`dropdown_menu__options dropdown_menu__options--hide ${classes.dropdown_menu__options}`}
        >
          {nullOption}
          {options}
        </div>
      </div>
    </form>
  );
};

export default aggregateDropDown;
