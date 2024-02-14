import { defineStore } from 'pinia'
import type { Reports } from '~/utils/types/report.types'

const baseUrl = process.env.BASE_URL
export const useMyReportsStore = defineStore('myReports',()=>{
  const reports = ref<Reports[]>([] as Reports[])
  const isLoading = ref<boolean>(false)
  const isOpen = ref<boolean>(false)

  const setOpen = (data: boolean) => {
    isOpen.value = data
  }

  async function getAllReports(idUser:number) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    isLoading.value = true
    try {
      const response = await $fetch<Reports[]>(`${baseUrl}/users/${idUser}/reports`)
      reports.value = response
    } catch (error) {
      console.log(error)
    }finally{
      isLoading.value = false
    }
  }

  async function postReports(idUser:number,data: any) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    try {
      const response = await $fetch(`${baseUrl}/users/${idUser}/reports`, {
        method: 'POST',
        body: data
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { reports, getAllReports, postReports, isLoading, isOpen, setOpen }
},{
  persist: {
    storage: persistedState.localStorage,
  }
})
