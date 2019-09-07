import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Checkbox from '../Checkbox/Checkbox';
import { SettingsConsumer } from '../SettingsProvider/SettingsProvider';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100%;
`;

const ColumnSettings = styled.div`
  display: ${(props) => props.display || 'grid'};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-row-gap: 2rem;
  label {
    display: flex;
    justify-content: space-between;
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.library};
  /* height: 100%; */
  align-items: center;
  user-select: none;

  h3 {
    padding: 0.5rem 0;
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
  .setting-active {
    color: black;
    background-color: ${(props) => props.theme.color.green};
  }
`;

const AllSettingsArea = styled.div`
  padding: 2.5rem;
`;

const GeneralSettings = styled.div`
  display: ${(props) => props.display || 'grid'};
`;

const LocationSettings = styled.div`
  display: ${(props) => props.display || 'grid'};
`;

const UserSettingsModal = ({ isShowing, hide }) => {
  const [categoryView, setCategoryView] = useState('columns');

  const handleClick = (e) => {
    setCategoryView(e.target.dataset.value);
  };
  return (
    <Modal isShowing={isShowing} hide={hide} height="60vh" width="80vw" padding="0">
      <Container>
        <SideBar onClick={handleClick}>
          <h3 data-value="general" className={categoryView === 'general' ? 'setting-active' : ''}>
            General
          </h3>
          <h3 data-value="columns" className={categoryView === 'columns' ? 'setting-active' : ''}>
            Columns
          </h3>
          <h3 data-value="location" className={categoryView === 'location' ? 'setting-active' : ''}>
            Location
          </h3>
        </SideBar>
        <AllSettingsArea>
          <GeneralSettings display={categoryView === 'general' ? '' : 'none'}>
            <label>
              Only show events:
              <select name="event_radius" id="settings-event_radius">
                <option value="5">within 5 miles</option>
                <option value="10">within 10 miles</option>
                <option value="25">within 25 miles</option>
                <option value={false}>Show all events</option>
              </select>
            </label>
          </GeneralSettings>
          <ColumnSettings display={categoryView === 'columns' ? '' : 'none'}>
            <SettingsConsumer>
              {({ state, toggleAnalytic }) =>
                Object.keys(state.columns).map((analytic) => {
                  return (
                    <label htmlFor={`settings-${analytic}`} key={`settings-${analytic}`}>
                      <p>{analytic.toUpperCase()}</p>
                      <Checkbox
                        isChecked={state.columns[analytic]}
                        handleClick={toggleAnalytic}
                        name={analytic}
                        id={`settings-${analytic}`}
                      />
                    </label>
                  );
                })
              }
            </SettingsConsumer>
          </ColumnSettings>
          <LocationSettings display={categoryView === 'location' ? '' : 'none'}>
            I'm the location settings
          </LocationSettings>
        </AllSettingsArea>
      </Container>
    </Modal>
  );
};

export default UserSettingsModal;
