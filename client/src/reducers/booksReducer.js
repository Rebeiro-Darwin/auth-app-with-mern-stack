import { GET_BOOKS, ERROR_GET_BOOKS } from "../actions/types";
import allBooks from "../books.json";

const initialState = {
  books: [],
  isLoading: true,
  isFailed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: allBooks,
        isLoading: false,
      };
    case ERROR_GET_BOOKS:
      return {
        ...state,
        isFailed: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
