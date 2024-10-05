import pkg from 'pg';
import { config } from 'dotenv';

const { Pool } = pkg;
config(); 
let pool;

// if (process.env.DEVELOPMENT === "true") {
// }
pool = new Pool({
    user: 'franco',
    host: 'localhost',         
    database: process.env.DB,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: 5432,
})

// else {
//     const connectionString = process.env.DATABASE_URL;
    
//     pool = new Pool({
//         connectionString: connectionString
//     });
// }

export default pool;
