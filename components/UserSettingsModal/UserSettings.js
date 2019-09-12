import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Slider from '../Checkbox/Slider';
import { SettingsConsumer } from '../SettingsProvider/SettingsProvider';
import Dropdown from '../Dropdown/NavDropdown';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  height: 100%;
`;

const SideBar = styled.div`
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.tailwind.gray3};
  color: ${(props) => props.theme.color.library};
  align-items: center;
  user-select: none;
`;

const ProfilePicture = styled.img`
  border-radius: 100px;
  width: 75%;
  height: auto;
  background-color: darkgray;
  margin: 1rem;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
`;

const ContextMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.5;
  padding-right: 1rem;
  nav {
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
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.color.library};
`;

const SettingsRow = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 40px;
  border-top: 0.5px solid ${(props) => props.theme.color.gray};
  border-bottom: 0.5px solid ${(props) => props.theme.color.gray};
  opacity: 0.9;
  :hover {
    background-color: ${(props) => props.theme.color.gray};
    opacity: 1;
  }
`;

const GeneralSettings = styled.div`
  display: ${(props) => props.display || 'flex'};
  flex-direction: column;
  flex: 7;
  padding: 1.5rem 0;
`;

const AnalyticSettings = styled(GeneralSettings)`
  display: ${(props) => props.display || 'flex'};
  flex-direction: column;
`;

const LocationSettings = styled(GeneralSettings)`
  display: ${(props) => props.display || 'flex'};
`;

const UserSettingsModal = ({ isShowing, hide, img, name }) => {
  const [categoryView, setCategoryView] = useState('location');

  const changeSubsection = (e) => {
    setCategoryView(e.target.dataset.value);
  };
  return (
    <Modal isShowing={isShowing} hide={hide} height="560px" width="1000px" padding="0">
      <SettingsConsumer>
        {({ state, toggleAnalytic, toggleSetting, setEventRadius }) => (
          <Container>
            <SideBar>
              <h2>{name}</h2>
              <ProfilePicture src={img || '/static/icons/user-silhouette.svg'}></ProfilePicture>
              <a href={`${process.env.FRONTEND_HOST}/logout`}>
                <h2>Log out - EventSpotter</h2>
              </a>
              <a href="https://accounts.spotify.com/en-US/logout/">
                <h2>Log out - Spotify</h2>
              </a>
            </SideBar>
            <AllSettingsArea>
              <ContextMenu onClick={changeSubsection}>
                <nav
                  data-value="general"
                  className={categoryView === 'general' ? 'setting-active' : ''}
                >
                  General
                </nav>
                <nav
                  data-value="analytics"
                  className={categoryView === 'analytics' ? 'setting-active' : ''}
                >
                  Analytics
                </nav>
                <nav
                  data-value="location"
                  className={categoryView === 'location' ? 'setting-active' : ''}
                >
                  Location
                </nav>
              </ContextMenu>
              <GeneralSettings display={categoryView === 'general' ? '' : 'none'}>
                <SettingsRow>
                  <p>Forced Overlay on Cards (default: off)</p>
                  <Slider
                    isChecked={state.forcedOverlay}
                    handleClick={toggleSetting}
                    name="forcedOverlay"
                  />
                </SettingsRow>
                <SettingsRow>
                  <p>Filter Artists with no events</p>
                  <Slider
                    isChecked={state.onlyArtistsWithEvents}
                    handleClick={toggleSetting}
                    name="onlyArtistsWithEvents"
                  />
                </SettingsRow>
              </GeneralSettings>
              <AnalyticSettings display={categoryView === 'analytics' ? '' : 'none'}>
                {Object.keys(state.columns).map((analytic) => {
                  return (
                    <SettingsRow htmlFor={`settings-${analytic}`} key={`settings-${analytic}`}>
                      <p>{analytic.toUpperCase()}</p>
                      <Slider
                        isChecked={state.columns[analytic]}
                        handleClick={toggleAnalytic}
                        name={analytic}
                        id={`settings-${analytic}`}
                      />
                    </SettingsRow>
                  );
                })}
                {/* <SettingsRow>
                  <p>All Analytics</p>
                  <Slider
                    isChecked={Object.values(state.columns).every(Boolean)}
                    handleClick={toggleAnalytic}
                    name="all"
                  />
                </SettingsRow> */}
              </AnalyticSettings>
              <LocationSettings display={categoryView === 'location' ? '' : 'none'}>
                <SettingsRow>
                  <p>Enable Location Services*</p>
                  <Slider
                    isChecked={state.allowLocation}
                    handleClick={toggleSetting}
                    name="allowLocation"
                  />
                </SettingsRow>
                <SettingsRow>
                  <p>Only show events*:</p>
                  <select
                    value={state.eventRadius}
                    onChange={(e) => setEventRadius(e.target.value)}
                  >
                    <option value={5}>within 5 miles</option>
                    <option value={10}>within 10 miles</option>
                    <option value={25}>within 25 miles</option>
                    <option value={0}>Show all events</option>
                  </select>
                </SettingsRow>
              </LocationSettings>
              <p>* = currently being built</p>
            </AllSettingsArea>
          </Container>
        )}
      </SettingsConsumer>
    </Modal>
  );
};

export default UserSettingsModal;
