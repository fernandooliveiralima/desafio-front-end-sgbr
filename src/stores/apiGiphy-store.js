import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

import { LocalStorage } from 'quasar';

export const useApiGyphyStore = defineStore('ApiGyphy', () => {
  const gifs = ref([]);
  const favorites = ref(JSON.parse(LocalStorage.getItem('favorites')) || []);

  const categories = ref([]);

  /* função para buscar gifs por nomes */
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

  /* Função que Busca Todos os Gifs */
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

  /* Função que Busca todas as categorias */
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

  /* Função que Busca uma categoria especifica */
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

  /* Função para adicionar um gif favorito */
  const addFavorite = (gif) => {
    favorites.value.push(gif);
    updateLocalStorage();
  };

  /* Função que atualiza o localStorage */
  const updateLocalStorage = () => {
    LocalStorage.setItem('favorites', JSON.stringify(favorites.value));
  };

  /* Função para remover um gif */
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
