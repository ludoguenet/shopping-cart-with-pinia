import { defineStore, acceptHMRUpdate } from "pinia";

export const useCartStore = defineStore('shopping-cart',  {
  state: () => ({
    items: [],
  }),
  persist: true,
  getters: {
    count: (state) => state.items.reduce((prevQty, nextItem) => prevQty + nextItem.qty, 0),
    subTotal: (state) => state.items.reduce((prevPrice, nextItem) => prevPrice + (nextItem.price * nextItem.qty), 0),
  },
  actions: {
    add (newItem) {
      const existingItem = this.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty++;
      } else {
        this.items.push({ ... newItem});
      }
    },

    remove (deleteItemId) {
      this.items = this.items.filter(item => item.id !== deleteItemId);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
