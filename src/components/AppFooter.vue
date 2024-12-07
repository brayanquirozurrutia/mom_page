<script setup lang="ts">
</script>
<template>
  <v-footer app color="primary" dark>
    <div class="text-center w-full py-3">
      <v-container>
        <v-row justify="center">
          <!-- Text with animated heart -->
          <v-col cols="12" class="text-white text-center">
            <p>
              Made with
              <i class="fas fa-heart heart-animation mx-1 text-red-500"></i>
              by Brayan Quiroz Urrutia
            </p>
          </v-col>

          <!-- Social icons -->
          <v-col cols="12" class="text-center">
            <v-btn
                icon="icon"
                href="https://www.linkedin.com/in/brayan-nicolas-quiroz-urrutia-19a0391a7/"
                target="_blank"
                class="mx-2"
                color="white"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn
                icon="icon"
                href="https://github.com/brayanquirozurrutia"
                target="_blank"
                class="mx-2"
                color="white"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-footer>
</template>

<style scoped>
.heart-animation {
  animation: beat 1s infinite;
}

@keyframes beat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>
