import type { SA_Server } from '@/utils/types/db/plugin'
import { create } from 'zustand'

const useManageServersStore = create<Store>((set) => ({
	open: false,
	setOpen: (open) => set({ open, edit: null }),
	edit: null,
	setEdit: (edit) => set({ edit, open: true }),
	delete: null,
	setDelete: (server) => set({ delete: server }),
	rcon: null,
	setRcon: (rcon) => set({ rcon }),
}))

interface Store {
	open: boolean
	setOpen: (open: boolean) => void
	edit: null | SA_Server
	setEdit: (edit: SA_Server) => void
	delete: null | SA_Server
	setDelete: (server: SA_Server | null) => void
	rcon: null | number
	setRcon: (rcon: number | null) => void
}

export default useManageServersStore
