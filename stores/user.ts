import { defineStore } from 'pinia'
import type { Users } from '~/utils/types/user.types'

export const useUserStore = defineStore('users',() => {
  //create reactive state
  const users = ref<Users[]>([] as Users[])
  const isLoading = ref<boolean>(false)
  const filteredSingleUser = ref({} as Users )
  const isLogin = ref<boolean>(true)
  const token = useCookie('MY_COOKIE', {
    // Expirated after 1 hour
    maxAge: 60 * 60,
    secure: true
  });

  //create computed state for getter
  const setIsLogin = (data: boolean) => {
    isLogin.value = data
  }
  const setFiltered = (data: Users) => {
    filteredSingleUser.value = data 
  }

  const setLoading = (data: boolean) => {
    isLoading.value = data
  }

  const setToken = (data?: string) => {
    token.value = data
  }

  const filteredSingleUserValue = () => {
    return filteredSingleUser.value;
  }

  //get all data users
  async function getAllUsers() {
    const baseUrl = useRuntimeConfig().public.baseUrl
    isLoading.value = true
    try {
      const response = await $fetch<Users[]>(`${baseUrl}/users`)
      return users.value = response
    } catch (error) {
      console.log(error)
      return users.value = []
    }finally{
      isLoading.value = false
    }
  }

  //get user by id 
  async function getUserById(id: number) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    try {
      const response = await $fetch<Users>(`${baseUrl}/users/${id}`)
      return filteredSingleUser.value = response      
    } catch (error) {
      console.log(error)
    }
  }

  //update user by id
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

  //create user
  async function createUser(data: any) {
    const baseUrl = useRuntimeConfig().public.baseUrl
    try {
      const response = await $fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: data
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  //logout user
  const logoutUser = async () => {
    setToken('');
    setFiltered({} as Users)
    window.localStorage.removeItem('myReports')
    window.localStorage.removeItem('users')
    
  }
  
  //fetch data
  getAllUsers()
//return state and function
  return { users, setFiltered, filteredSingleUser, isLoading, setLoading, setToken, getUserById, createUser, logoutUser, updateUserById, filteredSingleUserValue, isLogin, setIsLogin }
},{
  //create persist
  persist: {
    storage: persistedState.localStorage,
  }
})
