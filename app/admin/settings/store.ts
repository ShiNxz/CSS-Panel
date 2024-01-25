import type { CSSP_LogExtended } from '@/utils/types/db/panel'
import { GetDefaultSettings, type Settings } from '@/utils/schemas/settings'
import { create } from 'zustand'

const adminSettingsStore = create<SettingsStore>((set) => ({
	settings: GetDefaultSettings(),
	setSettings: (settings) => set({ settings }),
	logs: [],
	setLogs: (logs) => set({ logs }),
	isFormLoading: false,
	setIsFormLoading: (isFormLoading) => set({ isFormLoading }),
}))

interface SettingsStore {
	settings: Settings
	setSettings: (settings: Settings) => void
	logs: CSSP_LogExtended[]
	setLogs: (logs: CSSP_LogExtended[]) => void
	isFormLoading: boolean
	setIsFormLoading: (isFormLoading: boolean) => void
}

export default adminSettingsStore
