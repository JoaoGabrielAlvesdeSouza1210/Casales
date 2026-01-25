<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useParoquiaStore } from '@/stores/paroquia'
import { useMap } from '@/composables/useMap'
import { Icon } from '@iconify/vue'

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * Dados da paróquia
 */
const paroquia = computed(() => paroquiaStore.paroquia)

/**
 * Referência para o elemento do mapa
 */
const mapRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (paroquia.value?.localizacao) {
    useMap('map', paroquia.value.localizacao)
  }
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-5xl font-bold text-church-primary text-center">Localização</h1>

    <div v-if="paroquia?.localizacao" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Info Card -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl sticky top-24">
          <div class="card-body">
            <h2 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:map-marker" class="text-church-accent text-3xl" />
              Endereço
            </h2>
            
            <div class="space-y-3 mb-6">
              <p class="text-lg font-semibold text-church-primary">{{ paroquia.localizacao.endereco }}</p>
              <p class="text-base-content/70">
                {{ paroquia.localizacao.cidade }} - {{ paroquia.localizacao.estado }}
              </p>
              <p class="text-base-content/70">CEP: {{ paroquia.localizacao.cep }}</p>
              <p v-if="paroquia.localizacao.complemento" class="text-base-content/70">
                {{ paroquia.localizacao.complemento }}
              </p>
            </div>

            <div class="space-y-3">
              <a
                :href="`https://www.google.com/maps/dir/?api=1&destination=${paroquia.localizacao.latitude},${paroquia.localizacao.longitude}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-accent w-full gap-2"
              >
                <Icon icon="mdi:directions" class="text-xl" />
                Como Chegar
              </a>
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${paroquia.localizacao.latitude},${paroquia.localizacao.longitude}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline btn-primary w-full gap-2"
              >
                <Icon icon="mdi:open-in-new" class="text-xl" />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="lg:col-span-2">
        <div id="map" class="w-full h-[500px] rounded-2xl shadow-xl overflow-hidden" />
      </div>
    </div>
  </div>
</template>