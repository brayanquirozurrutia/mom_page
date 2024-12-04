<script setup lang="ts">
import {computed, ref} from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

// Estado para el servicio seleccionado
const selectedService = ref<string | null>(null);

// Lista de servicios ofrecidos
const services = ref([
  { name: "Corte de cabello", value: "haircut" },
  { name: "Manicure", value: "manicure" },
  { name: "Pedicure", value: "pedicure" },
  { name: "Masaje", value: "massage" },
]);

// Estado para la fecha seleccionada
const selectedDate = ref<string | null>(null);

// Estado para la hora seleccionada
const selectedTime = ref<string | null>(null);

// Fechas disponibles
const availableDates = ref<string[]>([
  "2024-12-01",
  "2024-12-05",
  "2024-12-10",
  "2024-12-15",
]);

// Horarios disponibles (puedes personalizar estos horarios)
const availableTimes = ref<string[]>([
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]);

// Datos de testimonios de clientes con nombres de íconos
const testimonials = ref([
  {
    name: "Ana López",
    comment: "¡El mejor servicio que he tenido! Muy fácil de reservar.",
    icon: "mdi-emoticon-happy-outline",
  },
  {
    name: "Carlos Pérez",
    comment: "Recomendado al 100%. Puntualidad y calidad.",
    icon: "mdi-thumb-up-outline",
  },
  {
    name: "María Gómez",
    comment: "Una experiencia increíble. Sin duda volveré a usar sus servicios.",
    icon: "mdi-star-outline",
  },
  {
    name: "Juan Rodríguez",
    comment: "¡Excelente atención! Muy satisfecho con el resultado.",
    icon: "mdi-emoticon-cool-outline",
  }
]);

// Computed para ajustar la altura de ambas zonas
const isCalendarVisible = computed(() => !!selectedService);

// Formatear fecha al formato "YYYY-MM-DD"
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Función para verificar si una fecha está disponible
const isDateAvailable = (date: string) => {
  const formattedDate = formatDate(new Date(date));
  return availableDates.value.includes(formattedDate);
};

// Función para verificar si una hora está disponible (opcional)
const isTimeAvailable = (time: string) => {
  // Aquí puedes agregar lógica para verificar si la hora está disponible
  // Por ejemplo, podrías filtrar en función de la fecha seleccionada
  return availableTimes.value.includes(time);
};

// Acción al seleccionar una fecha
const onDateSelected = (date: string) => {
  selectedDate.value = formatDate(new Date(date));
  selectedTime.value = null; // Resetear la hora seleccionada al cambiar la fecha
};

// Acción al seleccionar una hora
const onTimeSelected = (time: string) => {
  selectedTime.value = time;
};

// Función para confirmar la cita
const confirmAppointment = () => {
  if (selectedService.value && selectedDate.value && selectedTime.value) {
    // Aquí puedes manejar la lógica de la cita, como enviarla a una API
    console.log("Cita confirmada:", {
      servicio: selectedService.value,
      fecha: selectedDate.value,
      hora: selectedTime.value,
    });
    // Resetear los campos si es necesario
    // selectedService.value = null;
    // selectedDate.value = null;
    // selectedTime.value = null;
  } else {
    // Manejar el caso donde faltan datos
    console.warn("Faltan datos para confirmar la cita.");
  }
};
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="main-container">
        <!-- Happy clients section -->
        <div
            class="testimonials-container"
            :class="isCalendarVisible ? 'flex-1' : 'flex-grow'"
        >
          <h2 class="text-lg font-bold mb-4 text-gray-700">Clientes felices</h2>
          <div>
            <div
                v-for="testimonial in testimonials"
                :key="testimonial.name"
                class="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg hover:shadow-lg border border-black"
            >
              <v-icon size="48" class="text-blue-500 flex-shrink-0">
                {{ testimonial.icon }}
              </v-icon>
              <div>
                <h3 class="font-medium text-gray-800">{{ testimonial.name }}</h3>
                <p class="text-sm text-gray-600">{{ testimonial.comment }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar section -->
        <div
            class="calendar-container flex flex-col justify-start items-center"
            :class="isCalendarVisible ? 'flex-1' : 'flex-grow'"
        >
          <div class="service-selector w-full max-w-md mb-4">
            <v-select
                v-model="selectedService"
                :items="services"
                item-text="name"
                item-value="value"
                label="Selecciona un servicio"
                outlined
            ></v-select>
          </div>

          <div v-if="selectedService" class="w-full max-w-md overflow-auto">
            <v-sheet elevation="2" class="pa-4">
              <v-date-picker
                  v-model="selectedDate"
                  :allowed-dates="isDateAvailable"
                  @input="onDateSelected"
                  class="w-full"
              />
              <div class="mt-4">
                <h3 class="text-md font-semibold">Fecha seleccionada:</h3>
                <p class="text-sm text-gray-600">{{ selectedDate || "Ninguna fecha seleccionada" }}</p>
              </div>
            </v-sheet>
          </div>
          <!-- Selector de hora -->
          <div v-if="selectedDate" class="">
            <v-select
                v-model="selectedTime"
                :items="availableTimes"
                label="Selecciona una hora"
                :disabled="!selectedDate"
                outlined
            ></v-select>
            <div class="mt-4">
              <h3 class="text-md font-semibold">Hora seleccionada:</h3>
              <p class="text-sm text-gray-600">{{ selectedTime || "Ninguna hora seleccionada" }}</p>
            </div>
          </div>
          <!-- Botón de confirmación (opcional) -->
          <div v-if="selectedDate && selectedTime" class="mt-6">
            <v-btn color="primary" @click="confirmAppointment">
              Confirmar Cita
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.main-container {
  @apply flex justify-between items-stretch p-4 gap-4;
}

.testimonials-container {
  @apply w-1/2 bg-white p-4 rounded-lg shadow transition-all;
}

.calendar-container {
  @apply w-1/2 bg-white p-4 rounded-lg shadow transition-all;
}

.service-selector {
  @apply w-full max-w-md;
}
</style>
