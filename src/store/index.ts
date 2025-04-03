// 统一管理所有的 pinia store
import useWalletStore from './modules/wallet'
export default function useStore() {
  return {
    home: useWalletStore()

  }
}