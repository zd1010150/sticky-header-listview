import ReactDOM from 'react-dom/server';
import configureStore from 'store/configureStore';
import { hashHistory } from 'react-router';

import loadFocus from './pages/mobile/Focus';

const store = configureStore({}, hashHistory);

const Focus = loadFocus(store);
ReactDOM.renderToString(Focus);
