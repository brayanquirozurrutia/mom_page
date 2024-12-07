import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import * as mdi from '@mdi/js';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    },
    icons: {
        defaultSet: 'mdi',
        sets: {
            mdi,
        },
    },
})

export default vuetify
