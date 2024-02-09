import query from '@/utils/functions/db'
import SSRHeader from '../UI/Layouts/Main/Header/SSR'
import Servers from '../UI/Layouts/Main/Servers'
import ServersTable from '../UI/Layouts/Main/Servers/Table'

const ServersPage = async () => {
	const serversGrid = await query.settings.getByKey('serversGrid')

	return (
		<>
			<SSRHeader />
			{serversGrid ? <Servers /> : <ServersTable />}
		</>
	)
}

export default ServersPage
