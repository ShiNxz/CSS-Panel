module.exports = {
	apps: [
		{
			name: 'CSSPanel',
			exec_mode: 'cluster',
			instances: '1', // Or a number of instances
			script: 'npm start -p 3333',
			args: 'start',
			autorestart: true,
			watch: true,
			ignore_watch: ['node_modules', 'logs', '.git'], // Add more directories or files as needed
		},
	],
}
