<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { noticiaService } from '@/services/noticiaService'
import { paroquiaService } from '@/services/paroquiaApiService'
import type { Noticia } from '@/types/noticia'
import type { Paroquia } from '@/types/paroquia'

const router = useRouter()
const route = useRoute()
const isEditing = ref(false)

const form = ref<Partial<Noticia>>({
  paroquia_id: '',
  titulo: '',
  resumo: '',
  conteudo: '',
  autor: '',
  categoria: 'Geral',
  destaque: false,
  data_publicacao: new Date().toISOString().split('T')[0]
})

const paroquias = ref<Paroquia[]>([])
const isSaving = ref(false)

onMounted(async () => {
  await loadParoquias()
  const id = route.params.id
  if (id) {
    isEditing.value = true
    await loadNoticia(Number(id))
  }
})

async function loadParoquias() {
  try {
    paroquias.value = await paroquiaService.getAll()
  } catch (err) {
    console.error(err)
  }
}

async function loadNoticia(id: number) {
  try {
    const noticia = await noticiaService.getById(id)
    form.value = { ...noticia }
  } catch (err) {
    console.error(err)
  }
}

async function handleSubmit() {
  isSaving.value = true
  try {
    if (isEditing.value && form.value.id) {
      await noticiaService.update(form.value.id, form.value)
    } else {
      await noticiaService.create(form.value)
    }
    router.push({ name: 'admin-noticias' })
  } catch (err) {
    alert('Erro ao salvar notícia')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button class="btn btn-ghost btn-circle" @click="router.back()">
        <Icon icon="mdi:arrow-left" class="text-2xl" />
      </button>
      <h1 class="text-3xl font-bold">{{ isEditing ? 'Editar' : 'Nova' }} Notícia</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-xl">
      <div class="card-body space-y-6">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Paróquia</legend>
          <select v-model="form.paroquia_id" class="select select-bordered">
            <option disabled selected>Selecione uma paróquia</option>
            <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">
              {{ paroquia.nome }}
            </option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Título *</legend>
          <input 
            v-model="form.titulo" 
            type="text" 
            class="input input-bordered" 
            placeholder="Digite o título da notícia" 
            required 
          />
        </fieldset>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Categoria *</legend>
            <input 
              v-model="form.categoria" 
              type="text" 
              class="input input-bordered" 
              placeholder="Ex: Eventos, Avisos" 
              required 
            />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Autor</legend>
            <input 
              v-model="form.autor" 
              type="text" 
              class="input input-bordered" 
              placeholder="Nome do autor" 
            />
          </fieldset>
        </div>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Data de Publicação *</legend>
          <input 
            v-model="form.data_publicacao" 
            type="date" 
            class="input input-bordered" 
            required 
          />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Resumo</legend>
          <textarea 
            v-model="form.resumo" 
            class="textarea textarea-bordered h-24" 
            placeholder="Escreva um breve resumo da notícia..."
          ></textarea>
          <p class="label">Aparecerá nas listagens</p>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Conteúdo Completo *</legend>
          <textarea 
            v-model="form.conteudo" 
            class="textarea textarea-bordered h-64" 
            placeholder="Escreva o conteúdo completo da notícia..."
            required
          ></textarea>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">URL da Imagem</legend>
          <input 
            v-model="form.imagem" 
            type="url" 
            class="input input-bordered" 
            placeholder="https://exemplo.com/imagem.jpg" 
          />
          <p class="label">Cole o link da imagem de capa</p>
        </fieldset>

        <div class="divider"></div>

        <label class="label cursor-pointer justify-start gap-4">
          <input v-model="form.destaque" type="checkbox" class="checkbox checkbox-primary" />
          <div class="flex flex-col">
            <span class="label-text font-medium">Marcar como destaque</span>
            <span class="label-text-alt opacity-60">Notícias em destaque aparecem na página inicial</span>
          </div>
        </label>

        <div class="card-actions justify-end pt-4">
          <button type="button" class="btn btn-ghost" @click="router.back()" :disabled="isSaving">
            <Icon icon="mdi:close" />
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSaving">
            <span v-if="isSaving" class="loading loading-spinner"></span>
            <Icon v-else icon="mdi:content-save" />
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
