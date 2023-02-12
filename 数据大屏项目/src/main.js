import { createApp } from 'vue'
import App from './App.vue'
import datav from 'datav-libs-dev-self'
import router from './router/index'

createApp(App).use(router).use(datav).mount('#app')
console.log(datav);
