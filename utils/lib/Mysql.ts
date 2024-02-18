import { createPool } from 'mysql2/promise'
import CheckENV from './Env'

CheckENV()

const db = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: parseInt(process.env.DB_PORT || '3306'),
})

let isReady = false

db.on('connection', async (connection) => {
	if (isReady) return
	isReady = true

	console.log(`[DB] Connected to database`)

	try {
		connection.query(
			`CREATE TABLE IF NOT EXISTS \`${process.env.DB_DATABASE}\`.\`cssp_settings\` (\`key\` VARCHAR(500) NOT NULL , \`value\` TEXT NOT NULL , \`lastChange\` DATE NOT NULL , PRIMARY KEY (\`key\`)) ENGINE = InnoDB;`
		)

		connection.query(
			`CREATE TABLE IF NOT EXISTS \`${process.env.DB_DATABASE}\`.\`cssp_logs\` (\`id\` INT NOT NULL AUTO_INCREMENT , \`title\` TEXT NOT NULL , \`message\` TEXT NOT NULL , \`aid\` int(11) NULL DEFAULT NULL, \`time\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (\`id\`)) ENGINE = InnoDB;`
		)

		connection.query(
			`CREATE TABLE IF NOT EXISTS \`${process.env.DB_DATABASE}\`.\`sa_admins_groups\` (\`id\` VARCHAR(50) NOT NULL, \`name\` TEXT NOT NULL , \`flags\` TEXT NOT NULL , \`immunity\` varchar(64) NOT NULL DEFAULT '0' ,\`created\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE = InnoDB;`
		)
	} catch (err) {
		console.error(`[DB] Error while creating tables: ${err}`)
	}
})

export default db
