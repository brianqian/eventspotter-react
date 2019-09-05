import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Checkbox from '../Checkbox/Checkbox';

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

  const [settings, setSettings] = useState(settingsFromDb);

  const updateColumns = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    // makes changes to the provider.
  };

  const updateUserSettings = (isChecked, name, name2) => {
    if (name2) {
      // pseudo makes changes to provider
      setSettings({ ...settings, columns: { ...settings.columns, [name2]: isChecked } });
    } else {
      // pseudo make changes to provider
      setSettings({ ...settings, [name]: isChecked });
    }
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
        {Object.keys(settings.columns).map((analytic) => (
          <label htmlFor={`settings-${analytic}`}>
            {/* <input
              type="checkbox"
              value={analytic}
              key={`settings-${analytic}`}
              id={`settings-${analytic}`}
              onChange={updateColumns}
              checked={settingsFromDb.columns[analytic]}
            /> */}
            {analytic.toUpperCase()}
            <Checkbox
              isChecked={settings.columns[analytic]}
              returnStatus={updateUserSettings}
              name="columns"
              name2={analytic}
            />
          </label>
        ))}
      </ColumnSettings>
    </Modal>
  );
};

export default UserSettings;
