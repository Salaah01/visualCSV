/**Constants to be shared by this package. */

// The prefix for the id of the HTML elements which will contain the header
// (primary key) for a field.
export const HEADER_PK_ELEM_ID_PREFIX = 'data-primary-key__';

// Used to retrieve all elements which contain a file name and the PK for that
// file.
export const CONTENT_FOR_FILE_PK_NAME = 'CONTENT_FOR_FILE_PK_NAME';

// Data provided by the server
export const SERVER_USER_ID = document.getElementById('user-id').innerText;
export const SERVER_USER_TABLES = JSON.parse(
  document.getElementById('user-tables-data').innerText,
);
