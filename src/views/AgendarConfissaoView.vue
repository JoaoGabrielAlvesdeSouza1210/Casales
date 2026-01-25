<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { AgendamentoConfissao } from '@/types'
import { agendarConfissao } from '@/services/paroquiaService'
import { useForm } from '@/composables/useForm'

/**
 * Formulário de agendamento
 */
const form = ref<AgendamentoConfissao>({
  nome: '',
  email: '',
  telefone: '',
  dataDesejada: '',
  horario: '',
  observacoes: ''
})

/**
 * Composable para gerenciar o formulário
 */
const { loading, error, success, handleSubmit } = useForm(agendarConfissao)

/**
 * Reseta o formulário
 */
const resetForm = (): void => {
  form.value = {
    nome: '',
    email: '',
    telefone: '',
    dataDesejada: '',
    horario: '',
    observacoes: ''
  }
}

/**
 * Submete o formulário de agendamento
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
          <Icon icon="mdi:account-check" class="text-7xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Agendar Confissão</h1>
          <p class="text-xl">Marque seu horário para o sacramento da reconciliação</p>
        </div>
      </div>
    </section>

    <!-- Formulário -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto">
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <!-- Alertas -->
            <div v-if="success" role="alert" class="alert alert-success mb-6">
              <Icon icon="mdi:check-circle" class="text-2xl" />
              <span>Agendamento realizado com sucesso! Entraremos em contato para confirmar.</span>
            </div>

            <div v-if="error" role="alert" class="alert alert-error mb-6">
              <Icon icon="mdi:alert-circle" class="text-2xl" />
              <span>{{ error }}</span>
            </div>

            <!-- Formulário -->
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Nome -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Nome completo *</span>
                </label>
                <input
                  v-model="form.nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  class="input input-bordered w-full"
                  required
                />
              </div>

              <!-- Email e Telefone -->
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

              <!-- Data e Horário -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">Data desejada *</span>
                  </label>
                  <input
                    v-model="form.dataDesejada"
                    type="date"
                    class="input input-bordered w-full"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">Horário *</span>
                  </label>
                  <input
                    v-model="form.horario"
                    type="time"
                    class="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <!-- Observações -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Observações</span>
                </label>
                <textarea
                  v-model="form.observacoes"
                  placeholder="Alguma informação adicional?"
                  class="textarea textarea-bordered h-24"
                />
              </div>

              <!-- Botão -->
              <div class="card-actions justify-end mt-8">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg gap-2"
                  :disabled="loading"
                >
                  <span v-if="loading" class="loading loading-spinner"></span>
                  <Icon v-else icon="mdi:calendar-check" class="text-xl" />
                  Agendar Confissão
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
