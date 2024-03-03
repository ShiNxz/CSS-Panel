'use client'

import type { CSSP_LogExtended } from '@/utils/types/db/panel'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Pagination } from '@nextui-org/pagination'
import { Spinner } from '@nextui-org/spinner'
import { usePathname } from 'next/navigation'
import { ADMIN_TABS } from '../UI/Tabs'
import { useMemo, useState } from 'react'
import { Input } from '@nextui-org/input'
import { useDebounce } from 'use-debounce'
import AdminCheck from '../UI/AdminCheck'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Log from './Log'

const Logs = () => {
	const [page, setPage] = useState(1)
	const [query, setQuery] = useState('')
	const [debouncedQuery] = useDebounce(query, 1000)

	let rowsPerPage = 20

	const { data, isLoading } = useSWR<{ results: CSSP_LogExtended[]; count: number }>(
		`/api/admin/logs?page=${page}&rows=${rowsPerPage}&query=${debouncedQuery}`,
		fetcher,
		{
			keepPreviousData: true,
		}
	)

	const pages = useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
	}, [data?.count, rowsPerPage])

	const path = usePathname()
	const route = ADMIN_TABS.find((t) => t.path === path)

	return (
		<AdminCheck flags={route?.permissions || []}>
			<Card>
				<CardHeader className='text-2xl font-medium flex flex-row justify-between items-center'>
					<div>Logs</div>
					<Input
						label='Search...'
						placeholder='You can search by title or message...'
						className='w-1/5'
						value={query}
						onValueChange={setQuery}
						isClearable
					/>
				</CardHeader>
				<CardBody className='grid grid-cols-3 gap-4'>
					{isLoading ? (
						<Spinner />
					) : (
						data &&
						data.results?.map((log) => (
							<Log
								{...log}
								key={log.id}
							/>
						))
					)}
				</CardBody>
				<CardFooter>
					<Pagination
						color='primary'
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
						className='mx-auto mt-10'
						size='sm'
						isCompact
						showControls
						showShadow
					/>
				</CardFooter>
			</Card>
		</AdminCheck>
	)
}

export default Logs
