import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const myApiKey = import.meta.env.VITE_PIXABAY_API_KEY;

export function getImagesByQuery(query, page) {
  const params = {
    key: myApiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  return axios.get(baseUrl, { params }).then(responce => responce.data);
}
