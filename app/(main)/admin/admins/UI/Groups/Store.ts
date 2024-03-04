import type { SA_AdminGroup } from '@/utils/types/db/plugin'
import { create } from 'zustand'

const useManageAdminGroupsStore = create<Store>((set) => ({
	open: false,
	setOpen: (open) => set({ open, edit: null }),
	edit: null,
	setEdit: (edit) => set({ edit, open: true }),
	delete: null,
	setDelete: (group) => set({ delete: group }),
}))

interface Store {
	open: boolean
	setOpen: (open: boolean) => void
	edit: null | SA_AdminGroup
	setEdit: (edit: SA_AdminGroup) => void
	delete: null | SA_AdminGroup
	setDelete: (group: SA_AdminGroup | null) => void
}

export default useManageAdminGroupsStore
