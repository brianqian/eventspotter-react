import { createContext, Component } from 'react';

const SettingsContext = createContext();

class SettingsProvider extends Component {
  constructor(props) {
    super(props);

    this.toggleSetting = (setting) => {
      console.log('toggling setting', setting);
      this.setState({ [setting]: !this.state[setting] });
    };

    this.toggleAnalytic = (analytic) => {
      this.setState((state) => ({
        ...state,
        columns: {
          ...state.columns,
          [analytic]: !state.columns[analytic],
        },
      }));
    };

    this.state = {
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

    this.componentDidMount = () => {
      console.log('user settings provider mounted');
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
          toggleSetting: this.toggleSetting,
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
