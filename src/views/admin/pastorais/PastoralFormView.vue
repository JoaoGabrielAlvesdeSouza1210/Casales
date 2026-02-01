<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { pastoralService } from '@/services/pastoralService'
import type { Pastoral } from '@/types/paroquia'
import { paroquiaService } from '@/services/paroquiaApiService'
import type { Paroquia } from '@/types/paroquia'

const router = useRouter()
const route = useRoute()
const isEditing = ref(false)
const paroquias = ref<Paroquia[]>([])

const form = ref<Partial<Pastoral>>({
  paroquia_id:  '',
  nome: '',
  descricao: '',
  coordenador: '',
  contato: '',
  imagem: '',
  icone: 'mdi:account-group',
  horarioReuniao: '',
  localReuniao: '',
  objetivos: '',
  atividades: [],
  ativa: true
})

const atividadeTemp = ref('')
const isSaving = ref(false)

onMounted(async () => {
  await loadParoquias()
  const id = route.params.id
  if (id) {
    isEditing.value = true
    await loadPastoral(Number(id))
  }
})

async function loadPastoral(id: number) {
  try {
    const pastoral = await pastoralService.getById(id)
    form.value = { ...pastoral }
  } catch (err) {
    console.error(err)
  }
}

async function loadParoquias() {
  try {
    paroquias.value = await paroquiaService.getAll()
  } catch (err) {
    console.error(err)
  }
}

function adicionarAtividade() {
  if (atividadeTemp.value.trim()) {
    if (!form.value.atividades) {
      form.value.atividades = []
    }
    form.value.atividades.push(atividadeTemp.value.trim())
    atividadeTemp.value = ''
  }
}

function removerAtividade(index: number) {
  form.value.atividades?.splice(index, 1)
}

async function handleSubmit() {
  isSaving.value = true
  try {
    if (isEditing.value && form.value.id) {
      await pastoralService.update(form.value.id, form.value)
    } else {
      await pastoralService.create(form.value)
    }
    router.push({ name: 'admin-pastorais' })
  } catch (err) {
    alert('Erro ao salvar pastoral')
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
      <h1 class="text-3xl font-bold">{{ isEditing ? 'Editar' : 'Nova' }} Pastoral</h1>
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
          <legend class="fieldset-legend">Nome *</legend>
          <input 
            v-model="form.nome" 
            type="text" 
            class="input input-bordered" 
            placeholder="Ex: Pastoral da Juventude" 
            required 
          />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Descrição *</legend>
          <textarea 
            v-model="form.descricao" 
            class="textarea textarea-bordered h-24" 
            placeholder="Descreva brevemente a pastoral..."
            required
          ></textarea>
        </fieldset>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Coordenador</legend>
            <input 
              v-model="form.coordenador" 
              type="text" 
              class="input input-bordered" 
              placeholder="Nome do coordenador" 
            />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Contato</legend>
            <input 
              v-model="form.contato" 
              type="text" 
              class="input input-bordered" 
              placeholder="Telefone ou email" 
            />
          </fieldset>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Horário de Reunião</legend>
            <input 
              v-model="form.horarioReuniao" 
              type="text" 
              class="input input-bordered" 
              placeholder="Ex: Terças-feiras às 19h" 
            />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Local de Reunião</legend>
            <input 
              v-model="form.localReuniao" 
              type="text" 
              class="input input-bordered" 
              placeholder="Ex: Salão paroquial" 
            />
          </fieldset>
        </div>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Objetivos</legend>
          <textarea 
            v-model="form.objetivos" 
            class="textarea textarea-bordered h-32" 
            placeholder="Descreva os objetivos da pastoral..."
          ></textarea>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Atividades</legend>
          
          <div class="flex gap-2 mb-4">
            <input 
              v-model="atividadeTemp" 
              type="text" 
              class="input input-bordered flex-1" 
              placeholder="Digite uma atividade"
              @keyup.enter="adicionarAtividade"
            />
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="adicionarAtividade"
            >
              <Icon icon="mdi:plus" />
              Adicionar
            </button>
          </div>

          <div v-if="form.atividades && form.atividades.length > 0" class="space-y-2">
            <div 
              v-for="(atividade, index) in form.atividades" 
              :key="index"
              class="flex items-center gap-2 p-3 bg-base-200 rounded-lg"
            >
              <Icon icon="mdi:check-circle" class="text-success" />
              <span class="flex-1">{{ atividade }}</span>
              <button 
                type="button" 
                class="btn btn-ghost btn-sm btn-circle" 
                @click="removerAtividade(index)"
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">URL da Imagem</legend>
          <input 
            v-model="form.imagem" 
            type="url" 
            class="input input-bordered" 
            placeholder="https://exemplo.com/imagem.jpg" 
          />
          <p class="label">Imagem de capa da pastoral</p>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Ícone</legend>
          <input 
            v-model="form.icone" 
            type="text" 
            class="input input-bordered" 
            placeholder="mdi:account-group" 
          />
          <p class="label">Nome do ícone do Iconify (opcional)</p>
        </fieldset>

        <div class="divider"></div>

        <label class="label cursor-pointer justify-start gap-4">
          <input v-model="form.ativa" type="checkbox" class="checkbox checkbox-primary" />
          <div class="flex flex-col">
            <span class="label-text font-medium">Pastoral ativa</span>
            <span class="label-text-alt opacity-60">Pastorais inativas não aparecem na área pública</span>
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
