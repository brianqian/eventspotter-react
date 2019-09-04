import { useState } from 'react';

// where is this called?
// user settings Frontend

/**
 * User Settings DB => User Settings Frontend => context menu => Library View
 * Context menu only gets initial state from user Setttings but maintains its own state.
 * Views can be changed but don't affect default views until UserSettings is Changed
 * This hook's responsibility is only to update context Menu's state and update DB settings
 */

const useUserSettings = (settingsObject) => {
  /**
   *   settingsObject type:{
   *  columns: ['array of strings']
   *  limitEventsByRadius: boolean,
   *  zipcode: number,
   *  allowUserLocation: boolean
   *  forcedOverlayOnCards: boolean,
   *  limitArtistsByEvents: boolean
   *  }
   *
   * Components that need user settings:
   * libraryPage
   * libraryPage/top artists/top analytic
   * top artists/topanalytic
   * top artists/topanalytic
   *
   */

  const [columnState, setColumnState] = useState(settingsObject.columns);

  const updateUserSettings = () => {
    // make a fetch request to an endpoint for user settings
  };
  const changeSelectedColumns = (newColumns) => {
    // this enacts changes to library view from the context menu
    setColumnState(newColumns);
  };

  return { changeSelectedColumns };
};

export default useUserSettings;
