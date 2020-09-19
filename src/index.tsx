import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@modules/index';
import App from '~/App';
import * as serviceWorker from '~/serviceWorker';

// reset style
import '@stylesheets/index.css';
import '@stylesheets/reset.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
