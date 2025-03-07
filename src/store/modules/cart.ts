import { CartItemAll } from "@/api/type";
import { defineStore } from "pinia";

const useCartStore = defineStore("Cart", {
    state: () => ({
        cartList: [] as CartItemAll[],
    }),
    actions: {
        setcartList(address: CartItemAll[]) {
            this.cartList = address;

        },
        clearcartList() {
            this.cartList = [];
        },
    },
});

export default useCartStore;
