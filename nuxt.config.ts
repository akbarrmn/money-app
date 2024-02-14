// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@vee-validate/nuxt"
  ],
  pinia:{
    storesDirs: [
      './stores/**'
    ]
  }, 
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig:{
    public:{
      baseUrl:process.env.API_BASE_URI
    }
  },
  colorMode:{
    classSuffix:'',
    preference:'light'

  },
  sourcemap:false
})
