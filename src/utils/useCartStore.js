import { defineStore, acceptHMRUpdate } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    persist: true,
    getters: {
        totalPrice() {
            return this.items.reduce(
                (prevPrice, nextItem) => prevPrice + nextItem.price,
                0,
            );
        }, 
        count() {
            return this.items.length;
        }
    },

    actions: {
        add(item) {
            this.items.push(item);
        },
        remove(itemId) {
            this.items = this.items.filter((item) => item.id !== itemId);
        },
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}