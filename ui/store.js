import middlewares from './middlewares';
import {compose, createStore, applyMiddleware} from 'redux';
import {enableBatching} from 'redux-batched-actions';

export default function configure(reducers, initial) {
  const store = createStore(enableBatching(reducers), initial, compose(
    applyMiddleware.apply(this, middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
