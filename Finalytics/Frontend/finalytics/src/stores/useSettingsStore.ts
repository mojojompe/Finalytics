import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    theme: 'dark' | 'light'; // Currently only dark supported, but good for future
    compactMode: boolean;
    showVolume: boolean;
    chartType: 'candle' | 'line' | 'area';
    accentColor: string;

    setTheme: (theme: 'dark' | 'light') => void;
    setCompactMode: (compact: boolean) => void;
    setShowVolume: (show: boolean) => void;
    setChartType: (type: 'candle' | 'line' | 'area') => void;
    setAccentColor: (color: string) => void;
}

const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'dark',
            compactMode: false,
            showVolume: true,
            chartType: 'candle',
            accentColor: '#10B981', // Default Emerald

            setTheme: (theme) => set({ theme }),
            setCompactMode: (compactMode) => set({ compactMode }),
            setShowVolume: (showVolume) => set({ showVolume }),
            setChartType: (chartType) => set({ chartType }),
            setAccentColor: (accentColor) => set({ accentColor }),
        }),
        {
            name: 'finalytics-settings',
        }
    )
);

export default useSettingsStore;
