import type { SafeServerInfo } from '@/pages/api/servers'
import { create } from 'zustand'

const useServersStore = create<ServersStore>((set) => ({
	modal: {
		open: false,
		server: null,
	},
	setModal: (modal) => set({ modal }),
}))

interface ServersStore {
	modal: {
		open: boolean
		server: SafeServerInfo | null
	}
	setModal: (modal: { open: boolean; server: SafeServerInfo | null }) => void
}

export default useServersStore
