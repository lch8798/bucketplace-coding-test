import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import * as serviceWorker from '~/serviceWorker';

// reset style
import '@stylesheets/index.css';
import '@stylesheets/reset.min.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
