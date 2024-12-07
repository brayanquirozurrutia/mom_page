<script setup lang="ts">
import { computed, ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const selectedService = ref<string | null>(null);
const selectedDate = ref<string | null>(null);
const selectedTime = ref<string | null>(null);
const showConfirmationModal = ref(false);

const services = ref<{ name: string; value: string }[]>([
  { name: "Corte de cabello", value: "haircut" },
  { name: "Manicure", value: "manicure" },
  { name: "Pedicure", value: "pedicure" },
  { name: "Masaje", value: "massage" },
]);

const availableDatesWithTimes = ref<Record<string, string[]>>({
  "2024-12-01": ["09:00", "10:00", "11:00"],
  "2024-12-05": ["12:00", "14:00", "16:00"],
  "2024-12-10": ["10:00", "11:00", "15:00", "17:00"],
  "2024-12-15": ["09:00", "12:00", "16:00"],
});

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

const onTimeSelected = (time: string) => {
  selectedTime.value = time;
};

// TODO: MOVE TO UTILS
const formatDate = (date: Date): string =>
    date.toISOString().split("T")[0];
// TODO: MOVE TO UTILS
const parseDate = (dateString: string): Date => new Date(dateString);

const isDateAvailable = (date: Date | string): boolean => {
  const formattedDate = date instanceof Date ? formatDate(date) : date;
  return Object.keys(availableDatesWithTimes.value).includes(formattedDate);
};

const wrappedSelectedDate = computed({
  get: () => (selectedDate.value ? parseDate(selectedDate.value) : null),
  set: (value: Date) => {
    selectedDate.value = formatDate(value);
  },
});

const availableTimesForSelectedDate = computed(() =>
    availableDatesWithTimes.value[selectedDate.value || ""] || []
);

const confirmAppointment = () => {
  if (!selectedService.value || !selectedDate.value || !selectedTime.value) {
    return console.warn("Faltan datos para confirmar la cita.");
  }
  showConfirmationModal.value = true;
};

const closeConfirmationModal = () => {
  showConfirmationModal.value = false;
};

const finalizeAppointment = () => {
  console.log("Cita confirmada:", {
    servicio: selectedService.value,
    fecha: selectedDate.value,
    hora: selectedTime.value,
  });
  closeConfirmationModal();
};
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="flex justify-between items-stretch p-4 gap-4">
        <!-- Happy clients section -->
        <div class="w-1/2 bg-white p-4 rounded-lg shadow transition-all">
          <h2 class="text-lg font-bold mb-4 text-gray-700">Clientes felices</h2>
          <div>
            <div
                v-for="(testimonial, index) in testimonials"
                :key="testimonial.name + index"
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
        <div class="w-1/2 bg-white p-4 rounded-lg shadow transition-all flex flex-col justify-start items-center">
          <div class="w-full max-w-md mb-4">
            <v-select
                v-model="selectedService"
                :items="services"
                item-title="name"
                item-value="value"
                label="Selecciona un servicio"
                outlined
            ></v-select>
          </div>

          <div v-if="selectedService" class="w-full max-w-md overflow-auto">
            <v-sheet elevation="2" class="pa-4">
              <v-date-picker
                  v-model="wrappedSelectedDate"
                  :allowed-dates="isDateAvailable"
                  class="w-full"
              />
              <div v-if="selectedDate" class="mt-4 flex flex-col items-center text-center">
                <h3 class="text-md font-semibold">
                  Horarios disponibles para el {{ selectedDate }}
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

          <!-- Botón de confirmación -->
          <div v-if="selectedDate && selectedTime" class="mt-6">
            <v-btn color="black" @click="confirmAppointment">
              Confirmar Cita
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <v-dialog
        v-model="showConfirmationModal"
        max-width="500"
        transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">Confirmar Cita</v-card-title>
        <v-card-text>
          <p><strong>Servicio:</strong> {{ selectedService }}</p>
          <p><strong>Fecha:</strong> {{ selectedDate }}</p>
          <p><strong>Hora:</strong> {{ selectedTime }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeConfirmationModal">Cancelar</v-btn>
          <v-btn color="green" @click="finalizeAppointment">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </DefaultLayout>
</template>

<style scoped>

</style>