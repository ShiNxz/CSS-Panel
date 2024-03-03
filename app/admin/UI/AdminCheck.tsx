'use client'

import type { Flag } from '@/utils/types/db/css'
import { Spinner } from '@nextui-org/spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuth from '@/utils/hooks/useAuth'

const AdminCheck: React.FC<{ children: React.ReactNode; flags: Flag[] }> = ({ children, flags }) => {
	const { admin, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			if (!admin) return router.push('/')

			if (flags.length > 0) {
				if (!flags.some((flag) => admin.flags?.includes(flag))) return router.push('/admin')
			}
		}
	}, [admin, isLoading, router, flags])

	return isLoading ? <Spinner /> : admin ? <>{children}</> : <>No Access</>
}

export default AdminCheck
