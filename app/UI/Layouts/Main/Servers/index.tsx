import SoloServer from './Server/SoloServer'
import ServerModal from './ServerModal'
import query from '@/utils/functions/db'

const Servers = async () => {
	const servers = await query.servers.getAllSafe()

	return (
		<div className='grid xl:grid-cols-3 gap-4 flex-wrap items-center min-h-[150px]'>
			{servers.map((server) => (
				<SoloServer
					{...server}
					key={server.id}
				/>
			))}
			<ServerModal />
		</div>
	)
}

export default Servers
