import axios from 'axios';


const api = axios.create({
  baseURL: 'https://eudg.herokuapp.com/api/v1',
});

export default api