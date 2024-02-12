import type { SA_Admin, SA_Server } from '@/utils/types/db/plugin'
import { create } from 'zustand'

const useManageAdminsStore = create<Store>((set) => ({
	open: false,
	setOpen: (open) => set({ open, edit: null }),
	edit: null,
	setEdit: (edit) => set({ edit, open: true }),
	delete: null,
	setDelete: (admin) => set({ delete: admin }),
	servers: [],
	setServers: (servers) => set({ servers }),
}))

interface Store {
	open: boolean
	setOpen: (open: boolean) => void
	edit: null | SA_Admin
	setEdit: (edit: SA_Admin) => void
	delete: null | SA_Admin
	setDelete: (admin: SA_Admin | null) => void
	servers: SA_Server[]
	setServers: (servers: SA_Server[]) => void
}

export default useManageAdminsStore
