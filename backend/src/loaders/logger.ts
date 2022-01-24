import winston, { format } from 'winston';
import config, { isProduction } from '@config';

const { combine, timestamp, printf, simple, cli } = format;

const productionLogOutput = printf(
	({ level, message, time }: { level: string; message: string; time: string }) => `${time} - ${level.toUpperCase()}: ${message}`
);

const stageOptions = {
	production: {
		format: combine(timestamp({ format: 'MM/DD HH:mm' }), productionLogOutput),
		transports: [new winston.transports.Console({ level: 'warn' })]
	},
	development: {
		format: simple(),
		transports: [new winston.transports.Console({ format: cli() })]
	}
};

const logger = winston.createLogger({
	level: config.logs.level,
	exitOnError: false,
	format: isProduction ? stageOptions.production.format : stageOptions.development.format,
	transports: [
		...stageOptions[isProduction ? 'production' : 'development'].transports,
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'general.log' })
	]
});

export default logger;
