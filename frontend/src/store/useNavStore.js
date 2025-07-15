import { create } from "zustand";

export const useNavStore = create((set) => ({
  prevRoute: "/",
  setPrevRoute: (route) => set({ prevRoute: route }),
}));