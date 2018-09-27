import { createStore, combineReducers } from 'redux';
import { Header } from './interfaces';

import HeaderReducer from './reducers/headers';

export interface StoreState {
  headers: Header[]
};

export default createStore(
  combineReducers({
    headers: HeaderReducer
  })
);
