# Painel Administrativo - Documentação

## Visão Geral

Sistema completo de autenticação e painel administrativo para gerenciar o site da paróquia.

## Estrutura Criada

### 🔐 Autenticação

#### Store (`src/stores/auth.ts`)
- **Estado**: `user`, `token`, `isAuthenticated`
- **Ações**: `login()`, `logout()`, `restoreSession()`, `checkAuth()`
- Persiste token no `localStorage`

#### Serviço (`src/services/authService.ts`)
- `login(credentials)` - Autentica usuário
- `logout()` - Encerra sessão

#### Composable (`src/composables/useAuth.ts`)
- Encapsula lógica de autenticação
- Integração com router para redirecionamento

#### Tela de Login (`src/views/LoginView.vue`)
- Formulário com validação
- Tratamento de erros
- Loading states
- Design com DaisyUI

### 📊 Painel Administrativo

#### Layout (`src/layouts/AdminLayout.vue`)
- **Sidebar** com menu de navegação
- **Navbar** com perfil do usuário
- **Drawer** responsivo para mobile
- Menu items:
  - Dashboard
  - Paróquias
  - Notícias  
  - Pastorais
  - Liturgia Diária
  - Intenções de Missa
  - Confissões
  - Visitas Pastorais
  - Inscrições

#### Dashboard (`src/views/admin/DashboardView.vue`)
- Cards com estatísticas
- Ações rápidas
- Loading states

### 📝 CRUD de Paróquias

#### Lista (`src/views/admin/paroquias/ParoquiasListView.vue`)
- Tabela com todas as paróquias
- Botões de editar e excluir
- Botão para criar nova

#### Formulário (`src/views/admin/paroquias/ParoquiaFormView.vue`)
- Formulário completo com todos os campos
- Validação
- Modo criação/edição
- Seções organizadas:
  - Dados Básicos
  - Redes Sociais
  - Localização
  - Descrições

### 📰 CRUD de Notícias

#### Lista (`src/views/admin/noticias/NoticiasListView.vue`)
- Tabela com notícias
- Filtros por categoria e destaque
- Ações CRUD

#### Formulário (`src/views/admin/noticias/NoticiaFormView.vue`)
- Campos: título, categoria, conteúdo, imagem, data, destaque
- Editor de texto para conteúdo
- Upload de imagem

### 🙏 Gerenciamento de Intenções de Missa

#### Lista (`src/views/admin/intencoes/IntencoesListView.vue`)
- Filtros por status (Todas, Pendentes, Aprovadas, Rejeitadas)
- Ações para aprovar/rejeitar
- Tabela com informações completas

## 🛣️ Rotas

### Públicas
- `/` - Home
- `/login` - Login
- `/sobre` - Sobre
- `/noticias` - Notícias
- (outras rotas públicas existentes)

### Administrativas (Protegidas)
Todas as rotas com prefixo `/admin` requerem autenticação:

- `/admin` - Dashboard
- `/admin/paroquias` - Lista de paróquias
- `/admin/paroquias/criar` - Criar paróquia
- `/admin/paroquias/:id/editar` - Editar paróquia
- `/admin/noticias` - Lista de notícias
- `/admin/noticias/criar` - Criar notícia
- `/admin/noticias/:id/editar` - Editar notícia
- `/admin/pastorais` - Pastorais (placeholder)
- `/admin/liturgia` - Liturgia (placeholder)
- `/admin/intencoes` - Intenções de Missa
- `/admin/confissoes` - Confissões (placeholder)
- `/admin/visitas` - Visitas (placeholder)
- `/admin/inscricoes` - Inscrições (placeholder)

### Navigation Guards

O router implementa guards para:
- **Proteger rotas administrativas**: Redireciona para login se não autenticado
- **Restaurar sessão**: Carrega token do localStorage
- **Redirecionamento**: Usuários autenticados não podem acessar `/login`
- **Atualizar título**: Define título da página baseado na rota

## 🔧 Serviços API

### Configuração Base (`src/services/api.ts`)
- Cliente axios configurado
- Interceptor que adiciona token JWT automaticamente
- Tratamento de erros 401 (redireciona para login)

### Serviços Disponíveis

#### `paroquiaApiService.ts`
- `getAll()` - Lista paróquias
- `getById(id)` - Busca por ID
- `create(data)` - Cria nova
- `update(id, data)` - Atualiza
- `delete(id)` - Deleta

#### `noticiaService.ts`
- `getAll()` - Lista notícias
- `getById(id)` - Busca por ID
- `create(data)` - Cria nova
- `update(id, data)` - Atualiza
- `delete(id)` - Deleta

#### `intencaoMissaService.ts`
- `getAll()` - Lista intenções (admin)
- `updateStatus(id, status)` - Aprova/Rejeita
- `create(data)` - Cria (público)

## 📦 Tipos TypeScript

### `src/types/auth.ts`
```typescript
interface User {
  id: number
  name: string
  email: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
}
```

### `src/types/intencaoMissa.ts`
```typescript
interface IntencaoMissa {
  id: number
  paroquia_id: number
  nome_solicitante: string
  telefone: string
  email?: string
  intencao: string
  data_desejada: string
  status: 'Pendente' | 'Aprovada' | 'Rejeitada'
}
```

## 🎨 Componentes UI

Todos os componentes utilizam **DaisyUI** para estilização:
- `btn` - Botões
- `card` - Cards
- `input`, `select`, `textarea` - Campos de formulário
- `table` - Tabelas
- `badge` - Badges de status
- `alert` - Mensagens de erro/sucesso
- `loading` - Estados de loading
- `drawer` - Menu lateral
- `navbar` - Barra de navegação
- `dropdown` - Menus dropdown
- `tabs` - Abas/filtros

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
cd Casales/backend
php artisan serve
```

### 2. Iniciar o Frontend
```bash
cd Casales/front
npm run dev
```

### 3. Acessar o Painel
1. Navegar para `http://localhost:5173/login`
2. Fazer login com credenciais válidas
3. Será redirecionado para `/admin` (Dashboard)

### 4. Funcionalidades Disponíveis
- ✅ Dashboard com estatísticas
- ✅ CRUD completo de Paróquias
- ✅ CRUD completo de Notícias
- ✅ Gerenciamento de Intenções de Missa
- ⏳ CRUD de Pastorais (estrutura pronta, componentes placeholder)
- ⏳ CRUD de Liturgia Diária (estrutura pronta, componentes placeholder)
- ⏳ Gerenciamento de Confissões (estrutura pronta, componentes placeholder)
- ⏳ Gerenciamento de Visitas (estrutura pronta, componentes placeholder)
- ⏳ Gerenciamento de Inscrições (estrutura pronta, componentes placeholder)

## 📝 Próximos Passos

### Backend
1. **Implementar endpoints de autenticação**:
   - `POST /api/login` - Login
   - `POST /api/logout` - Logout
   - Middleware de autenticação JWT/Sanctum

### Frontend
2. **Completar páginas placeholder**:
   - CRUD de Pastorais
   - CRUD de Liturgia Diária
   - Gerenciamento de Confissões
   - Gerenciamento de Visitas
   - Gerenciamento de Inscrições

3. **Melhorias**:
   - Upload de imagens (backend + frontend)
   - Editor WYSIWYG para conteúdo de notícias
   - Paginação nas tabelas
   - Busca/filtros avançados
   - Validação de formulários com biblioteca (VeeValidate)
   - Confirmação de ações destrutivas (modal)
   - Notificações toast de sucesso/erro

## 🔒 Segurança

- ✅ Rotas protegidas com navigation guards
- ✅ Token JWT incluído automaticamente nas requisições
- ✅ Tratamento de erros 401
- ✅ Persistência de sessão no localStorage
- ⚠️ **IMPORTANTE**: Implementar autenticação no backend antes de usar em produção

## 🎯 Observações

1. **Dados Mockados**: O Dashboard usa dados simulados. Implementar endpoints `/api/stats` no backend.

2. **Placeholder Pages**: Algumas rotas apontam para `DashboardView.vue` temporariamente. Criar componentes específicos quando necessário.

3. **Validações**: Adicionar validações mais robustas nos formulários.

4. **Responsividade**: Layout totalmente responsivo com DaisyUI.

5. **TypeScript**: Todo código tipado para melhor DX e type safety.

6. **Convenções Vue 3**: 
   - Composition API
   - `<script setup>`
   - Composables para lógica reutilizável
   - Pinia para state management
