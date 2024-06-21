// store.js
import { create } from "zustand";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface StoreState {
  formData: FormData;
  updateForm: (name: keyof FormData, value: string) => void;
}

const useStore = create<StoreState>((set) => ({
  formData: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  updateForm: (name: keyof FormData, value: string) =>
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    })),
}));

export default useStore;
