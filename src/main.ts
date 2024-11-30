import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import './assets/styles/tailwind.css'
import App from './App.vue'
import router from './router';
import './styles/global.css';

const app = createApp(App)

app.use(router);
app.use(vuetify)
app.mount('#app')
