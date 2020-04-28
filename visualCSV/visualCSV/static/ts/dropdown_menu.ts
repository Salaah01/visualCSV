// =============================================================================
// Date Created: 16/12/2019
// Created By: Salaah Amin
// ============================================================================
// SCOPE:
// ------
// Custom dropdown menu
//
// RELATED FILES:
// --------------------
// _dropdown_menu.scss
//
// PURPOSE:
// --------
// Provides functions for a custom dropdown menu.
// The functions will work for dropdown menus in the following format:
//
// <form>
//   ...
//   <div class="dropdown_menu">
//     <div class="dropdown_menu__selected">
//       <span>Colour</span>
//     </div>
//     <div class="dropdown_menu__options">
//       <label class="dropdown_menu__options__label" for="colour-red">
//       <input
//         class="dropdown_menu__options__radio_btn"
//         type="radio"
//         name="f-colour"
//         id=colour-red
//         value="red"
//       >
//     </div>
//   </div>
//   ...
// </form>

// CSS should be set up to hide the input tags and rely on the labels to select
// the radio button.
//
// FUNCTIONS:
// ----------
//  - When user clicks on the dropdown menu, expand the list of options.
//  - When user presses an option, highlight that option, update the
//    button's inner text to match that off the button text.
//  - When user clicks outside, close all menus.
// =============================================================================

// =============================================================================
// DropdownMenu Class
class DropdownMenu {
  /**
   * Sets up the functionality for the custom dropdown menus.
   * These include:
   *  - Toggle open/close of the menu on clicking the button
   *  - Close the menu on clicking outside
   *  - On selecting an item:
   *    - Highlight that item
   *    - Change the text of the button the text of the option selected
   *
   * Note: this class will not handle API calls.
   */

  ddMenus = document.getElementsByClassName(
    'dropdown_menu',
  ) as HTMLCollectionOf<HTMLDivElement>;

  // ---------------------------------------------------------------------------
  constructor() {
    /**
     * No arguments - class uses objects found on the DOM.
     */

    // Adds function to close all menus when clicking outside of element
    this.close_menu();

    console.log(this.ddMenus)

    // Build the functions for all menu elements.
    for (let menuId = 0; menuId < this.ddMenus.length; menuId++) {
      this.build_menu(this.ddMenus[menuId]);
    }
  }

  // ---------------------------------------------------------------------------
  close_menu() {
    /**
     * Closes all menus when clicked outside on another filter button.
     * Also carries function to close the nav-menus.
     */

    const filterBtns = document.getElementsByClassName(
      'dropdown_menu__selected',
    ) as HTMLCollectionOf<HTMLDivElement>;

    const optionLists = document.getElementsByClassName(
      'dropdown_menu__options',
    );

    document.addEventListener('click', () => {
      for (let idx = 0; idx < optionLists.length; idx++) {
        optionLists[idx].classList.add('dropdown_menu__options--hide');
      }
    });

    const navSubMenus = document.querySelectorAll(
      '.nav__option__dropdown-opts',
    );
    for (let i = 0; i < filterBtns.length; i++) {
      const selectedBtn = filterBtns[i];

      selectedBtn.addEventListener('click', () => {
        // Close nav menus
        for (let idx = 0; idx < navSubMenus.length; idx++) {
          navSubMenus[idx].classList.replace(
            'nav__option__dropdown-opts--expanded',
            'nav__option__dropdown-opts--collapse',
          );
        }

        // Close all other filters lists
        // Each button and their child elements contain the attribute
        // "filter-for".
        // Likewise, each dropdown option div contain the same attribute
        // This checks for the button pressed, if its "filter-for" attribute
        // matches that of its dropdown options. if not, then close.
        for (let j = 0; j < filterBtns.length; j++) {
          const targetElem = filterBtns[j];

          if (
            targetElem.getAttribute('filter-for') !=
            selectedBtn.getAttribute('filter-for')
          ) {
            // Just incase the structure changes, and the next sibling ins not the options list
            if (
              targetElem.nextElementSibling!.classList.contains(
                'dropdown_menu__options',
              )
            ) {
              targetElem.nextElementSibling?.classList.add(
                'dropdown_menu__options--hide',
              );
            }
          }
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  build_menu(ddMenu: HTMLDivElement) {
    /**
     * Builds functionality onto each dropdown menu.
     */
    const optionsBtn = ddMenu.getElementsByClassName(
      'dropdown_menu__selected',
    )[0] as HTMLDivElement;
    const optionsListContainer = ddMenu.getElementsByClassName(
      'dropdown_menu__options',
    )[0] as HTMLDivElement;
    const optionsListItems = optionsListContainer.getElementsByClassName(
      'dropdown_menu__options__label',
    ) as HTMLCollectionOf<HTMLLabelElement>;

    // Event listener on the dropdown button which will open/close the options
    // list.
    optionsBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      optionsListContainer.classList.toggle('dropdown_menu__options--hide');
    });

    // Event listener setup for each option
    for (
      let optionIter = 0;
      optionIter < optionsListItems.length;
      optionIter++
    ) {
      let listItem = optionsListItems[optionIter];
      listItem.addEventListener('click', () => {
        // Remove the highlight from all list items and reapply to the selected
        // list item only
        for (
          let optionSubIter = 0;
          optionSubIter < optionsListItems.length;
          optionSubIter++
        ) {
          optionsListItems[optionSubIter].classList.remove(
            'dropdown_menu__options__label--selected',
          );
        }
        listItem.classList.add('dropdown_menu__options__label--selected');

        // Change the text of the button to the text of the selected item
        optionsBtn.innerText = listItem.innerText;

        // Update the hidden input values
        // Close the menu
        optionsListContainer.classList.add('dropdown_menu__options--hide');
      });
    }
  }
}

export default DropdownMenu;
