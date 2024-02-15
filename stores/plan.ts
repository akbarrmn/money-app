import { defineStore } from 'pinia'
import type { FinancePlan } from '~/utils/types/finance.types'

export const useMyPlanStore = defineStore('myPlan',() => {
  //create reactive state
  const plan = ref<FinancePlan[]>([] as FinancePlan[])
  const isLoading = ref<boolean>(false)

  //create computed state for getter
  const setPlan = (data: FinancePlan[]) => {
    plan.value = data
  }

  //returing value and function
  return { plan, isLoading, setPlan }
},
//create persist data handling
{
  persist: {
    storage: persistedState.localStorage,
  }
}
)
