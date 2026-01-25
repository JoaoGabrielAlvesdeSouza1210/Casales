<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { SolicitacaoVisita } from '@/types'
import { solicitarVisita } from '@/services/paroquiaService'
import { useForm } from '@/composables/useForm'

/**
 * Tipos de visita disponíveis
 */
const tiposVisita = [
  { value: 'enfermo', label: 'Visita a Enfermo' },
  { value: 'idoso', label: 'Visita a Idoso' },
  { value: 'sacramento', label: 'Sacramento dos Enfermos' },
  { value: 'comunhao', label: 'Comunhão Domiciliar' },
  { value: 'outro', label: 'Outro' }
]

/**
 * Formulário de solicitação
 */
const form = ref<SolicitacaoVisita>({
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  tipoVisita: '',
  nomePessoa: '',
  observacoes: '',
  urgente: false
})

/**
 * Composable para gerenciar o formulário
 */
const { loading, error, success, handleSubmit } = useForm(solicitarVisita)

/**
 * Reseta o formulário
 */
const resetForm = (): void => {
  form.value = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    tipoVisita: '',
    nomePessoa: '',
    observacoes: '',
    urgente: false
  }
}

/**
 * Submete o formulário de solicitação
 */
const onSubmit = async (): Promise<void> => {
  await handleSubmit(form.value)
  if (success.value) {
    resetForm()
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-[30vh] bg-gradient-to-r from-primary to-accent">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:home-heart" class="text-7xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Solicitar Visita Pastoral</h1>
          <p class="text-xl">Estamos aqui para levar a presença de Cristo até você</p>
        </div>
      </div>
    </section>

    <!-- Formulário -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <!-- Alertas -->
            <div v-if="success" role="alert" class="alert alert-success mb-6">
              <Icon icon="mdi:check-circle" class="text-2xl" />
              <span>Solicitação enviada com sucesso! Entraremos em contato em breve.</span>
            </div>

            <div v-if="error" role="alert" class="alert alert-error mb-6">
              <Icon icon="mdi:alert-circle" class="text-2xl" />
              <span>{{ error }}</span>
            </div>

            <!-- Formulário -->
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Dados do Solicitante -->
              <div class="border-l-4 border-accent pl-4 mb-6">
                <h2 class="text-2xl font-bold mb-4">Dados do Solicitante</h2>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Seu nome *</span>
                </label>
                <input
                  v-model="form.nome"
                  type="text"
                  placeholder="Digite seu nome"
                  class="input input-bordered w-full"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">E-mail *</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="seu@email.com"
                    class="input input-bordered w-full"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">Telefone *</span>
                  </label>
                  <input
                    v-model="form.telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    class="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <!-- Dados da Visita -->
              <div class="border-l-4 border-accent pl-4 mb-6 mt-8">
                <h2 class="text-2xl font-bold mb-4">Dados da Visita</h2>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Tipo de visita *</span>
                </label>
                <select
                  v-model="form.tipoVisita"
                  class="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Selecione o tipo de visita</option>
                  <option
                    v-for="tipo in tiposVisita"
                    :key="tipo.value"
                    :value="tipo.value"
                  >
                    {{ tipo.label }}
                  </option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Nome da pessoa a ser visitada *</span>
                </label>
                <input
                  v-model="form.nomePessoa"
                  type="text"
                  placeholder="Nome completo"
                  class="input input-bordered w-full"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Endereço completo *</span>
                </label>
                <textarea
                  v-model="form.endereco"
                  placeholder="Rua, número, bairro, cidade"
                  class="textarea textarea-bordered h-24"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Observações</span>
                </label>
                <textarea
                  v-model="form.observacoes"
                  placeholder="Informações adicionais sobre o estado de saúde, melhor horário, etc."
                  class="textarea textarea-bordered h-32"
                />
              </div>

              <!-- Urgência -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input
                    v-model="form.urgente"
                    type="checkbox"
                    class="checkbox checkbox-error"
                  />
                  <div>
                    <span class="label-text text-base font-semibold">Visita urgente</span>
                    <p class="text-sm text-base-content/70">Marque se a situação requer atenção imediata</p>
                  </div>
                </label>
              </div>

              <!-- Alerta Importante -->
              <div class="alert alert-info">
                <Icon icon="mdi:information" class="text-2xl" />
                <div>
                  <h3 class="font-bold">Importante</h3>
                  <p class="text-sm">
                    Em caso de emergência ou perigo de morte, entre em contato diretamente
                    com a secretaria paroquial pelos telefones disponíveis na seção "Sobre".
                  </p>
                </div>
              </div>

              <!-- Botões -->
              <div class="card-actions justify-end mt-8">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg gap-2"
                  :disabled="loading"
                >
                  <span v-if="loading" class="loading loading-spinner"></span>
                  <Icon v-else icon="mdi:send" class="text-xl" />
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
