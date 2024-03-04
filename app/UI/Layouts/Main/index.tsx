import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Logo from './Navbar/Logo'
import UpdateButton from './Navbar/UpdateButton/Server'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar>
				<Logo />
				<UpdateButton />
			</Navbar>
			<div className='flex flex-row mb-36'>
				<Sidebar />
				<div className='flex flex-col gap-6 w-full'>
					<div className='flex flex-col gap-6 p-6 w-full min-h-[40vw]'>{children}</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Layout
