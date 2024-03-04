'use client'

import type { API_STATS } from '@/pages/api/stats'
import { IconCloudLock, IconMicrophoneOff, IconServer, IconUsers } from '@tabler/icons-react'
import fetcher from '@/utils/fetcher'
import StatsBox from '.'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const StatsGrid = () => {
	const { data } = useSWR<API_STATS>('/api/stats', fetcher, {
		onError: (error) => toast.error(error),
	})

	return (
		<div className='grid grid-cols-5 gap-6'>
			<StatsBox
				title='Total Admins'
				value={data?.admins || 0}
				icon={IconUsers}
			/>
			<StatsBox
				title='Total Servers'
				value={data?.servers || 0}
				icon={IconServer}
			/>
			<StatsBox
				title='Total Bans'
				value={data?.bans || 0}
				icon={IconCloudLock}
			/>
			<StatsBox
				title='Total Mutes'
				value={data?.mutes || 0}
				icon={IconMicrophoneOff}
			/>
			<StatsBox
				title='Total Mutes'
				value={data?.mutes || 0}
				icon={IconMicrophoneOff}
			/>
		</div>
	)
}

export default StatsGrid
