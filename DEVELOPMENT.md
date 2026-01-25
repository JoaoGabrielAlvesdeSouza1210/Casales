# Casales - Documentação do Projeto

## 📋 Status Atual do Desenvolvimento

### ✅ Implementado

#### Estrutura Base
- Sistema de tipos TypeScript completo
- Serviços de API (paroquiaService, liturgiaService)
- Store Pinia para paróquia e liturgia
- Composables (useForm, useMap)
- Rotas configuradas

#### Componentes de Layout
- AppHeader com navegação responsiva
- AppFooter com informações e redes sociais
- DefaultLayout

#### Páginas
- HomeView - Página inicial
- SobreView - Sobre a paróquia
- LocalizacaoView - Mapa com Leaflet
- HorariosMissasView - Horários das missas
- LiturgiaDiariaView - Liturgia diária

### 🚧 Pendente

#### Páginas de Formulários
- IntencoesMissaView.vue
- AgendarConfissaoView.vue
- SolicitarVisitaView.vue

#### Sistema de Pastorais
- PastoraisView.vue
- PastoralDetalhesView.vue

#### Sistema de Notícias
- NoticiasView.vue
- NoticiaDetalhesView.vue

#### Calendário
- CalendarioView.vue

## 🔑 Pontos Importantes

### Leaflet Integration
Para o mapa funcionar corretamente, adicione no `index.html`:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### Variáveis de Ambiente
Crie `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

### ID da Paróquia
Atualmente está hardcoded em App.vue (linha 11). Deve ser obtido de:
- URL (multi-tenant)
- Configuração
- Autenticação

## 🎯 Próximos Passos Recomendados

1. Adicionar CSS do Leaflet ao index.html
2. Criar arquivo .env com URL da API
3. Implementar páginas de formulários
4. Implementar sistema de pastorais
5. Implementar sistema de notícias
6. Implementar calendário de eventos
7. Conectar com backend Laravel
8. Testes e ajustes finais
