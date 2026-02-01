<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { paroquiaService } from '@/services/paroquiaApiService'
import type { Paroquia } from '@/types/paroquia'

const router = useRouter()
const paroquias = ref<Paroquia[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  await loadParoquias()
})

async function loadParoquias() {
  isLoading.value = true
  error.value = null
  try {
    paroquias.value = await paroquiaService.getAll()
  } catch (err: any) {
    error.value = 'Erro ao carregar paróquias'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function editParoquia(id: number) {
  router.push({ name: 'admin-paroquias-editar', params: { id } })
}

async function deleteParoquia(id: number) {
  if (!confirm('Tem certeza que deseja excluir esta paróquia?')) return

  try {
    await paroquiaService.delete(id)
    await loadParoquias()
  } catch (err: any) {
    alert('Erro ao excluir paróquia')
    console.error(err)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Cabeçalho -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Paróquias</h1>
        <p class="text-base-content/60 mt-2">
          Gerencie as paróquias cadastradas no sistema
        </p>
      </div>
      <RouterLink
        :to="{ name: 'admin-paroquias-criar' }"
        class="btn btn-primary"
      >
        <Icon icon="mdi:plus" class="text-xl" />
        Nova Paróquia
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="alert alert-error">
      <Icon icon="mdi:alert-circle" class="text-2xl" />
      <span>{{ error }}</span>
    </div>

    <!-- Tabela -->
    <div v-else class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paroquia in paroquias" :key="paroquia.id">
            <td class="font-semibold">{{ paroquia.nome }}</td>
            <td>{{ paroquia.endereco }}</td>
            <td>{{ paroquia.telefone }}</td>
            <td>{{ paroquia.email }}</td>
            <td class="text-right">
              <div class="join">
                <button
                  class="btn btn-sm join-item btn-ghost"
                  @click="editParoquia(paroquia.id)"
                  title="Editar"
                >
                  <Icon icon="mdi:pencil" class="text-lg" />
                </button>
                <button
                  class="btn btn-sm join-item btn-ghost text-error"
                  @click="deleteParoquia(paroquia.id)"
                  title="Excluir"
                >
                  <Icon icon="mdi:delete" class="text-lg" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paroquias.length === 0">
            <td colspan="5" class="text-center py-8 text-base-content/60">
              Nenhuma paróquia cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
