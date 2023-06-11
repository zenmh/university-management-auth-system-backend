import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DB_URL,
  student_default_password: process.env.STUDENT_DEFAULT_PASS,
};
