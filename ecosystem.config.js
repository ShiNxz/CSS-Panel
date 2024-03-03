module.exports = {
	apps: [
		{
			name: 'CSSPanel',
			exec_mode: 'cluster',
			instances: '1', // Or a number of instances
			script: 'pnpm start -p 3333',
			autorestart: true,
			watch: true,
			ignore_watch: ['node_modules', 'logs', '.git'], // Add more directories or files as needed
		},
	],
}
