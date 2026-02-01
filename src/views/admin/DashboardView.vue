<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// Estado das estatísticas
const stats = ref({
  paroquias: 0,
  noticias: 0,
  pastorais: 0,
  intencoesPendentes: 0,
  confissoesPendentes: 0,
  visitasPendentes: 0
})

const isLoading = ref(true)

// Carregar estatísticas
onMounted(async () => {
  try {
    // TODO: Implementar chamadas reais à API
    // Simulação de dados por enquanto
    setTimeout(() => {
      stats.value = {
        paroquias: 1,
        noticias: 12,
        pastorais: 8,
        intencoesPendentes: 5,
        confissoesPendentes: 3,
        visitasPendentes: 2
      }
      isLoading.value = false
    }, 500)
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Cabeçalho -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-base-content/60 mt-2">
        Visão geral do sistema de gerenciamento paroquial
      </p>
    </div>

    <!-- Estatísticas -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="stat bg-base-100 shadow skeleton h-32"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Paróquias -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-primary">
          <Icon icon="mdi:church" class="text-4xl" />
        </div>
        <div class="stat-title">Paróquias</div>
        <div class="stat-value text-primary">{{ stats.paroquias }}</div>
        <div class="stat-desc">Total cadastradas</div>
      </div>

      <!-- Notícias -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-secondary">
          <Icon icon="mdi:newspaper" class="text-4xl" />
        </div>
        <div class="stat-title">Notícias</div>
        <div class="stat-value text-secondary">{{ stats.noticias }}</div>
        <div class="stat-desc">Publicadas</div>
      </div>

      <!-- Pastorais -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-accent">
          <Icon icon="mdi:account-group" class="text-4xl" />
        </div>
        <div class="stat-title">Pastorais</div>
        <div class="stat-value text-accent">{{ stats.pastorais }}</div>
        <div class="stat-desc">Ativas</div>
      </div>

      <!-- Intenções Pendentes -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-warning">
          <Icon icon="mdi:candle" class="text-4xl" />
        </div>
        <div class="stat-title">Intenções de Missa</div>
        <div class="stat-value text-warning">{{ stats.intencoesPendentes }}</div>
        <div class="stat-desc">Pendentes de aprovação</div>
      </div>

      <!-- Confissões Pendentes -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-info">
          <Icon icon="mdi:calendar-check" class="text-4xl" />
        </div>
        <div class="stat-title">Confissões</div>
        <div class="stat-value text-info">{{ stats.confissoesPendentes }}</div>
        <div class="stat-desc">Agendamentos pendentes</div>
      </div>

      <!-- Visitas Pendentes -->
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-figure text-error">
          <Icon icon="mdi:home-heart" class="text-4xl" />
        </div>
        <div class="stat-title">Visitas Pastorais</div>
        <div class="stat-value text-error">{{ stats.visitasPendentes }}</div>
        <div class="stat-desc">Solicitações pendentes</div>
      </div>
    </div>

    <!-- Ações rápidas -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RouterLink
          :to="{ name: 'admin-noticias-criar' }"
          class="card bg-primary text-primary-content hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div class="card-body items-center text-center">
            <Icon icon="mdi:plus-circle" class="text-5xl mb-2" />
            <h3 class="card-title">Nova Notícia</h3>
          </div>
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin-pastorais-criar' }"
          class="card bg-secondary text-secondary-content hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div class="card-body items-center text-center">
            <Icon icon="mdi:plus-circle" class="text-5xl mb-2" />
            <h3 class="card-title">Nova Pastoral</h3>
          </div>
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin-liturgia-criar' }"
          class="card bg-accent text-accent-content hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div class="card-body items-center text-center">
            <Icon icon="mdi:plus-circle" class="text-5xl mb-2" />
            <h3 class="card-title">Nova Liturgia</h3>
          </div>
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin-intencoes' }"
          class="card bg-warning text-warning-content hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div class="card-body items-center text-center">
            <Icon icon="mdi:clipboard-check" class="text-5xl mb-2" />
            <h3 class="card-title">Gerenciar Solicitações</h3>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
