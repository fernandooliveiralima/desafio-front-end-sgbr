<template>
  <q-page class="row">

    <q-toolbar>
      <q-toolbar-title>
        Pagina Categorias
      </q-toolbar-title>
    </q-toolbar>

    <!-- menu de categorias -->
    <div class="col-3 category-menu">

      <q-list bordered>
        <q-item-label header>CATEGORIES</q-item-label>
        <q-item v-for="category in categories" :key="category.name" clickable
          @click="fetchGifsByCategory(category.name)">
          <q-item-section>{{ category.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>

    <!--  area dos GIFs -->
    <div class="col-9">
      <q-page-container v-if="gifs.length">
        <div class="row q-col-gutter-md q-mb-md">
          <div v-for="gif in gifs" :key="gif.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-icon @click="toggleFavorite(gif)" name="favorite" />
            <q-img :src="gif.images.fixed_height.url" :alt="gif.title" class="q-mb-md" :ratio="16 / 9"
              @click="toggleFavorite(gif)">
              <template v-slot:after>
                <q-btn icon="favorite" :color="isFavorite(gif) ? 'red' : 'white'" round dense flat
                  @click.stop="toggleFavorite(gif)" />
              </template>
            </q-img>
          </div>
        </div>
      </q-page-container>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useApiGyphyStore } from '../stores/apiGiphy-store.js';

const store = useApiGyphyStore();
const { categories, gifs, favorites } = storeToRefs(store);

/* Função de gif por categoria */
const fetchGifsByCategory = async (category) => {
  await store.getGifsByCategory(category);
};

/* Função para favoritar um Gif */
const toggleFavorite = (gif) => {
  if (favorites.value.find(fav => fav.id === gif.id)) {
    store.removeFavorite(gif.id);
  } else {
    store.addFavorite(gif);
  }
};

/* Função que define a cor do gif favorito */
const isFavorite = (gif) => {
  return favorites.value.some(fav => fav.id === gif.id);
};

onMounted(() => {
  store.getCategories();
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

  .category-menu{
    @apply md:hidden;
  }

  .q-list {
    @apply max-h-[calc(100vh_-_100px)] overflow-y-auto;
  }

  
  .q-list .q-item {
    @apply px-[0.625rem] py-4 font-bold cursor-pointer;
  }

  
  .q-list .q-item:hover {
    @apply bg-[#f5f5f5];
  }

  .q-img {
    @apply cursor-pointer transition-transform duration-[0.3s];
  }

  .q-page-container {
    @apply flex flex-wrap justify-between;
  }

  .q-icon {
    @apply text-[red] cursor-pointer text-2xl transition-[0.1s] duration-[ease-in-out];
  }
}

@layer utilities {
  .q-img:hover {
    @apply scale-105;
  }
}

</style>