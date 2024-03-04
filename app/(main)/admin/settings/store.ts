import { GetDefaultSettings, type Settings } from '@/utils/schemas/settings'
import { create } from 'zustand'

const adminSettingsStore = create<SettingsStore>((set) => ({
	settings: GetDefaultSettings(),
	setSettings: (settings) => set({ settings }),
	isFormLoading: false,
	setIsFormLoading: (isFormLoading) => set({ isFormLoading }),
}))

interface SettingsStore {
	settings: Settings
	setSettings: (settings: Settings) => void
	isFormLoading: boolean
	setIsFormLoading: (isFormLoading: boolean) => void
}

export default adminSettingsStore
