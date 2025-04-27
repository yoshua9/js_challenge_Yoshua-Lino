import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import router from './router/index.ts'
import { createPinia } from 'pinia'

const i18n = createI18n({
    mode: 'legacy',
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
    },
})
createApp(App)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app')
