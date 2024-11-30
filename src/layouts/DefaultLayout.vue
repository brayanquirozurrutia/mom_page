<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <v-app>
    <!-- Header -->
    <AppHeader />

    <!-- Contenido principal -->
    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<style scoped>
</style>
