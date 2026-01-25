# Integração Tailwind CSS e DaisyUI - Casales

## ✅ Implementado

### Pacotes Instalados
- **tailwindcss** (latest) - Framework CSS utility-first
- **daisyui** (latest) - Componentes prontos para Tailwind
- **postcss** - Processador CSS
- **autoprefixer** - Adiciona prefixos vendor automaticamente

### Configuração

#### tailwind.config.js
```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'church-primary': '#1a1a2e',
        'church-secondary': '#16213e',
        'church-accent': '#ffd700',
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        church: {
          "primary": "#1a1a2e",
          "secondary": "#16213e",
          "accent": "#ffd700",
          "neutral": "#333333",
          "base-100": "#ffffff",
          "base-200": "#f5f5f5",
          ...
        },
      },
      "light",
    ],
  },
}
```

### Componentes Atualizados com Tailwind + DaisyUI

#### ✅ AppHeader.vue
- Navbar com classes DaisyUI
- Menu responsivo mobile
- Botões ghost para navegação
- Classes: `navbar`, `btn`, `btn-ghost`, `btn-circle`

#### ✅ AppFooter.vue
- Footer com grid Tailwind
- Links hover com transições
- Botões circulares para redes sociais
- Classes: `footer`, `btn-circle`, `link-hover`

#### ✅ DefaultLayout.vue
- Layout flexbox com Tailwind
- Classes: `min-h-screen`, `flex`, `flex-col`, `bg-base-200`

#### ✅ HomeView.vue
- Hero section com gradiente
- Cards de serviços com hover effects
- Grid responsivo
- Classes: `hero`, `card`, `badge`, `btn-accent`

### Cores Personalizadas

```css
church-primary: #1a1a2e  (Azul escuro)
church-secondary: #16213e (Azul mais escuro)
church-accent: #ffd700    (Dourado)
```

### Componentes DaisyUI Utilizados

- **Navbar** - Cabeçalho de navegação
- **Footer** - Rodapé
- **Card** - Cards de conteúdo
- **Badge** - Etiquetas
- **Btn** - Botões (primary, accent, ghost, outline, circle)
- **Link** - Links com hover
- **Hero** - Seção hero

### Classes Tailwind Comuns Usadas

#### Layout
- `container mx-auto` - Container centralizado
- `flex flex-col` - Flexbox coluna
- `grid grid-cols-*` - Grid layout
- `space-y-*` - Espaçamento vertical
- `gap-*` - Gap entre items

#### Dimensões
- `w-full` - Width 100%
- `h-*` - Height
- `max-w-*` - Max width
- `min-h-screen` - Min height viewport

#### Cores
- `bg-gradient-to-r from-* to-*` - Gradientes
- `text-*` - Cores de texto
- `bg-*` - Cores de fundo

#### Efeitos
- `hover:-translate-y-*` - Movimento no hover
- `transition-*` - Transições
- `shadow-*` - Sombras
- `rounded-*` - Border radius

#### Responsivo
- `sm:*` - Small screens (640px+)
- `md:*` - Medium screens (768px+)
- `lg:*` - Large screens (1024px+)

### Próximos Passos

#### Views Pendentes de Conversão
- [ ] SobreView.vue
- [ ] LocalizacaoView.vue
- [ ] HorariosMissasView.vue
- [ ] LiturgiaDiariaView.vue
- [ ] CalendarioView.vue
- [ ] NoticiasView.vue
- [ ] PastoraisView.vue

#### Componentes a Criar
- [ ] FormCard - Card para formulários
- [ ] LoadingSpinner - Loading com DaisyUI
- [ ] AlertMessage - Alertas
- [ ] Modal - Modais

### Recursos DaisyUI Disponíveis

Explore mais componentes em: https://daisyui.com/components/

- Accordion
- Alert
- Avatar
- Breadcrumbs
- Carousel
- Checkbox
- Collapse
- Countdown
- Dropdown
- File Input
- Input
- Join
- Kbd
- Loading
- Menu
- Modal
- Pagination
- Progress
- Radio
- Range
- Rating
- Select
- Stat
- Steps
- Swap
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Tooltip

### Exemplo de Uso

```vue
<template>
  <!-- Card com DaisyUI -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Título</h2>
      <p>Conteúdo do card</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Ação</button>
      </div>
    </div>
  </div>
  
  <!-- Botões com variantes -->
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-accent">Accent</button>
  <button class="btn btn-ghost">Ghost</button>
  
  <!-- Grid responsivo -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Items aqui -->
  </div>
</template>
```

### Notas Importantes

1. **Theme**: O tema "church" foi configurado com as cores da paróquia
2. **Dark Mode**: Desabilitado por padrão (`darkTheme: false`)
3. **Responsivo**: Todos os componentes são mobile-first
4. **Performance**: Tailwind faz purge automático das classes não utilizadas
5. **IntelliSense**: Instale a extensão "Tailwind CSS IntelliSense" no VS Code

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build (com purge automático do Tailwind)
npm run build

# Preview do build
npm run preview
```

## 🎨 Design System

### Hierarquia de Cores
- **Primary**: Azul escuro (#1a1a2e) - Headers, títulos, elementos principais
- **Secondary**: Azul mais escuro (#16213e) - Backgrounds secundários
- **Accent**: Dourado (#ffd700) - Destaque, CTAs, ícones importantes
- **Neutral**: Cinza (#333) - Textos neutros
- **Base**: Branco/Cinza claro - Backgrounds e cards

### Tipografia
- Títulos: `text-4xl`, `text-3xl`, `text-2xl`, `text-xl`
- Body: `text-base`, `text-lg`
- Small: `text-sm`, `text-xs`
- Peso: `font-bold`, `font-semibold`, `font-normal`

### Espaçamentos
- Padding: `p-4`, `p-6`, `p-8`, `px-4`, `py-8`
- Margin: `m-4`, `mb-6`, `mt-8`, `mx-auto`
- Gap: `gap-4`, `gap-6`, `gap-8`
- Space: `space-y-4`, `space-x-4`
