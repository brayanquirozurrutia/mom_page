import 'vuetify/styles'

declare module 'vue' {
    interface GlobalComponents {
        VApp: typeof import('vuetify/components').VApp
        VBtn: typeof import('vuetify/components').VBtn
        VMain: typeof import('vuetify/components').VMain
        VContainer: typeof import('vuetify/components').VContainer
        VRow: typeof import('vuetify/components').VRow
        VCol: typeof import('vuetify/components').VCol
        VCard: typeof import('vuetify/components').VCard
    }
}

export {}
