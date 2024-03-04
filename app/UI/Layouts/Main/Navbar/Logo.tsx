import query from '@/utils/functions/db'
import isUrl from '@/utils/functions/isURL'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const Logo = async () => {
	const logo = (await query?.settings.getByKey('logo')) || ''

	if (isUrl(logo || ''))
		return (
			<Link
				href='/'
				passHref
			>
				<img
					src={logo || ''}
					alt='Logo'
					className='h-10'
				/>
			</Link>
		)

	const title = (await query?.settings.getByKey('title')) || 'CSS-Panel'

	return (
		<Link
			href='/'
			className='text-xl font-bold'
		>
			{title}
		</Link>
	)
}

export default Logo
