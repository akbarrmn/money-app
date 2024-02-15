import { defineStore } from 'pinia'
import type { Reports } from '~/utils/types/report.types'

const baseUrl = process.env.BASE_URL //define base url
export const useMyReportsStore = defineStore('myReports',()=>{
  //create reactive state
  const reports = ref<Reports[]>([] as Reports[])
  const isLoading = ref<boolean>(false)
  const isOpen = ref<boolean>(false)
  const filteredReports = ref<Reports[]>([] as Reports[])

  //create computed state for getter
  const setOpen = (data: boolean) => {
    isOpen.value = data
  }

  const setFiltered = (data: Reports[]) => {
    filteredReports.value = data
  }

  //create function filter
  const  computeFilteredReports = (filter: any, filterMonth: any, filterYear: any) => {
    const filtered = reports.value.filter((report) => {
      const reportDate = new Date(report.createdAt);
  
      if (filter.value === "day") {
        const today = new Date();
        return (
          reportDate.getDate() === today.getDate() &&
          reportDate.getMonth() === today.getMonth() &&
          reportDate.getFullYear() === today.getFullYear()
        );
      } else if (filter.value === "month") {
        return reportDate.getMonth() === Number(filterMonth.value) - 1;
      } else if (filter.value === "year") {
        return reportDate.getFullYear() === Number(filterYear.value);
      }
  
      return report
    });

    return setFiltered(JSON.parse(JSON.stringify(filtered)))
  }

  //get all reports data user
  async function getAllReports(idUser:number) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    isLoading.value = true
    try {
      const response = await $fetch<Reports[]>(`${baseUrl}/users/${idUser}/reports`)
      return reports.value = response, filteredReports.value = response
    } catch (error) {
      console.log(error)
      return reports.value = [], filteredReports.value = []
    }finally{
      isLoading.value = false
    }
  }
  //create post function reports
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

  //returing value and function
  return { reports, getAllReports, postReports, isLoading, isOpen, setOpen, filteredReports, computeFilteredReports }
},{
  //create persist data handling
  persist: {
    storage: persistedState.localStorage,
  }
})
