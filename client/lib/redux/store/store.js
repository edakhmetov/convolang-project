import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  user: null,
}

export const configureStore = (preloadedState = initialState) => {
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};