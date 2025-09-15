import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52251600-fd545eaf39516c2667db2508b';

axios.defaults.baseURL = BASE_URL;

export function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data;
    });
}
