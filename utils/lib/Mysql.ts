import { createPool } from 'mysql2/promise'
import './Console'

const db = createPool({
	host: process.env.DB_HOST || '',
	user: process.env.DB_USER || '',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || '',
	port: parseInt(process.env.DB_PORT || '3306'),
})

export let isReady = !!process.env.DB_HOST
export let alter = false

db.on('connection', async (connection) => {
	if (alter) return
	alter = true

	debug(`[DB] Connected to database`)

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

		connection.query(
			`ALTER TABLE \`${process.env.DB_DATABASE}\`.\`sa_mutes\` ADD COLUMN IF NOT EXISTS \`unmute_reason\` TEXT NULL DEFAULT NULL AFTER \`reason\`, ADD COLUMN IF NOT EXISTS \`comment\` TEXT NULL DEFAULT NULL AFTER \`unmute_reason\`;`
		)

		connection.query(
			`ALTER TABLE \`${process.env.DB_DATABASE}\`.\`sa_bans\` ADD COLUMN IF NOT EXISTS \`unban_reason\` TEXT NULL DEFAULT NULL AFTER \`reason\`, ADD COLUMN IF NOT EXISTS \`comment\` TEXT NULL DEFAULT NULL AFTER \`unban_reason\`;`
		)

		connection.query(
			`ALTER TABLE \`sa_mutes\` CHANGE \`type\` \`type\` ENUM('GAG','MUTE','SILENCE','') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'GAG';`
		)
	} catch (err) {
		error(`[DB] Error while creating tables: ${err}`)
	}
})

export default db
