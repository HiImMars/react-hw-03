const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39989527-63a943bfa31d62c32e5f6cf04';

export const getGalleryItems = async (searchValue, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};
