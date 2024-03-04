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

export const serverKickSchema = z.string()
export const serverBanSchema = z.object({
	duration: z.number(), // in minutes
	reason: z.string(),
})

export const serverMuteSchema = z.object({
	duration: z.number(), // in minutes
	reason: z.string(),
	type: typeSchema,
})

export const actions = z.enum(['kick', 'ban', 'mute'])
type Actions = z.infer<typeof actions>

export const serverActionsSchema = z.object({
	action: actions,
	userId: z.number(),
})

export type Details =
	| null
	| z.infer<typeof serverKickSchema>
	| z.infer<typeof serverBanSchema>
	| z.infer<typeof serverMuteSchema>

export default useActionStore
