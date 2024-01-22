import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className='flex flex-row'>
				<Sidebar />
				<div className='flex flex-col gap-6 w-full'>
					<div className='flex flex-col gap-6 p-6 w-full min-h-[40vw]'>{children}</div>
					<Footer />
				</div>
			</div>
		</>
	)
}

export default Layout
