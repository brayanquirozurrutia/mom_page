<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {formatDate, parseDate} from '@/utils/dateUtils';
import {fetchServices} from "@/services/serviceService";
import {useServiceAvailability} from "@/composables/useServiceAvailability";
import { createTransaction, commitTransaction } from "@/services/paymentService";
import { useRoute, useRouter } from "vue-router";

const services = ref<Service[]>([]);
const selectedService = ref<number | null>(null);
const selectedDate = ref<string | null>(null);
const selectedTime = ref<string | null>(null);
const transactionResult = ref<any>(null);
const errorMessage = ref<string | null>(null);
const showConfirmationModal = ref(false);
const showTransactionModal = ref(false);
const showErrorModal = ref(false);

const { availableDatesWithTimes, fetchAndTransformData } = useServiceAvailability();
const route = useRoute();
const router = useRouter();

/**
 * Detect token_ws on page load and confirm transaction if exists
 */
onMounted(async () => {
  const token = route.query.token_ws as string;
  const tbkToken = route.query.TBK_TOKEN as string;
  const tbkOrder = route.query.TBK_ORDEN_COMPRA as string;
  const tbkSession = route.query.TBK_ID_SESION as string;

  // Check if the transaction was canceled or failed
  if (tbkToken || tbkOrder || tbkSession) {
    errorMessage.value = "La transacción fue cancelada o falló.";
    showErrorModal.value = true;

    await router.replace({ query: {} });
    return;
  }

  // Check if the transaction was successful
  if (token) {
    try {
      transactionResult.value = await commitTransaction(token);
      showTransactionModal.value = true;
    } catch (error) {
      errorMessage.value = "Error al confirmar la transacción.";
      showErrorModal.value = true;
    } finally {
      // Clear token_ws from the URL
      await router.replace({query: {...route.query, token_ws: undefined}});
    }
  }
});

/**
 * Fetch services and availability data when the component is mounted.
 */
onMounted(async () => {
  try {
    // Fetch all services
    services.value = await fetchServices();

    // Fetch availability data for the selected service
    if (selectedService.value) {
      await fetchAndTransformData(selectedService.value);
    }
  } catch (error) {
    alert("Error al cargar los datos. Por favor, intenta de nuevo.");
    console.error("Error al cargar los datos:", error);
  }
});

/**
 * Watch for changes in the selected service and fetch availability data.
 */
watch(selectedService, async (newServiceId) => {
  if (newServiceId) {
    try {
      await fetchAndTransformData(newServiceId);
    } catch (error) {
      console.error("Error al obtener disponibilidad del servicio:", error);
    }
  }
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

/**
 * Event handler for when a time is selected.
 * @param time - The selected time.
 */
const onTimeSelected = (time: string) => {
  selectedTime.value = time;
};

/**
 * Check if a date is available for the selected service.
 * @param date - The date to check.
 */
const isDateAvailable = (date: Date | string): boolean => {
  const formattedDate = date instanceof Date ? formatDate(date) : date;
  return Object.keys(availableDatesWithTimes.value).includes(formattedDate);
};

/**
 * Computed property to wrap the selected date as a Date object.
 */
const wrappedSelectedDate = computed({
  get: () => (selectedDate.value ? parseDate(selectedDate.value) : null),
  set: (value: Date) => {
    selectedDate.value = formatDate(value);
  },
});

/**
 * Computed property to get the available times for the selected date.
 */
const availableTimesForSelectedDate = computed(() =>
    availableDatesWithTimes.value[selectedDate.value || ""] || []
);

/**
 * Computed property to get the name of the selected service.
 */
const selectedServiceName = computed(() => {
  const service = services.value.find(s => s.id === selectedService.value);
  return service ? service.name : null;
});

/**
 * Confirm the appointment and show the confirmation modal.
 */
const confirmAppointment = () => {
  if (!selectedService.value || !selectedDate.value || !selectedTime.value) {
    return console.warn("Faltan datos para confirmar la cita.");
  }
  showConfirmationModal.value = true;
};

/**
 * Close the confirmation modal.
 */
const closeConfirmationModal = () => {
  showConfirmationModal.value = false;
};

/**
 * Handle create transaction and redirect to WebPay
 */
const finalizeAppointment = async () => {
  if (!selectedService.value || !selectedDate.value || !selectedTime.value) {
    errorMessage.value = "Faltan datos para confirmar la cita.";
    showErrorModal.value = true;
    return;
  }

  try {
    const buyOrder = `orden-${Date.now()}`;
    const sessionId = `sesion-${Date.now()}`;
    const amount = 10000;
    const returnUrl = "http://localhost:5173";

    const response = await createTransaction(buyOrder, sessionId, amount, returnUrl);

    if (!response.url || !response.token) {
      errorMessage.value = "Error al procesar la transacción.";
      showErrorModal.value = true;
      return;
    }

    // Create and submit form to redirect to WebPay
    const form = document.createElement("form");
    form.method = "POST";
    form.action = response.url;

    const inputToken = document.createElement("input");
    inputToken.type = "hidden";
    inputToken.name = "token_ws";
    inputToken.value = response.token;

    form.appendChild(inputToken);
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    errorMessage.value = "Error al procesar la transacción.";
    showErrorModal.value = true;
  }
};

</script>

<template>
  <DefaultLayout>
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Calendar section -->
        <div class="w-full md:w-1/2 bg-white p-4 rounded-lg shadow transition-all order-first">
          <div class="w-full max-w-md mb-4 mx-auto">
            <v-select
                v-model="selectedService"
                :items="services"
                item-title="name"
                item-value="id"
                label="Selecciona un servicio"
                outlined
            ></v-select>
          </div>

          <div v-if="selectedService" class="w-full max-w-md overflow-auto mx-auto">
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

          <!-- Confirm button -->
          <div v-if="selectedDate && selectedTime" class="mt-6 text-center">
            <v-btn color="black" @click="confirmAppointment">
              Confirmar Cita
            </v-btn>
          </div>
        </div>

        <!-- Happy clients section -->
        <div class="w-full md:w-1/2 bg-white p-4 rounded-lg shadow transition-all">
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
      </div>

      <!-- Confirmation modal -->
      <v-dialog
          v-model="showConfirmationModal"
          max-width="500"
          transition="dialog-top-transition"
      >
        <v-card>
          <!-- Title with close icon -->
          <v-card-title class="text-h5 flex justify-between items-center">
            <span>¡Confirma tu cita!</span>
            <v-btn icon="mdi-close" variant="text" @click="closeConfirmationModal"></v-btn>
          </v-card-title>

          <!-- Confirmation details -->
          <v-card-text>
            <p><strong>Servicio:</strong> {{ selectedServiceName  }}</p>
            <p><strong>Fecha:</strong> {{ selectedDate }}</p>
            <p><strong>Hora:</strong> {{ selectedTime }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="grey darken-3"
                text="Cancelar"
                @click="closeConfirmationModal"></v-btn>
            <v-btn
                prepend-icon="mdi-check-circle"
                variant="text"
                @click="finalizeAppointment"
                class="text-green-600 hover:bg-green-600 hover:text-white"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Transaction result modal -->
      <v-dialog v-model="showTransactionModal" max-width="500">
        <v-card>
          <v-card-title class="text-h5">¡Pago Exitoso!</v-card-title>
          <v-card-text>
            <p><strong>Monto:</strong> {{ transactionResult.amount }}</p>
            <p><strong>Orden:</strong> {{ transactionResult.buy_order }}</p>
            <p><strong>Fecha:</strong> {{ transactionResult.transaction_date }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showTransactionModal = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Error modal -->
      <v-dialog v-model="showErrorModal" max-width="500">
        <v-card>
          <v-card-title class="text-h5 text-error">Error en la Transacción</v-card-title>
          <v-card-text>
            <p>{{ errorMessage }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="showErrorModal = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </DefaultLayout>
</template>
<style scoped>

</style>