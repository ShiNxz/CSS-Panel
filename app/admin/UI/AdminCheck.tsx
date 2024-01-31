'use client'

import useAuth from '@/utils/hooks/useAuth'
import { Spinner } from '@nextui-org/spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AdminCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { admin, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			if (!admin || admin.flags !== '@css/root') router.push('/')
		}
	}, [admin, isLoading, router])

	return isLoading ? <Spinner /> : admin ? <>{children}</> : <>No Access</>
}

export default AdminCheck
