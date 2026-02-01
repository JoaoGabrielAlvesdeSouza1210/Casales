<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { liturgiaService, type Liturgia } from '@/services/liturgiaService'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

const liturgia = ref<Liturgia | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')
const dataAtual = ref(dayjs())

/**
 * Carrega a liturgia de uma data específica
 */
const carregarLiturgia = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    const dia = dataAtual.value.date()
    const mes = dataAtual.value.month() + 1 // dayjs retorna 0-11
    const ano = dataAtual.value.year()
    
    liturgia.value = await liturgiaService.buscarLiturgiaPorData(dia, mes, ano)
  } catch (error: any) {
    console.error('Erro ao carregar liturgia:', error)
    errorMessage.value = error.response?.data?.erro || 'Erro ao carregar liturgia. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

/**
 * Navega para o dia anterior
 */
const diaAnterior = () => {
  dataAtual.value = dataAtual.value.subtract(1, 'day')
  carregarLiturgia()
}

/**
 * Navega para o próximo dia
 */
const proximoDia = () => {
  dataAtual.value = dataAtual.value.add(1, 'day')
  carregarLiturgia()
}

/**
 * Volta para hoje
 */
const voltarHoje = () => {
  dataAtual.value = dayjs()
  carregarLiturgia()
}

/**
 * Formata a data para exibição
 */
const formatarData = (data: string): string => {
  // A API retorna no formato "DD/MM/YYYY"
  const [dia, mes, ano] = data.split('/')
  return dayjs(`${ano}-${mes}-${dia}`).format('dddd, D [de] MMMM [de] YYYY')
}

/**
 * Retorna a classe CSS para a cor litúrgica
 */
const corLiturgicaClass = (cor: string): string => {
  const cores: Record<string, string> = {
    'Verde': '#4ade80',
    'Vermelho': '#ef4444',
    'Roxo': '#a855f7',
    'Rosa': '#ec4899',
    'Branco': '#f3f4f6'
  }
  return cores[cor] || '#3b82f6'
}

onMounted(() => {
  carregarLiturgia()
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-5xl font-bold text-church-primary text-center">Liturgia Diária</h1>

    <!-- Controles de Navegação -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button
        @click="diaAnterior"
        class="btn btn-primary gap-2"
        :disabled="isLoading"
      >
        <Icon icon="mdi:chevron-left" class="text-xl" />
        <span class="hidden sm:inline">Dia Anterior</span>
      </button>
      <button
        @click="voltarHoje"
        class="btn btn-accent gap-2"
        :disabled="isLoading"
      >
        <Icon icon="mdi:calendar-today" class="text-xl" />
        Hoje
      </button>
      <button
        @click="proximoDia"
        class="btn btn-primary gap-2"
        :disabled="isLoading"
      >
        <span class="hidden sm:inline">Próximo Dia</span>
        <Icon icon="mdi:chevron-right" class="text-xl" />
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center p-16">
      <span class="loading loading-spinner loading-lg text-church-accent"></span>
      <p class="mt-4 text-lg text-base-content/70">Carregando liturgia...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center py-16">
        <Icon icon="mdi:alert-circle" class="text-6xl text-error mb-4" />
        <p class="text-xl text-base-content mb-6">{{ errorMessage }}</p>
        <button @click="carregarLiturgia()" class="btn btn-primary gap-2">
          <Icon icon="mdi:refresh" />
          Tentar Novamente
        </button>
      </div>
    </div>

    <!-- Conteúdo da Liturgia -->
    <div v-else-if="liturgia" class="space-y-6">
      <!-- Header da Liturgia -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <p class="text-lg text-base-content/70 capitalize mb-2">{{ formatarData(liturgia.data) }}</p>
          <h2 class="text-3xl font-bold text-church-primary mb-4">{{ liturgia.liturgia }}</h2>
          <div 
            class="badge badge-lg text-white font-semibold" 
            :style="{ backgroundColor: corLiturgicaClass(liturgia.cor) }"
          >
            Cor Litúrgica: {{ liturgia.cor }}
          </div>
        </div>
      </div>

      <!-- Leituras -->
      <div class="space-y-6">
        <!-- Primeira Leitura -->
        <div 
          v-for="(leitura, index) in liturgia.leituras.primeiraLeitura" 
          :key="`primeira-${index}`"
          class="card bg-base-100 shadow-xl border-l-4 border-church-primary"
        >
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:book-open-page-variant" class="text-church-accent" />
              Primeira Leitura
              <span v-if="liturgia.leituras.primeiraLeitura.length > 1" class="text-sm">(Opção {{ index + 1 }})</span>
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ leitura.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ leitura.titulo }}</p>
            <div class="prose max-w-none whitespace-pre-line" v-html="leitura.texto" />
          </div>
        </div>

        <!-- Salmo Responsorial -->
        <div 
          v-for="(salmo, index) in liturgia.leituras.salmo" 
          :key="`salmo-${index}`"
          class="card bg-base-100 shadow-xl border-l-4 border-church-accent"
        >
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:music-note" class="text-church-accent" />
              Salmo Responsorial
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ salmo.referencia }}</p>
            <div class="alert bg-church-accent/10 border-church-accent mb-4">
              <p class="text-lg font-semibold text-church-accent italic">{{ salmo.refrao }}</p>
            </div>
            <div class="prose max-w-none whitespace-pre-line" v-html="salmo.texto" />
          </div>
        </div>

        <!-- Segunda Leitura -->
        <div 
          v-if="liturgia.leituras.segundaLeitura"
          v-for="(leitura, index) in liturgia.leituras.segundaLeitura" 
          :key="`segunda-${index}`"
          class="card bg-base-100 shadow-xl border-l-4 border-church-primary"
        >
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:book-open-page-variant" class="text-church-accent" />
              Segunda Leitura
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ leitura.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ leitura.titulo }}</p>
            <div class="prose max-w-none whitespace-pre-line" v-html="leitura.texto" />
          </div>
        </div>

        <!-- Evangelho -->
        <div 
          v-for="(evangelho, index) in liturgia.leituras.evangelho" 
          :key="`evangelho-${index}`"
          class="card bg-gradient-to-br from-red-50 to-red-100 shadow-xl border-l-4 border-error"
        >
          <div class="card-body">
            <h3 class="card-title text-2xl flex items-center gap-3 mb-4">
              <Icon icon="mdi:cross" class="text-error" />
              Evangelho
              <span v-if="liturgia.leituras.evangelho.length > 1" class="text-sm">(Opção {{ index + 1 }})</span>
            </h3>
            <p class="text-sm font-semibold text-base-content/70 mb-2">{{ evangelho.referencia }}</p>
            <p class="text-lg font-semibold text-church-primary mb-4">{{ evangelho.titulo }}</p>
            <div class="prose max-w-none whitespace-pre-line" v-html="evangelho.texto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>