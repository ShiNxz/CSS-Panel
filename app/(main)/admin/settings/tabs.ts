import SeoSettings from './UI/Seo'
import AdvancedSettings from './UI/Advanced'
import DesignSettings from './UI/Design'
import HeaderDesign from './UI/Design/Header'
import ServersSettings from './UI/Servers'
import PanelSettings from './UI/Panel'

const tabs: Tab[] = [
	{
		label: 'SEO',
		content: SeoSettings,
	},
	{
		label: 'Servers',
		content: ServersSettings,
	},
	{
		label: 'Panel',
		content: PanelSettings,
	},
	{
		label: 'Design',
		content: DesignSettings,
	},
	{
		label: 'Header Design',
		content: HeaderDesign,
	},
	{
		label: 'Advanced Settings',
		content: AdvancedSettings,
	},
]

interface Tab {
	label: string
	content: React.FC
}

export default tabs
