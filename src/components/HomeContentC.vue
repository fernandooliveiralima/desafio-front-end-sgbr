<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useApiGyphyStore } from '../stores/apiGiphy-store';

const store = useApiGyphyStore();
const { favorites, gifs } = storeToRefs(store);

const searchQuery = ref('');

const searchGifs = async () => {
  await store.getGifsByName(searchQuery.value);
  searchQuery.value = ''
};

const toggleFavorite = (gif) => {
  if (favorites.value.find(fav => fav.id === gif.id)) {
    store.removeFavorite(gif.id);
  } else {
    store.addFavorite(gif);
  }
};

const isFavorite = (gif) => {
  return favorites.value.some(fav => fav.id === gif.id);
};

onMounted(async () => {
  await store.getAllGifsTrending();
})
</script>

<template>
  <q-page>

    <q-toolbar>
      <q-toolbar-title>
        Pagina Principal
      </q-toolbar-title>
    </q-toolbar>

    <q-input v-model="searchQuery" placeholder="Search GIFs..." @keyup.enter="searchGifs" />
    <q-btn label="Search Gifs" @click="searchGifs" />

    <q-page-container>
      <div class="row q-col-gutter-md q-mb-md">
        <div v-for="gif in gifs" :key="gif.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-icon @click="toggleFavorite(gif)" name="favorite" />
          <q-img :src="gif.images.fixed_height.url" :alt="gif.title" class="q-mb-md" :ratio="16 / 9">
            <template v-slot:after>
              <q-btn icon="favorite" :color="isFavorite(gif) ? 'red' : 'white'" round dense flat
                @click.stop="toggleFavorite(gif)" />
            </template>
          </q-img>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .q-img {
    @apply transition-transform duration-[0.3s];
  }

  .q-icon {
    @apply text-[red] cursor-pointer text-2xl transition-[0.1s] duration-[ease-in-out];
  }

}

@layer utilities {
  .q-img:hover {
    @apply scale-[1.03];
  }
}

</style>
