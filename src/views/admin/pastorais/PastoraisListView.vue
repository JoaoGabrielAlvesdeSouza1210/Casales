<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { pastoralService } from '@/services/pastoralService'
import type { Pastoral } from '@/types/paroquia'

const router = useRouter()
const pastorais = ref<Pastoral[]>([])
const isLoading = ref(true)

onMounted(async () => {
  await loadPastorais()
})

async function loadPastorais() {
  isLoading.value = true
  try {
    pastorais.value = await pastoralService.getAll()
  } catch (err: any) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function editPastoral(id: number) {
  router.push({ name: 'admin-pastorais-editar', params: { id } })
}

async function deletePastoral(id: number) {
  if (!confirm('Tem certeza que deseja excluir esta pastoral?')) return

  try {
    await pastoralService.delete(id)
    await loadPastorais()
  } catch (err: any) {
    alert('Erro ao excluir pastoral')
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Pastorais</h1>
        <p class="text-base-content/60 mt-2">Gerencie as pastorais da paróquia</p>
      </div>
      <RouterLink :to="{ name: 'admin-pastorais-criar' }" class="btn btn-primary">
        <Icon icon="mdi:plus" class="text-xl" />
        Nova Pastoral
      </RouterLink>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="pastoral in pastorais"
        :key="pastoral.id"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <figure v-if="pastoral.imagem" class="h-48">
          <img :src="pastoral.imagem" :alt="pastoral.nome" class="w-full h-full object-cover" />
        </figure>
        <div v-else class="h-48 bg-base-200 flex items-center justify-center">
          <Icon :icon="pastoral.icone || 'mdi:account-group'" class="text-6xl text-base-content/20" />
        </div>
        
        <div class="card-body">
          <h2 class="card-title">
            {{ pastoral.nome }}
            <div class="badge badge-sm" :class="pastoral.ativa ? 'badge-success' : 'badge-ghost'">
              {{ pastoral.ativa ? 'Ativa' : 'Inativa' }}
            </div>
          </h2>
          
          <p class="text-sm opacity-70 line-clamp-2">{{ pastoral.descricao }}</p>

          <div v-if="pastoral.coordenador" class="flex items-center gap-2 text-sm mt-2">
            <Icon icon="mdi:account" class="text-lg" />
            <span>{{ pastoral.coordenador }}</span>
          </div>

          <div v-if="pastoral.horarioReuniao" class="flex items-center gap-2 text-sm">
            <Icon icon="mdi:clock" class="text-lg" />
            <span>{{ pastoral.horarioReuniao }}</span>
          </div>

          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-ghost" @click="editPastoral(pastoral.id)">
              <Icon icon="mdi:pencil" class="text-lg" />
            </button>
            <button class="btn btn-sm btn-ghost text-error" @click="deletePastoral(pastoral.id)">
              <Icon icon="mdi:delete" class="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="pastorais.length === 0" class="col-span-full text-center py-12 text-base-content/60">
        Nenhuma pastoral cadastrada
      </div>
    </div>
  </div>
</template>
