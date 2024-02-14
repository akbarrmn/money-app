import { defineStore } from 'pinia'
import type { FinancePlan } from '~/utils/types/finance.types'

export const useMyPlanStore = defineStore({
  id: 'myPlanStore',
  state: () => ({ 
    financePlan : {} as FinancePlan
  }),
  actions: {},
  persist:true
})
