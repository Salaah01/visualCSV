/**A single column element. */

// IMPORTS
// Third Party Imports
import React from 'react';

// Local Imports
import classes from './Column.module.scss';

const column = (props) => {
  const name = <p className={classes.column__name}>{props.name}</p>;
  let removeBtn;
  if (props.removeBtn) {
    removeBtn = <span className={classes.column__remove_btn}>X</span>;
  } else {
    removeBtn = null;
  }

  return (
    <div className={classes.column}>
      {name}
      {removeBtn}
    </div>
  );
};

export default column;
