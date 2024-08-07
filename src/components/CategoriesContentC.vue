<template>
  <q-page class="row">
    <!-- <q-header elevated>
      <span>Logo</span>
    </q-header>
    
    <q-toolbar>
      <q-toolbar-title>
        Categories Page
      </q-toolbar-title>
    </q-toolbar> -->
    <q-toolbar>
      <q-toolbar-title>
        Categories Page
      </q-toolbar-title>
    </q-toolbar> 

    <!-- Sidebar for categories -->
    <div class="col-3">
      
      <q-list bordered class="categories-list">
        <q-item-label header>CATEGORIES</q-item-label>
        <q-item v-for="category in categories" :key="category.name" clickable
          @click="fetchGifsByCategory(category.name)">
          <q-item-section>{{ category.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Main content area for GIFs -->
    <div class="col-9">
      <q-page-container v-if="gifs.length">
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
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useApiGyphyStore } from '../stores/apiGiphy-store.js';

const store = useApiGyphyStore();
const { categories, gifs, favorites } = storeToRefs(store);

const fetchGifsByCategory = async (category) => {
  await store.getGifsByCategory(category);
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

onMounted(() => {
  store.getCategories();
});
</script>

<style scoped>
.categories-list {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.categories-list .q-item {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
}

.categories-list .q-item:hover {
  background-color: #f5f5f5;
}

.q-img {
  cursor: pointer;
  transition: transform 0.3s;
}

.q-img:hover {
  transform: scale(1.05);
}

.q-page-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>