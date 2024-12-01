<script setup lang="ts">
import { useRouter } from 'vue-router';

const navLinks = [
  { title: 'Inicio', path: '/' },
  { title: 'Servicios', path: '/services' },
  { title: 'Agenda', path: '/schedule' },
  { title: 'Acerca de', path: '/about' },
  { title: 'Contacto', path: '/contact' },
];

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <v-app-bar app style="background-color: #000000;" dark>
    <v-app-bar-title class="text-white font-bold">Bruja de Luz</v-app-bar-title>
    <div class="mr-auto">
      <v-btn
          v-for="link in navLinks"
          :key="link.title"
          variant="text"
          class="text-white hover:font-bold"
          @click="navigateTo(link.path)"
      >
        {{ link.title }}
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <template v-slot:append>
      <v-btn icon="mdi-heart" color="white"></v-btn>
      <v-btn icon="mdi-magnify" color="white"></v-btn>
      <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>
</style>
