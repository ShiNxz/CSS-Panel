import Servers from './Servers'
import Bans from './Bans'
import Mutes from './Mutes'
import Settings from './Custom/Settings'
import Admins from './Admins'
import AdminGroups from './AdminGroups'
import ChatLogs from './ChatLogs'
import Logs from './Custom/Logs'
import { isReady } from '@/utils/lib/Mysql'

const query = isReady
	? {
			servers: Servers,
			admins: Admins,
			adminGroups: AdminGroups,
			bans: Bans,
			mutes: Mutes,
			chatLogs: ChatLogs,
			settings: Settings,
			logs: Logs,
	  }
	: null

export default query
