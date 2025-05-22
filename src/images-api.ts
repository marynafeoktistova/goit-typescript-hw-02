import axios from 'axios';
import { ImageType } from '../src/components/App/App.types';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'IJTkLE_-rfnTuOiAQU5IqXu5ZIKpD5cn88_fnA-K3Bg';

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: ImageType[];
}

export const getImagesUnsplash = async (searchImg: string, pageNumber: number): Promise<UnsplashResponse | undefined> => {
  if (!searchImg.trim()) return;

  try {
    const response = await axios.get<UnsplashResponse>('search/photos', {
      params: {
        query: searchImg,
        page: pageNumber,
        per_page: 10,
        client_id: ACCESS_KEY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching images:', error.message);
  }
};
