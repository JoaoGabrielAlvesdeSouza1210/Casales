<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { paroquiaService } from '@/services/paroquiaApiService'
import type { Paroquia } from '@/types/paroquia'

const router = useRouter()
const route = useRoute()
const isEditing = ref(false)

const form = ref<Partial<Paroquia>>({
  nome: '',
  descricao: '',
  historia: '',
  padroeiro: '',
  telefone: '',
  email: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  site: '',
  facebook: '',
  instagram: '',
  youtube: '',
  latitude: undefined,
  longitude: undefined,
  ativa: true,
  localizacao: {
    latitude: 0,
    longitude: 0,
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  },
  redesSociais: {},
  horariosMissa: [],
  eventosRecorrentes: [],
  pastorais: []
})

const isLoading = ref(false)
const isSaving = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEditing.value = true
    await loadParoquia(Number(id))
  }
})

async function loadParoquia(id: number) {
  isLoading.value = true
  try {
    const paroquia = await paroquiaService.getById(id)
    form.value = { ...paroquia }
  } catch (err: any) {
    error.value = 'Erro ao carregar paróquia'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

async function handleSubmit() {
  isSaving.value = true
  error.value = null

  try {
    if (isEditing.value && form.value.id) {
      await paroquiaService.update(form.value.id, form.value)
    } else {
      await paroquiaService.create(form.value)
    }
    router.push({ name: 'admin-paroquias' })
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar paróquia'
    console.error(err)
  } finally {
    isSaving.value = false
  }
}

function handleCancel() {
  router.push({ name: 'admin-paroquias' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Cabeçalho -->
    <div class="flex items-center gap-4">
      <button class="btn btn-ghost btn-circle" @click="handleCancel">
        <Icon icon="mdi:arrow-left" class="text-2xl" />
      </button>
      <div>
        <h1 class="text-3xl font-bold">
          {{ isEditing ? 'Editar' : 'Nova' }} Paróquia
        </h1>
        <p class="text-base-content/60 mt-2">
          Preencha os dados da paróquia
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Formulário -->
    <form v-else @submit.prevent="handleSubmit" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Mensagem de erro -->
        <div v-if="error" class="alert alert-error mb-4">
          <Icon icon="mdi:alert-circle" class="text-2xl" />
          <span>{{ error }}</span>
        </div>

        <!-- Dados Básicos -->
        <h2 class="text-xl font-bold mb-4">Dados Básicos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nome *</span>
            </label>
            <input
              v-model="form.nome"
              type="text"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Telefone *</span>
            </label>
            <input
              v-model="form.telefone"
              type="tel"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control md:col-span-2">
            <label class="label">
              <span class="label-text">Email *</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control md:col-span-2">
            <label class="label">
              <span class="label-text">Endereço *</span>
            </label>
            <input
              v-model="form.endereco"
              type="text"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Bairro</span>
            </label>
            <input
              v-model="form.bairro"
              type="text"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Cidade *</span>
            </label>
            <input
              v-model="form.cidade"
              type="text"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estado *</span>
            </label>
            <input
              v-model="form.estado"
              type="text"
              class="input input-bordered"
              maxlength="2"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">CEP</span>
            </label>
            <input
              v-model="form.cep"
              type="text"
              class="input input-bordered"
            />
          </div>
        </div>

        <div class="divider"></div>

        <!-- Redes Sociais -->
        <h2 class="text-xl font-bold mb-4">Redes Sociais</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Site</span>
            </label>
            <input
              v-model="form.site"
              type="url"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Facebook</span>
            </label>
            <input
              v-model="form.facebook"
              type="url"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Instagram</span>
            </label>
            <input
              v-model="form.instagram"
              type="url"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">YouTube</span>
            </label>
            <input
              v-model="form.youtube"
              type="url"
              class="input input-bordered"
            />
          </div>
        </div>

        <div class="divider"></div>

        <!-- Localização -->
        <h2 class="text-xl font-bold mb-4">Localização</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Latitude</span>
            </label>
            <input
              v-model.number="form.latitude"
              type="number"
              step="any"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Longitude</span>
            </label>
            <input
              v-model.number="form.longitude"
              type="number"
              step="any"
              class="input input-bordered"
            />
          </div>
        </div>

        <div class="divider"></div>

        <!-- Descrições -->
        <h2 class="text-xl font-bold mb-4">Sobre a Paróquia</h2>
        <div class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Descrição</span>
            </label>
            <textarea
              v-model="form.descricao"
              class="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">História</span>
            </label>
            <textarea
              v-model="form.historia"
              class="textarea textarea-bordered h-32"
            ></textarea>
          </div>
        </div>

        <!-- Botões -->
        <div class="card-actions justify-end mt-6">
          <button
            type="button"
            class="btn btn-ghost"
            @click="handleCancel"
            :disabled="isSaving"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSaving"
          >
            <span v-if="isSaving" class="loading loading-spinner"></span>
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
