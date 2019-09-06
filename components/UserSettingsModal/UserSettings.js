import { useState, useCallback } from 'react';
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

const MainUserSettings = styled.div``;

const UserSettings = ({ isShowing, hide }) => {
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
        <SettingsConsumer>
          {({ state, toggleAnalytic }) =>
            Object.keys(state.columns).map((analytic) => {
              return (
                <label htmlFor={`settings-${analytic}`} key={`settings-${analytic}`}>
                  {analytic.toUpperCase()}
                  <Checkbox
                    isChecked={state.columns[analytic]}
                    handleClick={toggleAnalytic}
                    name={analytic}
                  />
                </label>
              );
            })
          }
        </SettingsConsumer>
      </ColumnSettings>
    </Modal>
  );
};

export default UserSettings;
