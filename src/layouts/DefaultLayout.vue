<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <v-app>
    <!-- Header -->
    <AppHeader />

    <!-- Contenido principal -->
    <v-main>
      <slot /> <!-- Aquí se renderiza el contenido de la vista -->
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <div class="text-center w-full">© 2024 Yasna Tarot</div>
    </v-footer>
  </v-app>
</template>

<style scoped>
</style>
