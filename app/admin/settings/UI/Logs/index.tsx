import adminSettingsStore from '../../store'
import Log from './Log'

const Logs = () => {
	const logs = adminSettingsStore((state) => state.logs)

	return (
		<div className='grid grid-cols-3 gap-4'>
			{logs.map((log) => (
				<Log
					key={log.id.toString()}
					{...log}
				/>
			))}
		</div>
	)
}

export default Logs
