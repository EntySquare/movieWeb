import { CartItem, GoodsInfo } from '@/api/type'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    selectedProduct: [] as GoodsInfo[] | CartItem[]  // 存储选中的商品信息
  }),
  actions: {
    setProduct (product: any) {
      this.selectedProduct = product
    }
  },
  persist: true // 开启持久化
})
