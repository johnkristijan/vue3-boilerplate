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
git clone https://github.com/yourusername/vue3-boilerplate.git my-project
cd my-project
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

- [VS Code](https://code.visualstudio.com/) with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

## License

[MIT](LICENSE)
