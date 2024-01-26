'use client'

import type { Settings } from '@/utils/schemas/settings'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import { Tabs, Tab } from '@nextui-org/tabs'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'
import adminSettingsStore from './store'
import useSWR, { mutate } from 'swr'
import fetcher from '@/utils/fetcher'
import axios from 'axios'
import tabs from './tabs'

const Settings = () => {
	const { data, isLoading } = useSWR<Settings>('/api/admin/settings', fetcher)
	const [tab, setTab] = useQueryState(tabs[0].id)

	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)

	useEffect(() => {
		if (data) setSettings(data)
	}, [isLoading, data, setSettings])

	const [isLoadingForm, setIsLoadingForm] = useState(false)

	const handleSaveSettings = async () => {
		if (!data || isLoading) return
		setIsLoadingForm(true)

		try {
			await axios.post('/api/admin/settings', settings)
			await mutate('/api/settings')
			toast.success('Settings saved!')
		} catch (error) {
			toast.error('Error saving settings!')
		}

		setIsLoadingForm(false)
	}

	const currentTab = tabs.find((t) => t.id === tab) || tabs[0]
	const Component = currentTab.content

	return (
		<>
			<Tabs
				aria-label='Settings tabs'
				items={tabs}
				selectedKey={tab}
				onSelectionChange={setTab as any}
			>
				{(item) => (
					<Tab
						key={item.id}
						title={item.label}
					/>
				)}
			</Tabs>
			<Card>
				<CardHeader className='text-2xl font-medium'>{currentTab.label}</CardHeader>
				<CardBody>
					{isLoadingForm ? <Spinner /> : <Component />}
					<div className='grid grid-cols-2 gap-4'>
						<Button
							className='mt-4'
							color='danger'
							onClick={() => (data ? setSettings(data) : undefined)}
							isLoading={isLoadingForm || isLoading}
							fullWidth
						>
							Reset Settings
						</Button>
						<Button
							className='mt-4'
							color='primary'
							onClick={handleSaveSettings}
							isLoading={isLoadingForm || isLoading}
							fullWidth
						>
							{isLoading || isLoadingForm ? 'Please wait...' : 'Save Changes'}
						</Button>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default Settings
