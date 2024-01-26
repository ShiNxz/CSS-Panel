'use client'

import type { CSSP_LogExtended } from '@/utils/types/db/panel'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Spinner } from '@nextui-org/spinner'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Log from './Log'

const Logs = () => {
	const { data, isLoading } = useSWR<CSSP_LogExtended[]>('/api/admin/logs', fetcher)

	return (
		<Card>
			<CardHeader className='text-2xl font-medium'>Logs</CardHeader>
			<CardBody className='grid grid-cols-3 gap-4'>
				{isLoading ? (
					<Spinner />
				) : (
					data &&
					data.map((log) => (
						<Log
							{...log}
							key={log.id}
						/>
					))
				)}
			</CardBody>
		</Card>
	)
}

export default Logs
