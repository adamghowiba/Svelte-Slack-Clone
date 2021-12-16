import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const isProduction = process.env.NODE_ENV == 'production';
export const isDevelopment = process.env.NODE_ENV == 'development';

export default {
    port: parseInt(process.env.PORT, 10),
    nodeEnv: process.env.NODE_ENV,
    databaseURL: process.env.DATABASE_URL,
    shadowDatabseUrl: process.env.SHADOW_DATABASE_URL,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
}