'use client'

import type { SafeServerInfo } from '@/pages/api/servers'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import fetcher from '@/utils/fetcher'
import Server from '../Server'
import useSWR from 'swr'
import ServerModal from './ServerModal'

const Servers = () => {
	const [modal, setModal] = useState<{ open: boolean; server: SafeServerInfo | null }>({
		open: false,
		server: null,
	})

	const { data, isLoading } = useSWR<SafeServerInfo[]>('/api/servers', fetcher, {
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
						handleOpen={() => setModal({ open: true, server })}
					/>
				))
			)}
			<ServerModal
				open={modal.open}
				server={modal.server}
				handleClose={() => setModal((prev) => ({ ...prev, open: false }))}
			/>
		</div>
	)
}

export default Servers
