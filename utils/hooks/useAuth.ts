'use client'

import type { IAuth } from '@/pages/api/auth'
import { toast } from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import fetcher from '@/utils/fetcher'
import axios from 'axios'

const useAuth = (): AuthHook => {
	const { data, isLoading, error } = useSWR<IAuth>(`/api/auth`, fetcher)

	if (data && data.admin.group) {
		data.admin.flags = data.admin.group.flags
		data.admin.immunity = data.admin.group.immunity
	}

	return {
		user: error || !data ? null : data.user,
		admin: error || !data ? null : data.admin,
		isLoading,
	}
}

type AuthHook = {
	isLoading: boolean
	user: IAuth['user'] | null
	admin: IAuth['admin'] | null
}

export const handleLogout = async () => {
	await axios('/api/auth/logout')
	await mutate('/api/auth')
	toast.success('Logged out successfully')
}

export const handleLogin = () => {
	const width = 600,
		height = 800,
		left = window.innerWidth / 2 - width / 2,
		top = window.innerHeight / 2 - height / 2

	const win = window.open(
		`/api/auth/login/`,
		'',
		`toolbar=no, location=no, directories=no, status=no, menubar=no, 
		  scrollbars=no, resizable=yes, copyhistory=no, width=${width}, 
		  height=${height}, top=${top}, left=${left}`
	)

	const timer = setInterval(async () => {
		if (win && win.closed) {
			await mutate('/api/auth')
			toast.success('Logged in successfully!')
			clearInterval(timer)
		}
	}, 1000)
}

export default useAuth
