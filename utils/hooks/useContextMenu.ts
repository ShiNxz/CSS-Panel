import { useState } from 'react'

const useContextMenu = <T>() => {
	const [playerContextMenu, setPlayerContextMenu] = useState<State<T>>({
		open: false,
		x: 0,
		y: 0,
	})

	const handleOpen = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>, info?: T) => {
		e.preventDefault()

		const { pageX, pageY } = e

		setPlayerContextMenu({
			open: true,
			x: pageX,
			y: pageY,
			info,
		})
	}

	const handleCloseMenu = () => {
		setPlayerContextMenu({
			...playerContextMenu,
			open: false,
		})
	}

	return {
		x: playerContextMenu.x,
		y: playerContextMenu.y,
		open: playerContextMenu.open,
		handleCloseMenu,
		handleOpen,
	}
}

interface State<T> {
	open: boolean
	x: number
	y: number
	info?: T
}

export default useContextMenu
