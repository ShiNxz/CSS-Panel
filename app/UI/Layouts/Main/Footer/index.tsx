import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='w-full flex items-center justify-center py-3'>
			<Link
				className='flex items-center gap-1 text-current'
				href='github'
				target='_blank'
			>
				<span className='text-default-600'>Powered by</span>
				<p className='text-primary'>CS2-Panel</p>
			</Link>
		</footer>
	)
}

export default Footer
