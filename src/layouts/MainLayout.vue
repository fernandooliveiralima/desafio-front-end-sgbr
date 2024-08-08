<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Sgbr Gifs
                </q-toolbar-title>

                <q-item>
                    <q-item-section class="user-name">Fernando Oliveira</q-item-section>
                    <q-avatar>
                        <userIconC></userIconC>
                    </q-avatar>
                </q-item>

            </q-toolbar>


        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <q-list>
                <q-item v-ripple clickable tag="router-link" :to="{ name: 'home' }">
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        Home
                    </q-item-section>
                </q-item>

                <q-item v-ripple clickable tag="router-link" :to="{ name: 'favoritos' }">
                    <q-item-section avatar>
                        <q-icon name="favorite" />
                    </q-item-section>
                    <q-item-section>
                        Favoritos
                    </q-item-section>
                </q-item>

                <q-item v-ripple clickable tag="router-link" :to="{ name: 'categorias' }">
                    <q-item-section avatar>
                        <q-icon name="category" />
                    </q-item-section>
                    <q-item-section>
                        Categorias
                    </q-item-section>
                </q-item>

                <q-item v-ripple clickable tag="router-link" :to="{ name: 'sobre' }">
                    <q-item-section avatar>
                        <q-icon name="info" />
                    </q-item-section>
                    <q-item-section>
                        Sobre
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.user-name{
    @apply
    text-xl
    ml-3
    md:text-base;
}
</style>

<script setup>
import { ref } from 'vue'
import userIconC from '../components/userIconC.vue';


const leftDrawerOpen = ref(false)

const toggleLeftDrawer = ()=>{
    leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>