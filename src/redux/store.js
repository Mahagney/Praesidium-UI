//#region 'NPM DEP'
// eslint-disable-next-line import/no-extraneous-dependencies
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//#region

//#region 'LOCAL DEP'
import { createStore, applyMiddleware, compose } from 'redux';
import { LOG_OUT_USER } from './actions/action-types';
import appReducer from './reducers';
//#region

const rootReducer = (state, action) => {
  let newState = state;
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOG_OUT_USER) {
    localStorage.removeItem('token');
    newState = undefined;
  }

  return appReducer(newState, action);
};

function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for redux dev tools
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}

const store = configureStore();

export default store;
