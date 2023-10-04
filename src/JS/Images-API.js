import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39810851-2f095e470d39af6a9025ff75b';


export async function getImages(query, page) {
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            key: KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
            page,
        }
    })
    return response.data;
};

