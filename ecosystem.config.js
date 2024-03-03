module.exports = {
	apps: [
		{
			name: 'CSSPanel',
			exec_mode: 'cluster',
			instances: '1', // Or a number of instances
			script: 'node_modules/next/dist/bin/next -p 3333',
			args: 'start',
			autorestart: true,
			watch: true,
			ignore_watch: ['node_modules', 'logs', '.git'], // Add more directories or files as needed
		},
	],
}
