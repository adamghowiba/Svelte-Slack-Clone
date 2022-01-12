import { parseTime } from '@utils/dateUtils';

type ILevelOptions = {
	[Prop in LogLevel]?: LevelOptions;
};

interface LogPrefix {
	color: string;
	margin?: string;
}

interface LevelOptions {
	color?: string;
	prefix?: LogPrefix | false;
	underline?: boolean;
	spaced?: boolean;	
}

interface LogOptions extends ILevelOptions {
	date: boolean;
}

type LogLevel = keyof typeof logLevels;

const logLevels = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3
};

const logOptions: LogOptions = {
	date: false,
	debug: {
		color: '#4C91E8',
		spaced: true,
	},
	info: {
		prefix: {
			color: 'tan'
		},
		color: '#CDCDCD'
	},
	error: {
		color: 'tan',
		prefix: {
			color: 'coral'
		}
	},
	warn: {
		color: 'lightyellow',
		prefix: {
			color: 'yellow'
		}
	}
};

class logger {
	private level: LogLevel;
	date: boolean;
	formattedDate: string;
	options: LogOptions;

	constructor(maxLevel: LogLevel, options: LogOptions = logOptions) {
		this.date = options.date;
		this.level = maxLevel;
		this.formattedDate = parseTime(new Date());
		this.options = options;
	}

	/**
	 * Check if the level is allowed to be logged ti the console.
	 *
	 * @param {number} logLevel The numerical log level value
	 * @returns {boolean} If the level is above the minimum logging level
	 */
	private levelSilenced(logLevel: number): boolean {
		return logLevel < logLevels[this.level];
	}

	/**
	 * Adds a prefix to logged messages
	 *
	 * @param {LogLevel} level log level to be prefixed
	 * @returns {string} Prefix string attached to the log level
	 */
	private prefix(level: LogLevel): string {
		return `%c[${level.toUpperCase()}]%c ${this.date ? ' [' + this.formattedDate + ']' : ''}`;
	}

	/**
	 * Formats the style paramters based on the log's config
	 *
	 * @param {LogLevel} level log level to be prefixed
	 * @param {LevelOptions} options Custom logging options
	 * @returns {unknown[]} Array of options to be attached to the console
	 */
	private formatStyle(level: LogLevel, options?: LevelOptions): unknown[] {
		const defaultOptions = !options ? this.options[level] : { ...this.options[level], ...options };
		const optionsString = [];
		let argCount = 0;

		if (defaultOptions.prefix instanceof Object) {
			optionsString[argCount++] = `color: ${defaultOptions.prefix.color};`;
		}
		optionsString[argCount] = `padding: 1px 0;`;
		if (defaultOptions.underline) optionsString[argCount] = `border-bottom: 1px solid white; padding: 2px 0; margin: 10px 3px;`;
		if (defaultOptions.color) optionsString[argCount] += `color: ${defaultOptions.color};`;
		if (defaultOptions.spaced) optionsString[argCount] += `margin: 10px 0;`;

		return optionsString;
	}

	/**
	 * Formats the string message to allow for Object types
	 *
	 * @param {unknown[]} message Array of messages. Can be any type
	 * @param level
	 * @returns
	 */
	private constructMessage(message: unknown[], level: LogLevel): { message: unknown[]; objects: unknown[] } {
		const objects = [];
		message = [logOptions[level].prefix ? `${this.prefix(level)}` : '%c', ...message];

		return {
			message: message.map((message, i) => {
				if (message instanceof Object) {
					objects.push(message);
					message = '\n%o';
				}
				if (i > 0) message = message + ' ';
				return message;
			}),
			objects
		};
	}

	format(options: LevelOptions, message: string) {
		console.info(`%c[INFO] %c${message}`, `color: #33CE33`, this.formatStyle('info', options));
	}

	log(level: LogLevel, message: unknown[], options?: LogOptions) {
		if (this.levelSilenced(logLevels[level])) return;

		const messageConstruct = this.constructMessage(message, level);

		console.info(messageConstruct.message.join(''), ...this.formatStyle(level), ...messageConstruct.objects);
	}

	debug(...message: unknown[]) {
		return this.log('debug', message);
	}

	info(...message: unknown[]) {
		return this.log('info', message);
	}

	warn(...message: unknown[]) {
		return this.log('warn', message);
	}

	error(...message: unknown[]) {
		return this.log('error', message);
	}
}

const log = new logger('debug');

export { log };
