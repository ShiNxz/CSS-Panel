import { create } from 'zustand'
import { z } from 'zod'

const useActionStore = create<ActionStore>((set) => ({
	action: null,
	setAction: (action) => set({ action }),
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
	details: null,
	setDetails: (details) => set({ details }),
	reset: () => set({ action: null, isLoading: false, details: null }),
}))

export interface ActionStore {
	action: Actions | null
	setAction: (action: ActionStore['action']) => void
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
	details: Details
	setDetails: (details: Details) => void
	reset: () => void
}

export const unBanSchema = z.object({
	reason: z.string(),
})

export const reBanSchema = z.object({
	reason: z.string(),
	duration: z.string(),
})

export const commentSchema = z.object({
	comment: z.string(),
})

export const editBanSchema = z.object({
	reason: z.string(),
	duration: z.string(),
})

export const banActionsSchema = z.enum(['unban', 'reban', 'comment', 'edit', 'delete'])
type Actions = z.infer<typeof banActionsSchema>

export type Details =
	| null
	| z.infer<typeof unBanSchema>
	| z.infer<typeof reBanSchema>
	| z.infer<typeof commentSchema>
	| z.infer<typeof editBanSchema>

export default useActionStore
