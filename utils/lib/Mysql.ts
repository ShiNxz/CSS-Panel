import { createPool } from 'mysql2/promise'

const db = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: parseInt(process.env.DB_PORT || '3306'),
})

export default db
