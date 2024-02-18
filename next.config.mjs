import packageJson from './package.json' assert { type: 'json' }

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.steamstatic.com',
			},
		],
	},
	env: {
		version: packageJson.version,
	},
}

export default nextConfig
