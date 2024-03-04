import { Settings, GetDefaultSettings } from '@/utils/schemas/settings'
import { create } from 'zustand'

const settingsStore = create<SettingsStore>((set) => ({
	settings: GetDefaultSettings(),
	setSettings: (settings) => set({ settings }),
}))

interface SettingsStore {
	settings: Settings
	setSettings: (settings: Settings) => void
}

export default settingsStore
