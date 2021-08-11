import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21950838-7a0b45ff646ade2665da57e66';

const featchImage = (searchQwery, page) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchQwery}&page=${page}&per_page=12&key=${API_KEY}&image_type=photo&orientation=horizontal`,
    )
    .then(response => response.data.hits);
};

const api = {
  featchImage,
};

export default api;
