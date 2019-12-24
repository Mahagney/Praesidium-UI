import { createStore, applyMiddleware, compose } from 'redux';
import { LOG_OUT_USER } from './actions/action-types';
import appReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOG_OUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for redux dev tools
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
