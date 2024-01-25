'use client'

import type { ExtServer } from '@/pages/api/servers'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import fetcher from '@/utils/fetcher'
import Server from '../Server'
import useSWR from 'swr'

const Servers = () => {
	const { data, isLoading } = useSWR<ExtServer[]>('/api/servers', fetcher, {
		onError: (error) => toast.error(error),
	})

	return (
		<div className='grid xl:grid-cols-3 gap-4 flex-wrap items-center min-h-[150px]'>
			{isLoading ? (
				<Spinner classNames={{ base: 'mx-auto col-span-3' }} />
			) : (
				data &&
				data.map((server) => (
					<Server
						{...server}
						key={server.address}
					/>
				))
			)}
		</div>
	)
}

export default Servers
