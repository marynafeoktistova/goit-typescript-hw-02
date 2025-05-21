import axios from 'axios';

axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `IJTkLE_-rfnTuOiAQU5IqXu5ZIKpD5cn88_fnA-K3Bg`;

export const getImagesUnplash = async (searchImg, pageNumber) => {
  if (!searchImg.trim()) {
    return;
  }

  const params = {
    query: searchImg,
    page: pageNumber,
    per_page: 10,
    client_id: ACCESS_KEY,
  };

  try {
    const response = await axios.get(`search/photos/?${new URLSearchParams(params).toString()}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching images:', error.message);
  }
};
