import axios from 'axios';
const API_KEY = '38926821-b8c8002029c81a405b7f36852';

export const fetchAllImagesByQuery = async query => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal`
  );
  return data;
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
