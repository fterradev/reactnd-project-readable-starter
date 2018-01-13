import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/material-components-web/dist/material-components-web.css';
import '../node_modules/snackbarjs/dist/snackbar.min.css';
import '../node_modules/snackbarjs/themes-css/material.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
