import { defineStore } from "pinia";

export const useFormStore = defineStore("formStore", {
  state: () => ({
    savedForm: {
      email: "",
      country: "",
      firstName: "",
      lastName: "",
      apartment: "",
      phone: "",
      city: "",
      province: "",
      postcode: "",
    },
  }),
  actions: {
    saveForm(formData: any) {
      this.savedForm = { ...formData };
    },
    clearForm() {
        this.savedForm = {
          email: "",
          country: "",
          firstName: "",
          lastName: "",
          apartment: "",
          phone: "",
          city: "",
          province: "",
          postcode: "",
        };
  },
  },
  persist: true, // 开启持久化

});
