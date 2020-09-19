import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import pid from '@modules/pid/index';

const rootReducer = combineReducers({
    pid,
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
