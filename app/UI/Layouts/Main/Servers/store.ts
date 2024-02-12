import type { SafeServerInfo } from '@/utils/functions/query/ServerQuery'
import { create } from 'zustand'

const useServersStore = create<ServersStore>((set) => ({
	modal: {
		open: false,
		server: null,
	},
	setModal: (modal) => set({ modal }),
	chatModal: {
		open: false,
		server: null,
	},
	setChatModal: (modal) => set({ chatModal: modal }),
}))

interface ServersStore {
	modal: {
		open: boolean
		server: SafeServerInfo | null
	}
	setModal: (modal: { open: boolean; server: SafeServerInfo | null }) => void
	chatModal: {
		open: boolean
		server: SafeServerInfo | null
	}
	setChatModal: (modal: { open: boolean; server: SafeServerInfo | null }) => void
}

export default useServersStore
