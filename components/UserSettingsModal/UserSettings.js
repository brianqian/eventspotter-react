import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Slider from '../Checkbox/Slider';
import { SettingsConsumer } from '../SettingsProvider/SettingsProvider';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  height: 100%;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.tailwind.gray4};
  color: ${(props) => props.theme.color.library};
  align-items: center;
  user-select: none;
`;

const ContextMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.5;
  padding-right: 1rem;
  h3 {
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.tailwind.gray2};
    opacity: 0.7;
    user-select: none;
    padding-bottom: 6px;
    :hover {
      color: white;
      opacity: 1;
    }
  }
  .setting-active {
    border-bottom: 1px solid ${(props) => props.theme.color.green};
    opacity: 1;
  }
`;

const AllSettingsArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3.5rem;
  background-color: ${(props) => props.theme.color.library};
  label {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
`;

const GeneralSettings = styled.div`
  display: ${(props) => props.display || 'flex'};
  flex-direction: column;
  flex: 7;
  padding: 1.5rem 0;
`;

const ColumnSettings = styled(GeneralSettings)`
  display: ${(props) => props.display || 'flex'};
  flex-direction: column;
`;

const LocationSettings = styled(GeneralSettings)`
  display: ${(props) => props.display || 'flex'};
`;

const UserSettingsModal = ({ isShowing, hide }) => {
  const [categoryView, setCategoryView] = useState('general');

  const changeSubsection = (e) => {
    setCategoryView(e.target.dataset.value);
  };
  return (
    <Modal isShowing={isShowing} hide={hide} height="60vh" width="80vw" padding="0">
      <Container>
        <SideBar>side barrr</SideBar>
        <AllSettingsArea>
          <ContextMenu onClick={changeSubsection}>
            <h3 data-value="general" className={categoryView === 'general' ? 'setting-active' : ''}>
              General
            </h3>
            <h3 data-value="columns" className={categoryView === 'columns' ? 'setting-active' : ''}>
              Columns
            </h3>
            <h3
              data-value="location"
              className={categoryView === 'location' ? 'setting-active' : ''}
            >
              Location
            </h3>
          </ContextMenu>
          <GeneralSettings display={categoryView === 'general' ? '' : 'none'}>
            <label htmlFor="">
              <p>Forced Overlay on Cards (default: off)</p>
              <select name="" id="" onChange={(e) => console.log(e.target.value)}>
                <option value="false">Off</option>
                <option value="true">On</option>
              </select>
            </label>
            <label>
              <p>Only show events:</p>
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
                      <Slider
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
            <p>Enable Location Services</p>
            {/* limitEventsByRadius: false, // value is miles, [false, 5, 10, 25]
      allowLocation: false,
      forcedOverlayOnCards: false,
      onlyArtistsWithEvents: false, */}
          </LocationSettings>
        </AllSettingsArea>
      </Container>
    </Modal>
  );
};

export default UserSettingsModal;
