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

// Fechas y horarios disponibles
const availableDatesWithTimes = ref<Record<string, string[]>>({
  "2024-12-01": ["09:00", "10:00", "11:00"],
  "2024-12-05": ["12:00", "14:00", "16:00"],
  "2024-12-10": ["10:00", "11:00", "15:00", "17:00"],
  "2024-12-15": ["09:00", "12:00", "16:00"],
});

// Datos de testimonios de clientes con nombres de íconos
const testimonials = ref([
  {
    name: "Ana López",
    comment: "¡El mejor servicio que he tenido! Muy fácil de reservar.",
    avatar: "women/68",
    icon: "mdi-emoticon-happy-outline",
  },
  {
    name: "Carlos Pérez",
    comment: "Recomendado al 100%. Puntualidad y calidad.",
    avatar: "men/90",
    icon: "mdi-thumb-up-outline",
  },
  {
    name: "María Gómez",
    comment: "Una experiencia increíble. Sin duda volveré a usar sus servicios.",
    avatar: "women/9",
    icon: "mdi-star-outline",
  },
  {
    name: "Juan Rodríguez",
    comment: "¡Excelente atención! Muy satisfecho con el resultado.",
    avatar: "men/49",
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
}

// Función para verificar si una fecha está disponible
const isDateAvailable = (date: string) => {
  const formattedDate = formatDate(new Date(date));
  return Object.keys(availableDatesWithTimes.value).includes(formattedDate);
};

// Acción al seleccionar una fecha
const onDateSelected = (date: string | Date) => {
  selectedDate.value = formatDate(new Date(date));
  selectedTime.value = null;
};

// Acción al seleccionar una hora
const onTimeSelected = (time: string) => {
  selectedTime.value = time;
};

// Computed para obtener horarios disponibles para la fecha seleccionada
const availableTimesForSelectedDate = computed(() => {
  if (selectedDate.value) {
    let formatedSelectedDate = formatDate(new Date(selectedDate.value));
    return availableDatesWithTimes.value[formatedSelectedDate] || [];
  }
  return [];
});

// Función para confirmar la cita
const confirmAppointment = () => {
  if (selectedService.value && selectedDate.value && selectedTime.value) {
    console.log("Cita confirmada:", {
      servicio: selectedService.value,
      fecha: selectedDate.value,
      hora: selectedTime.value,
    });
  } else {
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
                class="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg hover:shadow-lg border border-black justify-between"
            >
              <div class="flex items-center gap-4">
                <img
                    :src="`https://randomuser.me/api/portraits/${testimonial.avatar}.jpg`"
                    alt="Avatar"
                    class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 class="font-medium text-gray-800">{{ testimonial.name }}</h3>
                  <p class="text-sm text-gray-600">{{ testimonial.comment }}</p>
                </div>
              </div>
              <v-icon size="48" class="text-black flex-shrink-0 ml-auto">
                {{ testimonial.icon }}
              </v-icon>
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
              <div v-if="selectedDate" class="mt-4 flex flex-col items-center text-center">
                <h3 class="text-md font-semibold">
                  Horarios disponibles para el {{ formatDate(new Date(selectedDate)) }}
                </h3>
                <div class="flex flex-wrap gap-2 mt-2 justify-center">
                  <v-btn
                      v-for="time in availableTimesForSelectedDate"
                      :key="time"
                      @click="onTimeSelected(time)"
                      :color="time === selectedTime ? 'black' : 'default'"
                      class="text-sm"
                  >
                    {{ time }}
                  </v-btn>
                </div>
              </div>
            </v-sheet>
          </div>

          <!-- Botón de confirmación (opcional) -->
          <div v-if="selectedDate && selectedTime" class="mt-6">
            <v-btn color="black" @click="confirmAppointment">
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