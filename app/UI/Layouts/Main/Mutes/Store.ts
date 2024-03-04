import { typeSchema } from '@/utils/schemas/muteSchema'
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

export const unMuteSchema = z.object({
	reason: z.string(),
})

export const reMuteSchema = z.object({
	reason: z.string(),
	duration: z.string(),
	type: typeSchema,
})

export const commentSchema = z.object({
	comment: z.string(),
})

export const editMuteSchema = z.object({
	reason: z.string(),
	duration: z.string(),
	type: typeSchema,
})

export const muteActionsSchema = z.enum(['unmute', 'remute', 'comment', 'edit', 'delete'])
type Actions = z.infer<typeof muteActionsSchema>

export type Details =
	| null
	| z.infer<typeof unMuteSchema>
	| z.infer<typeof reMuteSchema>
	| z.infer<typeof commentSchema>
	| z.infer<typeof editMuteSchema>

export default useActionStore
