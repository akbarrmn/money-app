import { defineStore } from 'pinia'
import type { Users } from '~/utils/types/user.types'

export const useUserStore = defineStore('users',() => {
  const users = ref<Users[]>([] as Users[])
  const isLoading = ref<boolean>(false)
  const filteredSingleUser = ref({} as Users )
  const token = useCookie('MY_COOKIE', {
    // Expirated after 1 hour
    maxAge: 60 * 60,
    secure: true
  });
  const setFiltered = (data: Users) => {
    filteredSingleUser.value = data 
  }

  const setLoading = (data: boolean) => {
    isLoading.value = data
  }

  const setToken = (data?: string) => {
    token.value = data
  }

  async function getAllUsers() {
    const baseUrl = useRuntimeConfig().public.baseUrl
    isLoading.value = true
    try {
      const response = await $fetch<Users[]>(`${baseUrl}/users`)
      users.value = response
    } catch (error) {
      console.log(error)
    }finally{
      isLoading.value = false
    }
  }

  async function getUserById(id: number) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    try {
      const response = await $fetch<Users>(`${baseUrl}/users/${id}`)
      filteredSingleUser.value = response
    } catch (error) {
      console.log(error)
    }
  }

  async function updateUserById(id: number, data: Users) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    try {
      const response = await $fetch(`${baseUrl}/users/${id}`, {
        method: 'PUT',
        body: data
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = async () => {
    setToken();
    setFiltered({} as Users)
    window.localStorage.clear()
  }
  
  getAllUsers()

  return { users, setFiltered, filteredSingleUser, isLoading, setLoading, setToken, getUserById, logoutUser, updateUserById }
},{
  persist: {
    storage: persistedState.localStorage,
  }
})
