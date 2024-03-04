import { GetDefaultSettings } from '@/utils/schemas/settings'
import query from '@/utils/functions/db'
import Header from '.'

export const dynamic = 'force-dynamic'

const defaultSettings = GetDefaultSettings()

const SSRHeader = async () => {
	const headerImage = (await query?.settings.getByKey('headerImage')) || defaultSettings.headerImage
	const headerCodeHTML = (await query?.settings.getByKey('headerCodeHTML')) || defaultSettings.headerCodeHTML
	const headerCodeCSS = (await query?.settings.getByKey('headerCodeCSS')) || defaultSettings.headerCodeCSS

	return (
		<Header
			image={headerImage || ''}
			html={headerCodeHTML || ''}
			css={headerCodeCSS || ''}
		/>
	)
}

export default SSRHeader
