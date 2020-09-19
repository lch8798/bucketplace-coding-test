import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import feed from '@modules/feed/index';

const rootReducer = combineReducers({
    feed,
});

// Make Redux Store
function configureStore() {
    const middlewares = [thunk];
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, enhancer);
    return store;
}

export default configureStore();

export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;
