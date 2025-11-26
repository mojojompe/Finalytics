import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSettings {
    theme: 'dark' | 'light';
    notifications: boolean;
}

interface User {
    uid: string;
    email: string | null;
    fullName?: string;
    watchlist?: string[];
    settings?: UserSettings;
    createdAt?: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    settings: UserSettings;
    updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),

            settings: {
                theme: 'dark',
                notifications: true,
            },
            updateSettings: (newSettings) =>
                set((state) => ({ settings: { ...state.settings, ...newSettings } })),
        }),
        {
            name: 'finalytics-user-storage',
        }
    )
);

export default useUserStore;
