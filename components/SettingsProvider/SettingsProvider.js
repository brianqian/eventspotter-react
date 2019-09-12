import { createContext, Component } from 'react';

const SettingsContext = createContext();

class SettingsProvider extends Component {
  constructor(props) {
    super(props);
    this.toggleSetting = (setting) => {
      this.setState((state) => ({ [setting]: !state[setting] }));
    };

    this.toggleAnalytic = (analytic) => {
      this.setState((state) => ({
        columns: {
          ...state.columns,
          [analytic]: !state.columns[analytic],
        },
      }));
    };

    this.setEventRadius = (value) => {
      this.setState({ eventRadius: value });
    };

    this.state = {
      columns: {
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
      eventRadius: 0, // value is miles, [false, 5, 10, 25]
      allowLocation: false,
      forcedOverlay: false,
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
          setEventRadius: this.setEventRadius,
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
