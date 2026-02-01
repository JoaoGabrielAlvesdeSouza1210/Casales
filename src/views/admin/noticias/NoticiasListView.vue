<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { noticiaService } from '@/services/noticiaService'
import type { Noticia } from '@/types/noticia'

const router = useRouter()
const noticias = ref<Noticia[]>([])
const isLoading = ref(true)

onMounted(async () => {
  await loadNoticias()
})

async function loadNoticias() {
  isLoading.value = true
  try {
    noticias.value = await noticiaService.getAll()
  } catch (err: any) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function editNoticia(id: number) {
  router.push({ name: 'admin-noticias-editar', params: { id } })
}

async function deleteNoticia(id: number) {
  if (!confirm('Tem certeza que deseja excluir esta notícia?')) return

  try {
    await noticiaService.delete(id)
    await loadNoticias()
  } catch (err: any) {
    alert('Erro ao excluir notícia')
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Notícias</h1>
        <p class="text-base-content/60 mt-2">Gerencie as notícias da paróquia</p>
      </div>
      <RouterLink :to="{ name: 'admin-noticias-criar' }" class="btn btn-primary">
        <Icon icon="mdi:plus" class="text-xl" />
        Nova Notícia
      </RouterLink>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Data Publicação</th>
            <th>Destaque</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="noticia in noticias" :key="noticia.id">
            <td class="font-semibold">{{ noticia.titulo }}</td>
            <td>{{ noticia.categoria }}</td>
            <td>{{ formatDate(noticia.data_publicacao) }}</td>
            <td>
              <span v-if="noticia.destaque" class="badge badge-primary">Sim</span>
              <span v-else class="badge badge-ghost">Não</span>
            </td>
            <td class="text-right">
              <div class="join">
                <button class="btn btn-sm join-item btn-ghost" @click="editNoticia(noticia.id)">
                  <Icon icon="mdi:pencil" class="text-lg" />
                </button>
                <button class="btn btn-sm join-item btn-ghost text-error" @click="deleteNoticia(noticia.id)">
                  <Icon icon="mdi:delete" class="text-lg" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="noticias.length === 0">
            <td colspan="5" class="text-center py-8 text-base-content/60">
              Nenhuma notícia cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
