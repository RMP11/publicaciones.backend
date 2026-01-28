import * as dotenv from 'dotenv';

dotenv.config({ path: './test/.env.e2e' });

console.log('DATABASE_URL:', process.env.DATABASE_URL);
