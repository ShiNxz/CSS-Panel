import BansTable from './UI/Layouts/Main/Bans'
import MutesTable from './UI/Layouts/Main/Mutes'
import StatsGrid from './UI/Layouts/Main/Stats/Grid'
import Servers from './UI/Layouts/Main/Servers'
import SSRHeader from './UI/Layouts/Main/Header/SSR'
import ServersTable from './UI/Layouts/Main/Servers/Table'
import query from '@/utils/functions/db'

export const dynamic = 'force-dynamic'

const Home = async () => {
	const serversGrid = await query.settings.getByKey('serversGrid')

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
