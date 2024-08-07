<template>
  <q-page>
    <!-- <q-header elevated>
      <span>Logo</span>
    </q-header>

    <q-toolbar>
      <q-toolbar-title>
        Favorites Page
      </q-toolbar-title>
    </q-toolbar> -->
    <q-toolbar>
      <q-toolbar-title>
        Favorites Page
      </q-toolbar-title>
    </q-toolbar>

    <q-list>
      <q-item-label header>Favoritos</q-item-label>

      <q-item v-for="gif in favorites" :key="gif.id" clickable>
        <q-item-section avatar>
          <q-img :src="gif.images.fixed_height.url" :alt="gif.title" />
        </q-item-section>
        <q-item-section>
          <div>{{ gif.title }}</div>
          <q-btn icon="favorite" color="red" @click.stop="removeFavorite(gif.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useApiGyphyStore } from '../stores/apiGiphy-store.js';

const store = useApiGyphyStore();
const { favorites } = storeToRefs(store);

const removeFavorite = (gifId) => {
  store.removeFavorite(gifId);
};
</script>

<style lang="scss" scoped></style>