'use client'

import { useForm, zodResolver } from '@mantine/form'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import { Button } from '@nextui-org/button'
import envSchema, { dbSchema } from '@/utils/lib/Env'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'

const SetupPage = () => {
	const [step, setStep] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const STEPS = 3
	const progress = (step / STEPS) * 100

	const form = useForm({
		initialValues: {
			STEAM_API_KEY: '',
			DOMAIN: '',
			DB_HOST: '',
			DB_USER: '',
			DB_PASSWORD: '',
			DB_DATABASE: '',
			DB_PORT: '3306',
			MASTER_ADMIN: '',
		},
		validate: zodResolver(envSchema),
	})

	const checkDatabaseConnection = async () => {
		// Check if the database connection is valid
		setIsLoading(true)

		try {
			await axios.post(`/api/admin/db`, form.values)

			toast.success(`Database connection is valid!`)
			setStep(2)
		} catch (error) {
			console.error(error)
			toast.error(`Failed to connect to the database!`)
		}

		setIsLoading(false)
	}

	console.log({ v: form.values, e: form.errors })

	const handleSubmit = async () => {
		if (isLoading) return

		setIsLoading(true)

		try {
			await axios.post(`/api/admin/setup`, form.values)

			toast.success(`Succesfully setup the panel!`)
			setStep(3)
		} catch (error) {
			console.error(error)
			toast.error(`Failed to setup the panel!`)
		}

		setIsLoading(false)
	}

	let StepUI = (
		<>
			<p>
				Please fill in the following settings to setup the panel.
				<br />
				Make sure to have your database ready and a Steam API key. <br />
				The following setting will be saved under the <code>.env</code> file in your website folder.
			</p>
		</>
	)

	const nextStep = async () => {
		switch (step) {
			case 0:
				setStep(1)
				break

			case 1:
				try {
					dbSchema.parse(form.values)
					await checkDatabaseConnection()
				} catch (error) {
					console.error(error)
					toast.error(`Invalid database settings!`)
				}
				break
			case 2:
				await handleSubmit()
				break
		}
	}

	switch (step) {
		case 1:
			StepUI = (
				<>
					<Input
						label='Database URL'
						placeholder='1.1.1.1'
						errorMessage={form.errors.DB_HOST}
						type='text'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('DB_HOST')}
					/>
					<Input
						label='Database User'
						placeholder='root'
						errorMessage={form.errors.DB_USER}
						type='text'
						variant='bordered'
						disabled={isLoading}
						autoComplete='off'
						{...form.getInputProps('DB_USER')}
					/>
					<Input
						label='Database Password'
						placeholder='111111'
						errorMessage={form.errors.DB_PASSWORD}
						type='password'
						variant='bordered'
						autoComplete='off'
						disabled={isLoading}
						{...form.getInputProps('DB_PASSWORD')}
					/>
					<Input
						label='Database Name'
						placeholder='DB_NAME'
						errorMessage={form.errors.DB_DATABASE}
						type='text'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('DB_DATABASE')}
					/>
					<Input
						label='Database Port'
						placeholder='DB_PORT'
						errorMessage={form.errors.DB_PORT}
						type='number'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('DB_PORT')}
					/>
				</>
			)
			break
		case 2:
			StepUI = (
				<>
					<Input
						label='Website Domain'
						description='The url of your website, e.g. https://example.com'
						placeholder='https://example.com'
						errorMessage={form.errors.DOMAIN}
						type='text'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('DOMAIN')}
					/>
					<Input
						label='Steam API Key'
						description={
							<>
								Get your Steam API key from{' '}
								<Link
									href='https://steamcommunity.com/dev/apikey'
									target='_blank'
								>
									https://steamcommunity.com/dev/apikey
								</Link>
							</>
						}
						placeholder='https://example.com'
						errorMessage={form.errors.STEAM_API_KEY}
						type='text'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('STEAM_API_KEY')}
					/>
					<Input
						label='Master Admin'
						description='Steam 64'
						placeholder='eg, 76561198000000000'
						errorMessage={form.errors.MASTER_ADMIN}
						type='text'
						variant='bordered'
						disabled={isLoading}
						{...form.getInputProps('MASTER_ADMIN')}
					/>
				</>
			)
			break
		case 3:
			StepUI = (
				<>
					<h2 className='text-3xl font-bold'>Setup complete!</h2>
					<p>Please restart the panel for the changes to take effect.</p>
				</>
			)
			break
	}

	return (
		<Card className='container mx-auto my-auto'>
			<CardHeader className='flex flex-col items-start gap-2'>
				<h1 className='text-2xl font-bold'>Setup CSS-Panel</h1>
			</CardHeader>

			<CardBody className='flex flex-col gap-4 p-6'>{StepUI}</CardBody>

			<CardFooter className='border-t relative flex items-center py-4 pt-6'>
				<Progress
					value={progress}
					className='absolute top-0 w-full right-0 left-0 h-1.5'
					classNames={{
						track: 'rounded-none',
					}}
					color='primary'
					size='sm'
					isStriped
				/>

				<Button
					onClick={nextStep}
					size='lg'
					isLoading={isLoading}
					color='primary'
					className='min-w-[200px] mx-auto'
					isDisabled={step === 3}
				>
					Continue
				</Button>
			</CardFooter>
		</Card>
	)
}

export default SetupPage
