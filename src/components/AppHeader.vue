<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const navLinks = [
  { title: 'Inicio', path: '/' },
  { title: 'Servicios', path: '/services' },
  { title: 'Agenda', path: '/schedule' },
  { title: 'Acerca de', path: '/about' },
  { title: 'Contacto', path: '/contact' },
];

const router = useRouter();
const isDrawerOpen = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
  isDrawerOpen.value = false;
};
</script>

<template>
  <v-app-bar app style="background-color: #000000;" dark>
    <!-- Tittle -->
    <v-app-bar-title class="text-white font-bold">Bruja de Luz</v-app-bar-title>

    <!-- Navbar for medium and large screens -->
    <div class="hidden md:flex mr-auto">
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

    <!-- Buttons for medium and large screens -->
    <v-spacer></v-spacer>
    <v-btn icon="mdi-heart" color="white" class="hidden md:flex"></v-btn>
    <v-btn icon="mdi-magnify" color="white" class="hidden md:flex"></v-btn>
    <v-btn
        icon="mdi-menu"
        color="white"
        class="md:hidden"
        @click="isDrawerOpen = !isDrawerOpen"
    ></v-btn>
  </v-app-bar>

  <!-- Drawer to show links on small screens -->
  <v-navigation-drawer
      v-model="isDrawerOpen"
      app
      temporary
      style="background-color: #000000;"
      dark
  >
    <v-list>
      <v-list-item
          v-for="link in navLinks"
          :key="link.title"
          @click="navigateTo(link.path)"
      >
        <v-list-item-title class="text-white">{{ link.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
