<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * Mês selecionado
 */
const mesSelecionado = ref<Date>(new Date())

/**
 * Eventos da paróquia
 */
const eventos = computed(() => paroquiaStore.paroquia?.eventosRecorrentes || [])

/**
 * Formata data para exibição
 * @param data - Data a ser formatada
 * @returns Data formatada
 */
const formatarData = (data: Date): string => {
  return dayjs(data).format('MMMM [de] YYYY')
}

/**
 * Vai para o mês anterior
 */
const mesAnterior = (): void => {
  mesSelecionado.value = dayjs(mesSelecionado.value).subtract(1, 'month').toDate()
}

/**
 * Vai para o próximo mês
 */
const proximoMes = (): void => {
  mesSelecionado.value = dayjs(mesSelecionado.value).add(1, 'month').toDate()
}

/**
 * Volta para o mês atual
 */
const voltarHoje = (): void => {
  mesSelecionado.value = new Date()
}

onMounted(() => {
  // Carregar dados da paróquia se necessário
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-[30vh] bg-gradient-to-r from-primary to-accent">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:calendar-month" class="text-7xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Calendário de Eventos</h1>
          <p class="text-xl">Confira os próximos eventos da paróquia</p>
        </div>
      </div>
    </section>

    <!-- Navegação do Calendário -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <button @click="mesAnterior" class="btn btn-primary gap-2">
          <Icon icon="mdi:chevron-left" class="text-xl" />
          <span class="hidden sm:inline">Mês Anterior</span>
        </button>
        
        <button @click="voltarHoje" class="btn btn-accent gap-2">
          <Icon icon="mdi:calendar-today" class="text-xl" />
          Hoje
        </button>
        
        <button @click="proximoMes" class="btn btn-primary gap-2">
          <span class="hidden sm:inline">Próximo Mês</span>
          <Icon icon="mdi:chevron-right" class="text-xl" />
        </button>
      </div>

      <!-- Mês Atual -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold capitalize">{{ formatarData(mesSelecionado) }}</h2>
      </div>

      <!-- Lista de Eventos -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="evento in eventos"
          :key="evento.id"
          class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div class="card-body">
            <h3 class="card-title">
              <Icon :icon="evento.icone || 'mdi:calendar'" class="text-accent" />
              {{ evento.titulo }}
            </h3>
            
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:calendar" class="text-base-content/70" />
                <span>{{ evento.diaSemana }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <Icon icon="mdi:clock-outline" class="text-base-content/70" />
                <span>{{ evento.horario }}</span>
              </div>
              
              <div v-if="evento.local" class="flex items-center gap-2">
                <Icon icon="mdi:map-marker" class="text-base-content/70" />
                <span>{{ evento.local }}</span>
              </div>
            </div>
            
            <p v-if="evento.descricao" class="text-base-content/70 mt-4">
              {{ evento.descricao }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!eventos.length" class="text-center py-16">
        <Icon icon="mdi:calendar-blank" class="text-6xl text-base-content/30 mb-4 mx-auto" />
        <p class="text-xl text-base-content/50">Nenhum evento cadastrado</p>
      </div>
    </div>
  </div>
</template>
