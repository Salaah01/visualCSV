/**For each header for a given file, returns a each table header with options
 * to pick either assign headers as primary or foreign keys.
 */

// IMPORTS
// Third Party Imports
import React, { Fragment } from 'react';

// Local Imports
import classes from './HeaderAttributes.module.scss';

const HeaderAttributes = (props) => {
  /**For each header for a given element, load options to pick mark the header
   * as a primary key or assign foreign keys.
   *
   * Args:
   *  props.file: (obj) A single file object.
   *  props.fileID (str|num) File's unique idenifier.
   *  props.tables (obj) A object containing `existing` and `new` key
   *    which define all the headers for this user (including those which have
   *    not yet been loaded.)
   */

  // Handling edge cases
  if (!props.file || !props.tables || !props.file.headers) {
    return null;
  }

  const fileHeaders = props.file.headers;

  // From the list of tables, will exclude this file's name so it is not
  // in the list of foreign key options.
  const allTables = {
    existing: props.tables.existing,
    new: props.tables.new.filter((header) => header !== props.fileID),
  };

  const existingTableOptions = (header) =>
    /**Creates an array of option elements for the existing tables. */
    allTables.existing.map((existingTable) => (
      <option value={existingTable[0]} header={header}>
        {existingTable[1]}
      </option>
    ));

  const newTableOptions = (header) =>
    /**Creates an array of options elements for the new tables which have not
     * yet been added.
     */
    allTables.new.map((newTable) => (
      <option header={header}>{newTable}</option>
    ));

  const setForeignKeyHandler = (id, header, fk) => {
    /**Handlers the onChange event on the foreign key select options.
     * If user selects none, then delete the foreign key associated to the
     * header, else update the foreign key.
     */

     console.log(id, header);

    if (fk !== '__none') {
      props.setForeignKey(id, header, fk);
    } else {
      props.removeForeignKey(id, header);
    }
  };

  const elems = fileHeaders.map((fileHeader) => (
    <Fragment>
      <p>{fileHeader}</p>
      <input
        type="radio"
        name={props.file.name}
        value={fileHeader}
        onClick={(event) =>
          props.setPrimaryKey(props.fileID, event.target.value)
        }
      />
      <select
        onChange={(event) =>
          setForeignKeyHandler(
            props.fileID,
            event.target[event.target.selectedIndex].getAttribute('header'),
            event.target.value,
          )
        }
      >
        <option header={fileHeader} value="__none">(none)</option>
        {existingTableOptions(fileHeader)}
        {newTableOptions(fileHeader)}
      </select>
    </Fragment>
  ));

  return (
    <div key={props.file.name} className={classes.HeaderAttributes}>
      <p>Header</p>
      <p>Primary Key</p>
      <p>Foreign Keys</p>
      {elems}
    </div>
  );
};

export default HeaderAttributes;
