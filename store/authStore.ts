// apply Zustand here

import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '../pages';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
});

// will use this hook anywhere
export const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);
