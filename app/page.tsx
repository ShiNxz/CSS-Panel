import BansTable from './UI/Layouts/Main/Bans'
import MutesTable from './UI/Layouts/Main/Mutes'
import StatsGrid from './UI/Layouts/Main/Stats/Grid'
import Servers from './UI/Layouts/Main/Servers'
import SSRHeader from './UI/Layouts/Main/Header/SSR'

const Home = async () => {
	return (
		<>
			<SSRHeader />
			<Servers />
			<StatsGrid />
			<div className='grid grid-cols-2 gap-6'>
				<BansTable />
				<MutesTable />
			</div>
		</>
	)
}

export default Home
