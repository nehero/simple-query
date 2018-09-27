import { createAction } from 'typesafe-actions';
import { Header } from '../interfaces';

export interface SetHeaderPayload {
  index: number;
  header: Header;
}

export const setHeader = createAction(
  'SET_HEADER',
  resolve => (index: number, header: Header) =>
    resolve({ index, header } as SetHeaderPayload)
);

export const addHeader = createAction(
  'ADD_HEADER',
  resolve => () => resolve()
);

export const removeHeader = createAction(
  'REMOVE_HEADER',
  resolve => (index: number) => resolve(index)
);
