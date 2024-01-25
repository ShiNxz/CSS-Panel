'use client'

import useAuth from '@/utils/hooks/useAuth'
import { Spinner } from '@nextui-org/spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AdminCheck = ({ children }: { children: React.ReactNode }) => {
	const { admin, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return
		if (!admin) router.push('/')
	}, [admin, isLoading, router])

	return isLoading ? <Spinner /> : admin ? children : <>No Access</>
}

export default AdminCheck
