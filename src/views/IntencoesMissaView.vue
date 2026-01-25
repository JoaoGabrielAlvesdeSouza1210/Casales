<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { IntencaoMissa } from '@/types'
import { enviarIntencaoMissa } from '@/services/paroquiaService'
import { useForm } from '@/composables/useForm'

/**
 * Formulário de intenção de missa
 */
const form = ref<IntencaoMissa>({
  nome: '',
  email: '',
  telefone: '',
  intencao: '',
  dataDesejada: '',
  oferenda: undefined
})

/**
 * Composable para gerenciar o formulário
 */
const { loading, error, success, handleSubmit } = useForm(enviarIntencaoMissa)

/**
 * Reseta o formulário
 */
const resetForm = (): void => {
  form.value = {
    nome: '',
    email: '',
    telefone: '',
    intencao: '',
    dataDesejada: '',
    oferenda: undefined
  }
}

/**
 * Submete o formulário de intenção
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
          <Icon icon="mdi:candle" class="text-7xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Intenções de Missa</h1>
          <p class="text-xl">Envie suas intenções para serem celebradas nas Santas Missas</p>
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
              <span>Intenção enviada com sucesso! Em breve entraremos em contato.</span>
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
                  placeholder="Digite seu nome"
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
                    <span class="label-text text-base font-semibold">Telefone</span>
                  </label>
                  <input
                    v-model="form.telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    class="input input-bordered w-full"
                  />
                </div>
              </div>

              <!-- Intenção -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base font-semibold">Sua intenção *</span>
                </label>
                <textarea
                  v-model="form.intencao"
                  class="textarea textarea-bordered h-32"
                  placeholder="Descreva sua intenção de missa"
                  required
                />
                <label class="label">
                  <span class="label-text-alt">Ex: Pela saúde de..., Em memória de...</span>
                </label>
              </div>

              <!-- Data e Oferenda -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">Data desejada</span>
                  </label>
                  <input
                    v-model="form.dataDesejada"
                    type="date"
                    class="input input-bordered w-full"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base font-semibold">Oferenda (R$)</span>
                  </label>
                  <input
                    v-model.number="form.oferenda"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    class="input input-bordered w-full"
                  />
                </div>
              </div>

              <!-- Informação -->
              <div class="alert">
                <Icon icon="mdi:information" class="text-xl" />
                <div>
                  <p class="text-sm">
                    A oferenda é opcional, mas ajuda a manter as atividades da paróquia.
                    Entraremos em contato para confirmar a data da celebração.
                  </p>
                </div>
              </div>

              <!-- Botão -->
              <div class="card-actions justify-end mt-8">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg gap-2"
                  :disabled="loading"
                >
                  <span v-if="loading" class="loading loading-spinner"></span>
                  <Icon v-else icon="mdi:send" class="text-xl" />
                  Enviar Intenção
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
