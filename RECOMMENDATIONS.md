# Vue 3 / Vite Frontend Project: Tips, Tricks & Checklist

This document provides a checklist and best practices for setting up and working on Vue 3 projects using Vite.

## Core Stack & Setup Checklist

* **[ ] Vue 3:** Utilize the Composition API for better logic organization and reusability.
* **[ ] Vite:** Leverage its speed for development and optimized builds. Familiarize yourself with `vite.config.js`.
* **[ ] Pinia:**
    * Use for state management.
    * Create a `globalStore` for application-wide state (user info, theme, etc.).
    * Organize other state into feature-specific stores (e.g., `productStore`, `cartStore`). Avoid creating too many tiny stores; group related state.
    * Use `actions` for mutations, `getters` for computed state.
* **[ ] Axios:**
    * Use for robust API communication.
    * **Crucial:** Create a centralized Axios instance (`src/services/api.js` or `src/plugins/axios.js`).
    * Configure the instance with `baseURL`, default headers (e.g., `Content-Type`).
    * Implement **interceptors** for:
        * Automatically attaching auth tokens (e.g., Bearer token from Pinia store).
        * Handling global loading states.
        * Centralized error handling (e.g., logging, showing notifications, handling 401 Unauthorized redirects).
* **[ ] Vue3-Toastify (or similar):**
    * Integrate for user notifications (success, error, info).
    * Configure position, duration, theme centrally (often in `main.ts` or `App.vue`).
    * Wrap toast calls in helper functions if needed (e.g., `showErrorToast(message)`).
* **[ ] TypeScript:**
    * **Use it.** Improves code quality, catches errors early, enables better tooling/intellisense.
    * Define interfaces and types for props, API responses, store state, etc. (`src/types/` folder).
    * Leverage TypeScript's utility types.
* **[ ] Internationalization (i18n):**
    * Use **vue-i18n** for multi-language support.
    * Structure translation files in `src/locales/` (e.g., `en.json`, `de.json`).
    * Organize translations by feature or page for better maintainability.
    * Configure in `main.ts` and create a dedicated plugin file if needed.
    * Use namespaces to avoid key collisions (`common.welcome`, `profile.title`).
    * Example setup:
      ```typescript
      // src/plugins/i18n.ts
      import { createI18n } from 'vue-i18n'
      import en from '@/locales/en.json'
      import de from '@/locales/de.json'

      export default createI18n({
        legacy: false, // Use Composition API
        locale: 'en', // Default locale
        fallbackLocale: 'en',
        messages: { en, de }
      })
      ```
    * Access in components with `const { t } = useI18n()` and use as `{{ t('path.to.translation') }}`.
    * Handle pluralization with vue-i18n's plural rules.
* **[ ] Date handling (date-fns):**
    * Use **date-fns** for date manipulation (lightweight, tree-shakable alternative to moment.js).
    * Create utility functions in `src/utils/date.ts` to centralize date formatting.
    * Import only needed functions to keep bundle size small (`import { format } from 'date-fns'`).
    * Consider adding locale support with `date-fns/locale` for i18n integration.
    * Example utility:
      ```typescript
      // src/utils/date.ts
      import { format, parseISO, formatDistance } from 'date-fns'
      import { enUS, de } from 'date-fns/locale'

      const locales = { en: enUS, de }

      export function formatDate(date: string | Date, formatStr = 'yyyy-MM-dd', locale = 'en') {
        const dateObj = typeof date === 'string' ? parseISO(date) : date
        return format(dateObj, formatStr, { locale: locales[locale] })
      }

      export function timeAgo(date: string | Date, locale = 'en') {
        const dateObj = typeof date === 'string' ? parseISO(date) : date
        return formatDistance(dateObj, new Date(), { addSuffix: true, locale: locales[locale] })
      }
      ```

## Project Structure & Conventions

* **[ ] Folder Structure:** Adopt a consistent structure (example below):
    ```
    src/
    ├── assets/         # Static assets (images, fonts)
    ├── components/     # Reusable UI components (atomic design?)
    │   ├── common/     # Very generic components (Button, Input)
    │   └── layout/     # Layout components (Header, Footer, Sidebar)
    ├── views/          # Page-level components (mapped to routes)
    ├── router/         # Vue Router config (index.js, routes.js)
    ├── stores/         # Pinia stores (index.js, global.ts, user.ts, ...)
    ├── services/       # API communication logic (api.js, authService.js)
    ├── styles/         # Global styles (main.scss, variables.scss, base.scss)
    ├── utils/          # Utility functions (helpers.ts, validators.ts)
    ├── types/          # TypeScript interfaces and types (api.ts, user.ts)
    ├── plugins/        # Custom plugins or external plugin configs
    └── main.ts         # App entry point
    ```
* **[ ] Naming Conventions:**
    * Components: PascalCase (`MyComponent.vue`).
    * Composables: camelCase (`useFeature.ts`).
    * Stores: camelCase with `Store` suffix (`useGlobalStore.ts`).
    * Files: kebab-case or camelCase (be consistent).

## Component Development

* **[ ] `<script setup lang="ts">`:** Use this syntax for cleaner and more concise component logic.
* **[ ] Composition API:** Prefer `ref` for primitives and `reactive` for objects, but `ref` can also wrap objects if needed (remember `.value`).
* **[ ] Props:** Define props clearly using `defineProps` with TypeScript types.
* **[ ] Emits:** Define events emitted by the component using `defineEmits`.
* **[ ] Keep Components Small & Focused:** Break down complex components into smaller, reusable ones.
* **[ ] Slots:** Use slots for flexible content injection.
* **[ ] Provide/Inject:** Use for deeply nested dependency injection, but don't overuse it; props or Pinia are often better.

## Styling

* **[ ] `<style lang="scss">` (or preferred preprocessor):** Use SCSS/Sass for variables, mixins, nesting.
* **[ ] Global Styles:** Keep foundational styles (resets, typography, theme variables) in global files (`src/styles/main.scss`) imported in `main.ts`.
* **[ ] Scoped Styles:** Use `<style scoped>` when styles *must* be specific to a component and shouldn't leak. However, **prefer** global utility classes or BEM-like conventions where possible for better reusability and smaller CSS bundles.
* **[ ] CSS Variables:** Utilize CSS Custom Properties for theming and dynamic style changes. Define them globally and reuse them.
* **[ ] Utility Classes (Optional but recommended):** Consider a utility-first framework (like Tailwind CSS) or define your own common utilities (e.g., `.mt-2`, `.text-center`) for rapid styling.

## Routing (Vue Router)

* **[ ] Centralized Config:** Keep route definitions in `src/router/`. Split into multiple files if large.
* **[ ] Route Meta Fields:** Use `meta` fields for route-specific information:
    ```javascript
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'), // Lazy load!
      meta: { requiresAuth: true, roles: ['admin'] }
    }
    ```
* **[ ] Navigation Guards:** Implement authentication and authorization checks in `router.beforeEach`:
    * Check `to.meta.requiresAuth`. If true and user is not authenticated (check Pinia store), redirect to `/login`.
    * Check `to.meta.roles` if necessary.
    * If the user is authenticated and tries to access `/login` or `/register`, redirect them to a default authenticated page (e.g., `/dashboard`).
* **[ ] Lazy Loading:** Use dynamic imports `() => import('../views/MyView.vue')` for route components to enable code splitting and faster initial loads.

## State Management (Pinia Specifics)

* **[ ] Accessing Stores:** Access stores within components using `const myStore = useMyStore()`.
* **[ ] Actions for Async:** Place API calls and other asynchronous logic within store actions.
* **[ ] Getters for Derived State:** Use getters for computed values derived from store state (e.g., `fullName` from `firstName` and `lastName`).
* **[ ] Modularity:** Keep stores focused on a specific domain or feature.

## API Calls (Axios Specifics)

* **[ ] Centralized Service Layer:** Abstract API calls into functions within `src/services/` (e.g., `userService.ts` with `WorkspaceUsers()`, `updateUser(id, data)`). Components should call these services, not `axios` directly.
* **[ ] Loading & Error States:** Manage loading and error states consistently. This can be done locally in components or globally via interceptors/Pinia.
* **[ ] Type API Responses:** Use the TypeScript interfaces/types defined in `src/types/` for request payloads and response data.

## TypeScript Best Practices

* **[ ] Define Types:** Be diligent in defining interfaces/types for complex objects (API responses, store state, props).
* **[ ] Use `as const`:** For defining readonly constants or literal types.
* **[ ] Avoid `any`:** Use `unknown` or define specific types instead whenever possible.
* **[ ] Utility Types:** Leverage built-in utility types like `Partial`, `Required`, `Readonly`, `Pick`, `Omit`.

## Code Quality & Maintainability

* **[ ] Linting & Formatting:**
    * Set up **ESLint** with recommended Vue 3 / TypeScript rules (`eslint-plugin-vue`).
    * Set up **Prettier** for consistent code formatting.
    * Configure them to work together (`eslint-config-prettier`).
    * Integrate with IDEs and consider pre-commit hooks (e.g., using Husky + lint-staged).
* **[ ] Import Aliases (`@/`):**
    * Configure path aliases in `vite.config.js` and `tsconfig.json` for cleaner imports.
    * **`vite.config.js`:**
        ```javascript
        import { defineConfig } from 'vite';
        import vue from '@vitejs/plugin-vue';
        import path from 'path';

        export default defineConfig({
          plugins: [vue()],
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
        });
        ```
    * **`tsconfig.json` (under `compilerOptions`):**
        ```json
        {
          "compilerOptions": {
            // ... other options
            "baseUrl": ".",
            "paths": {
              "@/*": ["src/*"]
            }
          },
          // ... include/exclude
        }
        ```
* **[ ] Utility Functions (`src/utils/`):** Create pure, reusable functions for common tasks (date formatting, validation, string manipulation, etc.). Keep them organized.
* **[ ] Environment Variables:** Use `.env` files (`.env`, `.env.development`, `.env.production`) for configuration (API URLs, keys). Access them via `import.meta.env.VITE_YOUR_VARIABLE`. **Never commit sensitive keys.** Use `.env.example`.
* **[ ] Comments:** Write comments for complex logic or non-obvious code, but aim for self-documenting code first.

## Performance
Try to use as few dependencies as possible. If you need to use a library, check if it has a smaller alternative.
* **[ ] Code Splitting:** Vite handles this well with lazy loading routes/components.
* **[ ] Tree Shaking:** Ensure libraries used support tree shaking. Write code that allows it (avoid side effects in unused modules).
* **[ ] Image Optimization:** Use appropriate image formats (WebP), compress images, and consider lazy loading images.
* **[ ] Bundle Analysis:** Use tools like `rollup-plugin-visualizer` to analyze bundle size and identify large dependencies.

## Accessibility (a11y)

* **[ ] Semantic HTML:** Use correct HTML tags (e.g., `<button>`, `<nav>`, `<main>`).
* **[ ] ARIA Attributes:** Use ARIA roles and attributes where necessary to enhance accessibility for screen readers.
* **[ ] Keyboard Navigation:** Ensure all interactive elements are focusable and operable via keyboard.
* **[ ] Color Contrast:** Check for sufficient contrast between text and background colors.

## Testing

* **[ ] Unit Testing:** Use **Vitest** (Vite-native) + **Vue Test Utils** for unit/component testing. Focus on testing component logic, props, events, and store interactions.
* **[ ] E2E Testing:** Consider tools like **Cypress** or **Playwright** for end-to-end testing of user flows.
* **[ ] Coverage:** Aim for reasonable test coverage, focusing on critical paths and complex logic.

---

*Remember to keep dependencies updated (`npm update` / `yarn upgrade`) and periodically run `npm audit` / `yarn audit` to check for vulnerabilities.*