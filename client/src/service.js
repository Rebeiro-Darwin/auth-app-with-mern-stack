import axios from 'axios';
import books from './books.json';

const baseURL = '/api/users/';

const service = () => ({
  registerUser: (userData) => axios.post(baseURL + 'register', userData),
  loginUser: (userData) => axios.post(baseURL + 'login', userData),
  getBooks: () => axios.get('http://fakerestapi.azurewebsites.net/api/Books'), // to be replaced with service data
});

export default service();
