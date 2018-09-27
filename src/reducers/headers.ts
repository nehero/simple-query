import * as HeaderActions from '../actions/headers';
import { ActionType, getType } from 'typesafe-actions';
import { Header } from 'src/interfaces';

export type HeaderAction = ActionType<typeof HeaderActions>;

export default function(state: Header[] = [], action: HeaderAction) {
  switch (action.type) {
    case getType(HeaderActions.setHeader):
      return state.map(
        (header, i) =>
          i === action.payload.index ? { ...action.payload.header } : header
      );
    case getType(HeaderActions.addHeader):
      return [...state, { name: '', value: '' }];
    case getType(HeaderActions.removeHeader):
      return state.filter((header, i) => i !== action.payload);
    default:
      return state;
  }
}
