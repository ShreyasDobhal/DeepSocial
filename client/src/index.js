import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import $ from 'jquery';

import './index.css';
import './styles/styles.css';
import './styles/signup.css';
import './styles/nav-bar.css';
import './styles/add-post.css';
import './styles/post.css';
import './styles/comment.css';
import './styles/home-page.css';
import './styles/profile-page.css';
import './styles/error.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';

import * as serviceWorker from './serviceWorker';
import App from './App';

import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
