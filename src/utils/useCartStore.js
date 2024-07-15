import { defineStore, acceptHMRUpdate } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    persist: true,
    getters: {
        totalPrice() {
            return this.items.reduce(
                (prevPrice, nextItem) => prevPrice + (nextItem.price * nextItem.qty),
                0,
            );
        }, 
        count() {
            return this.items.reduce(
                (prevQty, nextItem) => prevQty + nextItem.qty,
                0,
            );
        }
    },

    actions: {
        add(newItem) {
            const existingItem = this.items.find(item => item.id === newItem.id);

            if (existingItem) {
                this.items.find(item => item.id === newItem.id).qty++;
            } else {
                this.items.push(newItem);
            }
        },
        remove(itemId) {
            this.items = this.items.filter((item) => item.id !== itemId);
        },
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}