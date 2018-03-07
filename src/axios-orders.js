import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburger-63715.firebaseio.com/',
  });

  export default instance;