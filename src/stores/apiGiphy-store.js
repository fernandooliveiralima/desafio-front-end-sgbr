/* import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useApiGyphyStore = defineStore('ApiGyphy', () => {
    const gifs = ref([]);
    const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
    const categories = ref([]);

    const getAllGifs = async (query = '') => {
        try {
            const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: import.meta.env.VITE_GIPHY_API_KEY,
                    q: query,
                    limit: 25
                }
            });
            gifs.value = response.data.data;
        } catch (error) {
            console.log('error ->', error);
        }
    };

    const getCategories = async () => {
        try {
          const response = await axios.get('https://api.giphy.com/v1/gifs/categories', {
            params: {
              api_key: import.meta.env.VITE_GIPHY_API_KEY
            }
          });
          categories.value = response.data.data;
        } catch (error) {
          console.log('error ->', error);
        }
      };
    
      const getGifsByCategory = async (category) => {
        try {
          const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
            params: {
              api_key: import.meta.env.VITE_GIPHY_API_KEY,
              q: category,
              limit: 25 // Limite de resultados
            }
          });
          gifs.value = response.data.data;
        } catch (error) {
          console.log('error ->', error);
        }
      };

    const addFavorite = (gif) => {
        favorites.value.push(gif);
        updateLocalStorage();
    };

    const updateLocalStorage = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    const removeFavorite = (gifId) => {
        favorites.value = favorites.value.filter(gif => gif.id !== gifId);
        updateLocalStorage();
    };

    return {
        gifs,
        favorites,

        getAllGifs,
        getCategories,
        getGifsByCategory,
        addFavorite,
        updateLocalStorage,
        removeFavorite
    };
});
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

import { LocalStorage } from 'quasar';

export const useApiGyphyStore = defineStore('ApiGyphy', () => {
  const gifs = ref([]);
  const favorites = computed(() => {
    return JSON.parse(LocalStorage.getItem('favorites')) || [];
  });
  const categories = ref([]);

  const getAllGifs = async (query = '') => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API_KEY,
          q: query,
          limit: 25 // Limite de resultados
        }
      });

      gifs.value = response.data.data;
    } catch (error) {
      console.log('error ->', error);
    }
  };

  const getAllGifsTrending = async ()=>{
    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/trending', {
        params:{
          api_key: import.meta.env.VITE_GIPHY_API_KEY,
          limit: 25 // Limite de resultados
        }
      })
      gifs.value = response.data.data;
      console.log('gifs.value ->', gifs.value);
      
    } catch (error) {
      console.log('error ->', error);
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/categories', {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API_KEY
        }
      });
      categories.value = response.data.data;
    } catch (error) {
      console.log('error ->', error);
    }
  };

  const getGifsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API_KEY,
          q: category,
          limit: 25 // Limite de resultados
        }
      });
      gifs.value = response.data.data;
    } catch (error) {
      console.log('error ->', error);
    }
  };

  const addFavorite = (gif) => {
    favorites.value.push(gif);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    LocalStorage.setItem('favoritos', JSON.stringify(favorites.value));
  };

  const removeFavorite = (gifId) => {
    favorites.value = favorites.value.filter(gif => gif.id !== gifId);
    updateLocalStorage();
  };

  return {
    gifs,
    favorites,
    categories,
    
    getAllGifs,
    getCategories,
    getGifsByCategory,
    addFavorite,
    getAllGifsTrending,
    updateLocalStorage,
    removeFavorite
  };
});
