<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import type { LoginCredentials } from '@/types/auth'

const { login } = useAuth()

// Estado do formulário
const credentials = ref<LoginCredentials>({
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)

/**
 * Submete o formulário de login
 */
async function handleSubmit(): Promise<void> {
  if (!credentials.value.email || !credentials.value.password) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    await login(credentials.value)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.'
    console.error('Erro no login:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center justify-center text-2xl mb-4">
          Painel Administrativo
        </h2>
        <p class="text-center text-base-content/60 mb-4">
          Faça login para acessar o painel
        </p>

        <form @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="credentials.email"
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered w-full"
              :disabled="isLoading"
              required
            />
          </div>

          <!-- Senha -->
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              v-model="credentials.password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              :disabled="isLoading"
              required
            />
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Botão de submit -->
          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="loading loading-spinner"></span>
              {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
