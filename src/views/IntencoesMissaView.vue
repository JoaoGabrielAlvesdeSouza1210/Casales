<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { intencaoMissaService } from '@/services/intencaoMissaService'

interface IntencaoForm {
  paroquia_id: number
  nome_solicitante: string
  telefone: string
  email?: string
  intencao: string
  data_desejada: string
  observacoes?: string
}

const form = ref<IntencaoForm>({
  paroquia_id: 1, // TODO: pegar da paróquia atual
  nome_solicitante: '',
  telefone: '',
  email: '',
  intencao: '',
  data_desejada: '',
  observacoes: ''
})

const isLoading = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const enviarIntencao = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    await intencaoMissaService.create(form.value)
    
    showSuccess.value = true
    
    // Limpar formulário
    form.value = {
      paroquia_id: 1,
      nome_solicitante: '',
      telefone: '',
      email: '',
      intencao: '',
      data_desejada: '',
      observacoes: ''
    }
    
    // Fechar modal de sucesso após 3 segundos
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro ao enviar intenção. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

const formatarTelefone = () => {
  let telefone = form.value.telefone.replace(/\D/g, '')
  
  if (telefone.length <= 10) {
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else {
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  
  form.value.telefone = telefone
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section -->
    <div class="hero bg-base-100 py-16">
      <div class="hero-content text-center max-w-3xl">
        <div>
          <Icon icon="mdi:candle" class="text-6xl text-primary mx-auto mb-4" />
          <h1 class="text-5xl font-bold">Intenções de Missa</h1>
          <p class="py-6 text-lg">
            Envie sua intenção de missa para que possamos celebrar por você, 
            seus familiares e amigos. Nossa equipe irá analisar e confirmar sua solicitação.
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="container mx-auto px-4 py-12 max-w-3xl">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6">
            <Icon icon="mdi:form-textbox" class="text-primary" />
            Enviar Intenção
          </h2>

          <!-- Alert de Erro -->
          <div v-if="errorMessage" class="alert alert-error mb-6">
            <Icon icon="mdi:alert-circle" class="text-2xl" />
            <span>{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="enviarIntencao" class="space-y-6">
            <!-- Nome do Solicitante -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Seu Nome Completo *</legend>
              <input
                v-model="form.nome_solicitante"
                type="text"
                class="input"
                placeholder="Digite seu nome completo"
                required
              />
            </fieldset>

            <!-- Telefone e Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Telefone *</legend>
                <input
                  v-model="form.telefone"
                  type="tel"
                  class="input"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  @blur="formatarTelefone"
                  required
                />
              </fieldset>

              <fieldset class="fieldset">
                <legend class="fieldset-legend">E-mail</legend>
                <input
                  v-model="form.email"
                  type="email"
                  class="input"
                  placeholder="seu@email.com"
                />
                <p class="label">Opcional, mas recomendado para confirmação</p>
              </fieldset>
            </div>

            <!-- Intenção -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Intenção *</legend>
              <textarea
                v-model="form.intencao"
                class="textarea h-32"
                placeholder="Ex: Em memória de João Silva, pela saúde de Maria, em ação de graças..."
                required
              ></textarea>
              <p class="label">
                Descreva a intenção para a qual será celebrada a missa
              </p>
            </fieldset>

            <!-- Data Desejada -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Data Desejada *</legend>
              <input
                v-model="form.data_desejada"
                type="date"
                class="input"
                :min="new Date().toISOString().split('T')[0]"
                required
              />
              <p class="label">
                Sugerimos solicitar com pelo menos 7 dias de antecedência
              </p>
            </fieldset>

            <!-- Observações -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Observações</legend>
              <textarea
                v-model="form.observacoes"
                class="textarea h-24"
                placeholder="Informações adicionais (opcional)"
              ></textarea>
            </fieldset>

            <!-- Informação Importante -->
            <div class="alert alert-info">
              <Icon icon="mdi:information" class="text-2xl" />
              <div class="text-sm">
                <p class="font-bold mb-1">Informações Importantes:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Sua solicitação será analisada pela secretaria paroquial</li>
                  <li>Você receberá uma confirmação por telefone ou e-mail</li>
                  <li>As ofertas podem ser feitas presencialmente na secretaria</li>
                  <li>Em caso de dúvidas, entre em contato conosco</li>
                </ul>
              </div>
            </div>

            <!-- Botões -->
            <div class="card-actions justify-end gap-3">
              <button
                type="button"
                class="btn btn-ghost"
                @click="$router.back()"
              >
                <Icon icon="mdi:arrow-left" />
                Voltar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="loading loading-spinner"></span>
                <Icon v-else icon="mdi:send" />
                Enviar Intenção
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Informações de Contato -->
      <div class="card bg-base-100 shadow-xl mt-8">
        <div class="card-body">
          <h3 class="card-title text-xl">
            <Icon icon="mdi:phone" class="text-primary" />
            Precisa de Ajuda?
          </h3>
          <div class="space-y-3">
            <p class="flex items-center gap-3">
              <Icon icon="mdi:clock-outline" class="text-xl text-base-content/70" />
              <span>Secretaria: Segunda a Sexta, das 9h às 17h</span>
            </p>
            <p class="flex items-center gap-3">
              <Icon icon="mdi:phone" class="text-xl text-base-content/70" />
              <span>Telefone: (00) 0000-0000</span>
            </p>
            <p class="flex items-center gap-3">
              <Icon icon="mdi:email" class="text-xl text-base-content/70" />
              <span>E-mail: secretaria@paroquia.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Sucesso -->
    <dialog :open="showSuccess" class="modal">
      <div class="modal-box text-center">
        <div class="flex justify-center mb-4">
          <div class="rounded-full bg-success/20 p-6">
            <Icon icon="mdi:check-circle" class="text-6xl text-success" />
          </div>
        </div>
        <h3 class="text-2xl font-bold mb-3">Intenção Enviada!</h3>
        <p class="mb-6">
          Sua intenção foi recebida com sucesso. 
          Em breve nossa equipe entrará em contato para confirmação.
        </p>
        <button class="btn btn-primary" @click="showSuccess = false">
          <Icon icon="mdi:check" />
          Entendi
        </button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
