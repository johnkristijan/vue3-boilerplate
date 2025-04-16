# Vue 3 Boilerplate

A lightweight Vue 3 starter template that comes pre-configured with essential tools to help you quickly start building modern web applications.

## Features

- ⚡️ [Vue 3](https://vuejs.org/) with Composition API
- 🔥 [Vite](https://vitejs.dev/) for fast development and builds
- 📦 [Pinia](https://pinia.vuejs.org/) for state management (with persistence support)
- 🛣️ [Vue Router](https://router.vuejs.org/) for client-side routing
- 🎨 [SCSS](https://sass-lang.com/) for styling
- 📱 Responsive base styling
- 🔗 Path aliasing with `@` shortcuts
- 📊 Basic store example

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/johnkristijan/vue3-boilerplate.git my-vue3-project
cd my-vue3-project
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Your application will be available at `http://localhost:5173`

## Project Structure

```
vue3-boilerplate/
├─ public/            # Static assets
├─ src/
│  ├─ assets/         # Project assets
│  ├─ components/     # Vue components
│  ├─ styles.scss     # Global styles
│  ├─ router.js       # Vue Router configuration
│  ├─ store.js        # Pinia store
│  ├─ Home.vue        # Home page component
│  ├─ About.vue       # About page component
│  ├─ App.vue         # Main app component
│  ├─ main.js         # App entry point
├─ index.html         # HTML template
├─ vite.config.js     # Vite configuration
├─ package.json       # Project dependencies and scripts
```

## State Management with Pinia

This boilerplate includes Pinia for state management with persistence support:

```js
// Using the store in components
import { useMainStore } from './store';

const store = useMainStore();

// Access state
console.log(store.globalCounter);

// Call actions
store.increment();
```

To enable state persistence (saving to localStorage), uncomment the persist configuration in `src/store.js`:

```js
persist: {
  key: 'main-store', 
  storage: localStorage,
  paths: ['globalCounter'], 
}
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Customization

### Add More Dependencies

```bash
npm install package-name
# or 
yarn add package-name
```

### Modify Vite Configuration

Edit `vite.config.js` to customize your build process.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)

## Adding TypeScript Support

To add TypeScript support to this project:

1. Install TypeScript and Vue's TypeScript declaration files:

```bash
npm install -D typescript @vue/tsconfig @types/node
# or
yarn add -D typescript @vue/tsconfig @types/node
```

2. Create a `tsconfig.json` file in the root directory:

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

3. Create a `tsconfig.node.json` file for Vite configuration:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

4. Rename your JavaScript files to TypeScript:
   - `main.js` → `main.ts`
   - `router.js` → `router.ts`
   - `store.js` → `store.ts`

5. Update the Vite config to support TypeScript (rename to `vite.config.ts`):

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

6. Update your import statements in `index.html`:

```html
<script type="module" src="/src/main.ts"></script>
```

## Adding axios/fetch for API Calls
To add axios for making API calls:
1. Install axios:

```bash
npm install axios
# or
yarn add axios
```
2. Create an API service file (look at example file in `src/services/api.js`):



## Adding Internationalization (i18n)

To add multi-language support with vue-i18n:

1. Install vue-i18n:

```bash
npm install vue-i18n@next
# or
yarn add vue-i18n@next
```

2. Create a locales directory and translation files:

```
src/
  └─ locales/
      ├─ en.json
      └─ nb.json  # Norwegian Bokmål
```

3. Example translation files:

```json
// src/locales/en.json
{
  "hello": "Hello",
  "welcome": "Welcome to Vue 3 Boilerplate",
  "nav": {
    "home": "Home",
    "about": "About"
  }
}
```

```json
// src/locales/nb.json
{
  "hello": "Hei",
  "welcome": "Velkommen til Vue 3 Boilerplate",
  "nav": {
    "home": "Hjem",
    "about": "Om oss"
  }
}
```

4. Create an i18n plugin file:

```typescript
// src/plugins/i18n.js (or .ts)
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import nb from '@/locales/nb.json'

export default createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // Default locale
  fallbackLocale: 'en',
  messages: { en, nb }
})
```

5. Integrate with your Vue application in `main.js` or `main.ts`:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
```

6. Use translations in your components:

```vue
<template>
  <div>
    <h1>{{ t('hello') }}</h1>
    <p>{{ t('welcome') }}</p>
    <nav>
      <router-link to="/">{{ t('nav.home') }}</router-link>
      <router-link to="/about">{{ t('nav.about') }}</router-link>
    </nav>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
```

7. Add language switcher component:

```vue
<template>
  <select v-model="locale">
    <option value="en">English</option>
    <option value="nb">Norsk</option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>
```

## License

[MIT](LICENSE)
