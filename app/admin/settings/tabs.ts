import SeoSettings from './UI/Seo'
import AdvancedSettings from './UI/Advanced'
import DesignSettings from './UI/Design'
import Logs from './UI/Logs'

const tabs = [
	{
		id: 'seo',
		label: 'SEO',
		content: SeoSettings,
	},
	{
		id: 'design',
		label: 'Design',
		content: DesignSettings,
	},
	{
		id: 'advanced',
		label: 'Advanced Settings',
		content: AdvancedSettings,
	},
	{
		id: 'logs',
		label: 'Logs',
		content: Logs,
	},
]

export default tabs
