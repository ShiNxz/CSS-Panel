import SeoSettings from './UI/Seo'
import AdvancedSettings from './UI/Advanced'
import DesignSettings from './UI/Design'
import HeaderDesign from './UI/Design/Header'
import ServersSettings from './UI/Servers'

const tabs: Tab[] = [
	{
		id: 'seo',
		label: 'SEO',
		content: SeoSettings,
	},
	{
		id: 'servers',
		label: 'Servers',
		content: ServersSettings,
	},
	{
		id: 'design',
		label: 'Design',
		content: DesignSettings,
	},
	{
		id: 'header-design',
		label: 'Header Design',
		content: HeaderDesign,
	},
	{
		id: 'advanced',
		label: 'Advanced Settings',
		content: AdvancedSettings,
	},
]

interface Tab {
	id: string
	label: string
	content: React.FC
}

export default tabs
