<script setup lang="ts">
import { onMounted } from 'vue'
import { useLiturgiaStore } from '@/stores/liturgia'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

/**
 * Store da liturgia
 */
const liturgiaStore = useLiturgiaStore()

/**
 * Formata a data para exibição
 * @param data - Data no formato YYYY-MM-DD
 * @returns Data formatada em português
 */
const formatarData = (data: string): string => {
  return dayjs(data).format('dddd, D [de] MMMM [de] YYYY')
}

onMounted(async () => {
  await liturgiaStore.carregarLiturgia()
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-5xl font-bold text-church-primary text-center">Liturgia Diária</h1>

    <!-- Controles de Navegação -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button
        @click="liturgiaStore.diaAnterior"
        class="btn btn-primary gap-2"
        :disabled="liturgiaStore.loading"
      >
        <Icon icon="mdi:chevron-left" class="text-xl" />
        <span class="hidden sm:inline">Dia Anterior</span>
      </button>
      <button
        @click="liturgiaStore.voltarHoje"
        class="btn btn-accent gap-2"
        :disabled="liturgiaStore.loading"
      >
        <Icon icon="mdi:calendar-today" class="text-xl" />
        Hoje
      </button>
      <button
        @click="liturgiaStore.proximoDia"
        class="btn btn-primary gap-2"
        :disabled="liturgiaStore.loading"
      >
        <span class="hidden sm:inline">Próximo Dia</span>
        <Icon icon="mdi:chevron-right" class="text-xl" />
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="liturgiaStore.loading" class="flex flex-col items-center justify-center p-16">
      <span class="loading loading-spinner loading-lg text-church-accent"></span>
      <p class="mt-4 text-lg text-base-content/70">Carregando liturgia...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="liturgiaStore.error" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center py-16">
        <Icon icon="mdi:alert-circle" class="text-6xl text-error mb-4" />
        <p class="text-xl text-base-content mb-6">{{ liturgiaStore.error }}</p>
        <button @click="liturgiaStore.carregarLiturgia()" class="btn btn-primary gap-2">
          <Icon icon="mdi:refresh" />
          Tentar Novamente
        </button>
      </div>
    </div>

    <!-- Conteúdo da Liturgia -->
    <div v-else-if="liturgiaStore.liturgia" class="space-y-6">
      <!-- Header da Liturgia -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <p class="text-lg text-base-content/70 capitalize mb-2">{{ formatarData(liturgiaStore.dataAtual) }}</p>
          <h2 class="text-3xl font-bold text-church-primary mb-4">{{ liturgiaStore.liturgia.titulo }}</h2>
          <div class="badge badge-lg text-white font-semibold" :style="{ backgroundColor: liturgiaStore.liturgia.cor }">
            Cor Litúrgica
          </div>
        </div>
      </div>

      <!-- Leituras -->
      <div class="space-y-6">
        <!-- Primeira Leitura -->
        <div class="card bg-base-100 shadow-xl border-l-4 border-church-primary">
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:book-open-page-variant" class="text-church-accent" />
              Primeira Leitura
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ liturgiaStore.liturgia.primeiraLeitura.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ liturgiaStore.liturgia.primeiraLeitura.titulo }}</p>
            <div class="prose max-w-none" v-html="liturgiaStore.liturgia.primeiraLeitura.texto" />
          </div>
        </div>

        <!-- Salmo Responsorial -->
        <div class="card bg-base-100 shadow-xl border-l-4 border-church-accent">
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:music-note" class="text-church-accent" />
              Salmo Responsorial
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ liturgiaStore.liturgia.salmo.referencia }}</p>
            <div class="alert bg-church-accent/10 border-church-accent mb-4">
              <p class="text-lg font-semibold text-church-accent italic">{{ liturgiaStore.liturgia.salmo.refrao }}</p>
            </div>
            <div class="prose max-w-none" v-html="liturgiaStore.liturgia.salmo.texto" />
          </div>
        </div>

        <!-- Segunda Leitura -->
        <div v-if="liturgiaStore.liturgia.segundaLeitura" class="card bg-base-100 shadow-xl border-l-4 border-church-primary">
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:book-open-page-variant" class="text-church-accent" />
              Segunda Leitura
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ liturgiaStore.liturgia.segundaLeitura.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ liturgiaStore.liturgia.segundaLeitura.titulo }}</p>
            <div class="prose max-w-none" v-html="liturgiaStore.liturgia.segundaLeitura.texto" />
          </div>
        </div>

        <!-- Evangelho -->
        <div class="card bg-gradient-to-br from-red-50 to-red-100 shadow-xl border-l-4 border-error">
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:cross" class="text-error" />
              Evangelho
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ liturgiaStore.liturgia.evangelho.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ liturgiaStore.liturgia.evangelho.titulo }}</p>
            <div class="prose max-w-none" v-html="liturgiaStore.liturgia.evangelho.texto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>