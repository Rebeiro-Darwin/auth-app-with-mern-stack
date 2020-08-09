import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import booksReducer from './booksReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  books: booksReducer
});