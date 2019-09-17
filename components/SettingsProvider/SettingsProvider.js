import { createContext, Component } from 'react';

const SettingsContext = createContext();

class SettingsProvider extends Component {
  constructor(props) {
    super(props);
    this.toggleSetting = (setting) => {
      this.setState((state) => ({ [setting]: !state[setting] }));
    };

    this.toggleGeneral = (setting) => {
      this.setState((state) => ({
        general: {
          ...state.general,
          [setting]: !state.general[setting],
        },
      }));
    };

    this.toggleAnalytic = (analytic) => {
      this.setState((state) => ({
        analytics: {
          ...state.analytics,
          [analytic]: !state.analytics[analytic],
        },
      }));
    };

    this.changeSetting = (category, key, value) => {
      this.setState((state) => ({
        [category]: {
          ...state[category],
          [key]: value,
        },
      }));
    };

    this.state = {
      analytics: {
        acousticness: false,
        danceability: false,
        energy: false,
        instrumentalness: false,
        loudness: false,
        tempo: false,
        valence: false,
        speechiness: false,
        liveness: false,
      },
      location: {
        eventRadius: 0, // ie dont allow location -- infinite event radius
        latitude: null,
        longitude: null,
        zipcode: null,
      },
      general: {
        forcedOverlay: false,
        onlyArtistsWithEvents: false,
      },
    };

    this.componentDidMount = async () => {
      console.log('PROVIDER MOUNTING');

      const locationSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ locationSettings: latitude, longitude });
      };

      const locationFail = () => {
        this.setState({ allowLocation: false });
      };
      if (this.state.allowLocation) {
        console.log('location allowed, retrieving coords');
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
      } else {
        this.setState({ eventRadius: 0 });
      }
      // if settings in local storage
      // update state with local storage settings
      // else
      // fetch settings from api
      // update local storage
      // update state
    };
  }

  render() {
    const { children } = this.props;
    return (
      <SettingsContext.Provider
        value={{
          state: this.state,
          changeSetting: this.changeSetting,
          toggleGeneral: this.toggleGeneral,
          toggleAnalytic: this.toggleAnalytic,
        }}
      >
        {children}
      </SettingsContext.Provider>
    );
  }
}

const SettingsConsumer = SettingsContext.Consumer;

export { SettingsConsumer };
export default SettingsProvider;
