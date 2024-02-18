import query from '@/utils/functions/db'
import isUrl from '@/utils/functions/isURL'

export const dynamic = 'force-dynamic'

const Logo = async () => {
	const logo = await query.settings.getByKey('logo')

	if (isUrl(logo || ''))
		return (
			<img
				src={logo || ''}
				alt='Logo'
				className='h-10'
			/>
		)

	const title = await query.settings.getByKey('title')

	return <div className='text-xl font-bold'>{title}</div>
}

export default Logo
