<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { intencaoMissaService } from '@/services/intencaoMissaService'
import type { IntencaoMissa } from '@/types/intencaoMissa'

const intencoes = ref<IntencaoMissa[]>([])
const isLoading = ref(true)
const filter = ref<'Todas' | 'Pendente' | 'Aprovada' | 'Rejeitada'>('Todas')

onMounted(async () => {
  await loadIntencoes()
})

async function loadIntencoes() {
  isLoading.value = true
  try {
    const response = await intencaoMissaService.getAll()
    intencoes.value = response
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const filteredIntencoes = computed(() => {
  if (filter.value === 'Todas') return intencoes.value
  return intencoes.value.filter(i => i.status === filter.value)
})

async function updateStatus(id: number, status: 'Aprovada' | 'Rejeitada') {
  try {
    await intencaoMissaService.updateStatus(id, status)
    await loadIntencoes()
  } catch (err) {
    alert('Erro ao atualizar status')
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold">Intenções de Missa</h1>
      <p class="text-base-content/60 mt-2">Gerencie as intenções de missa solicitadas</p>
    </div>

    <!-- Filtros -->
    <div class="tabs tabs-boxed w-fit">
      <a class="tab" :class="{ 'tab-active': filter === 'Todas' }" @click="filter = 'Todas'">
        Todas
      </a>
      <a class="tab" :class="{ 'tab-active': filter === 'Pendente' }" @click="filter = 'Pendente'">
        Pendentes
      </a>
      <a class="tab" :class="{ 'tab-active': filter === 'Aprovada' }" @click="filter = 'Aprovada'">
        Aprovadas
      </a>
      <a class="tab" :class="{ 'tab-active': filter === 'Rejeitada' }" @click="filter = 'Rejeitada'">
        Rejeitadas
      </a>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Intenção</th>
            <th>Data Desejada</th>
            <th>Status</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="intencao in filteredIntencoes" :key="intencao.id">
            <td>{{ intencao.nome_solicitante }}</td>
            <td>{{ intencao.intencao }}</td>
            <td>{{ formatDate(intencao.data_desejada) }}</td>
            <td>
              <span 
                class="badge"
                :class="{
                  'badge-warning': intencao.status === 'Pendente',
                  'badge-success': intencao.status === 'Aprovada',
                  'badge-error': intencao.status === 'Rejeitada'
                }"
              >
                {{ intencao.status }}
              </span>
            </td>
            <td class="text-right">
              <div v-if="intencao.status === 'Pendente'" class="join">
                <button 
                  class="btn btn-sm join-item btn-success"
                  @click="updateStatus(intencao.id, 'Aprovada')"
                >
                  <Icon icon="mdi:check" />
                </button>
                <button 
                  class="btn btn-sm join-item btn-error"
                  @click="updateStatus(intencao.id, 'Rejeitada')"
                >
                  <Icon icon="mdi:close" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredIntencoes.length === 0">
            <td colspan="5" class="text-center py-8 text-base-content/60">
              Nenhuma intenção encontrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
