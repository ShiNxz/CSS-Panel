import { redirect } from 'next/navigation'
import BansTable from './UI/Layouts/Main/Bans'
import MutesTable from './UI/Layouts/Main/Mutes'
import StatsGrid from './UI/Layouts/Main/Stats/Grid'
import Servers from './UI/Layouts/Main/Servers'
import SSRHeader from './UI/Layouts/Main/Header/SSR'
import ServersTable from './UI/Layouts/Main/Servers/Table'
import query from '@/utils/functions/db'
import envSchema from '@/utils/lib/Env'

export const dynamic = 'force-dynamic'

const Home = async () => {
	const envSet = envSchema.safeParse(process.env)
	if (!envSet.success) {
		debug('Env not set, redirecting to setup page.')
		return redirect('/setup')
	}

	const serversGrid = (await query?.settings.getByKey('serversGrid')) || true

	return (
		<>
			<SSRHeader />
			{serversGrid ? <Servers /> : <ServersTable />}
			<StatsGrid />
			<div className='grid grid-cols-2 gap-6'>
				<BansTable type='SMALL' />
				<MutesTable type='SMALL' />
			</div>
		</>
	)
}

export default Home
