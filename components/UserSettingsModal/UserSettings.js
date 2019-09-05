import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Checkbox from '../Checkbox/Checkbox';
import { SettingsConsumer } from '../SettingsProvider/SettingsProvider';

const ColumnSettings = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.5rem;
  input {
    margin: 0.5rem;
  }
`;

const UserSettings = ({ isShowing, hide }) => {
  // pseudo provider state
  const settingsFromDb = {
    columns: {
      acousticness: true,
      danceability: true,
      energy: true,
      instrumentalness: true,
      loudness: true,
      tempo: true,
      valence: true,
      speechiness: true,
      liveness: true,
    },
    limitEventsByRadius: false, // value is miles, [false, 5, 10, 25]
    allowLocation: false,

    forcedOverlayOnCards: false,
    onlyArtistsWithEvents: false,
  };

  const MainUserSettings = styled.div``;
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <h1>Settings</h1>

      <MainUserSettings>
        {/* <label htmlFor="">
          Only show events:
          <select name="event_radius" id="settings-event_radius" onChange={updateEventRadius}>
            <option value="5">within 5 miles</option>
            <option value="10">within 10 miles</option>
            <option value="25">within 25 miles</option>
            <option value={false}>Show all events</option>
          </select>
        </label> */}
      </MainUserSettings>
      <h3>Library Analytics</h3>
      <ColumnSettings>
        {Object.keys(settingsFromDb.columns).map((analytic) => (
          <SettingsConsumer>
            {({ state, toggleSetting }) => (
              <label htmlFor={`settings-${analytic}`}>
                {analytic.toUpperCase()}
                <Checkbox isChecked={state[analytic]} handleClick={toggleSetting} name={analytic} />
              </label>
            )}
          </SettingsConsumer>
        ))}
      </ColumnSettings>
    </Modal>
  );
};

export default UserSettings;
