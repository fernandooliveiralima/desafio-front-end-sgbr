<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useApiGyphyStore } from '../stores/apiGiphy-store';


const store = useApiGyphyStore();
const { favorites, gifs } = storeToRefs(store);

const searchQuery = ref('');
const columns = ref(4);

const searchGifs = async () => {
  await store.getAllGifs(searchQuery.value);
  console.log('GIFs:', gifs.value);
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
  console.log('inicio');
  
  await store.getAllGifsTrending();
  //await searchGifs();

  console.log('fim');
})
</script>

<template>
  <q-page>
    <!-- <q-header elevated>
      <span>Logo</span>
    </q-header>

    <q-toolbar>
      <q-toolbar-title>
        Home Page
      </q-toolbar-title>
    </q-toolbar> -->
    <q-toolbar >
      <q-toolbar-title>
        Home Page
      </q-toolbar-title>
    </q-toolbar>

    <q-input v-model="searchQuery" placeholder="Search GIFs..." @keyup.enter="searchGifs" />
    <q-btn label="Search Gifs" @click="searchGifs" />


    <q-page-container>
      <q-container>
        <div class="row q-col-gutter-md q-mb-md">
          <div v-for="gif in gifs" :key="gif.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-img :src="gif.images.fixed_height.url" :alt="gif.title" class="q-mb-md" :ratio="16 / 9"
              @click="toggleFavorite(gif)">
              <template v-slot:after>
                <q-btn icon="favorite" :color="isFavorite(gif) ? 'red' : 'white'" round dense flat
                  @click.stop="toggleFavorite(gif)" />
              </template>
            </q-img>
          </div>
          
        </div>
      </q-container>
    </q-page-container>
  </q-page>
</template>



<style lang="scss" scoped>
.q-img {
  cursor: pointer;
  transition: transform 0.3s;
}

.q-img:hover {
  transform: scale(1.05);
}
</style>
