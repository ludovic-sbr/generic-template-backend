/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
dotenv.config();

interface MainApiConfig {
  logsFolder: string;
  prod: boolean;
  apiPort: number;
  apiName: string;
  databaseUrl: string;
  jwtSecret: string;
}

export const config: MainApiConfig = {
  logsFolder: process.env.LOGS_FOLDER!,
  prod: process.env.NODE_ENV! === 'production',
  apiPort: Number(process.env.PORT!),
  apiName: process.env.API_NAME!,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
};
