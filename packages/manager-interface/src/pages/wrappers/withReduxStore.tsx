import { Provider } from 'react-redux';
import { actions } from '~/legacy/actions/browser';
import { configureStore } from '~/legacy/config/configureStore';

let sharedReduxStore: any;

function getOrCreateStore(initialState?) {
  // Always make a new store if server, otherwise state is shared between requests.
  if (typeof window === 'undefined') {
    return configureStore(initialState);
  }

  // Store in global variable if on the client.
  if (typeof sharedReduxStore === 'undefined') {
    return (sharedReduxStore = configureStore(initialState));
  }

  return sharedReduxStore;
}

export default BaseComponent => {
  return class WithReduxStore extends React.Component {
    public static async getInitialProps(context) {
      const reduxStore = getOrCreateStore();

      const appProps = await (BaseComponent.getInitialProps
        ? BaseComponent.getInitialProps({
            ...context,
            reduxStore,
          })
        : {});

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    private reduxStore: any;

    constructor(props) {
      super(props);

      // TODO: Once we get rid of componentDidMount, we can also move this to render().
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    public componentDidMount() {
      if (typeof window !== 'undefined') {
        // TODO: This sucks.
        this.reduxStore.dispatch(actions.loaded());
      }
    }

    public render() {
      return (
        <Provider store={this.reduxStore}>
          <BaseComponent {...this.props} />
        </Provider>
      );
    }
  };
};
