'use client'

import type { ExtServer } from '@/pages/api/servers'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import Header from '../UI/Layouts/Main/Header'
import Server from '../UI/Layouts/Main/Server'

const Servers = () => {
	const { data, isLoading } = useSWR<ExtServer[]>('/api/servers', fetcher, {
		onError: (error) => toast.error(error),
	})

	return (
		<>
			<Header />
			<div className='grid xl:grid-cols-3 gap-4 flex-wrap items-center'>
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
		</>
	)
}

export default Servers
