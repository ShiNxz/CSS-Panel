import query from '@/utils/functions/db'
import Header from '.'

export const dynamic = 'force-dynamic'

const SSRHeader = async () => {
	const headerImage = await query.settings.getByKey('headerImage')
	const headerCodeHTML = await query.settings.getByKey('headerCodeHTML')
	const headerCodeCSS = await query.settings.getByKey('headerCodeCSS')

	return (
		<Header
			image={headerImage || ''}
			html={headerCodeHTML || ''}
			css={headerCodeCSS || ''}
		/>
	)
}

export default SSRHeader
