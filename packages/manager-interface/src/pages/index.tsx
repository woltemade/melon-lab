import ReactModal from 'react-modal';
import AppContainer from '~/legacy/containers/App';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');
}

export default AppContainer;
