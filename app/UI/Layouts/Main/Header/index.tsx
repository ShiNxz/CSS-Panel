const Header = ({ image, html, css }: Props) => {
	return (
		<div
			className='h-72 overflow-hidden rounded-2xl'
			style={{
				backgroundImage: `url(${image})`,
			}}
		>
			<div
				className='h-full w-full flex flex-col justify-center items-center'
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<style>{css}</style>
		</div>
	)
}

interface Props {
	image: string
	html: string
	css: string
}

export default Header
