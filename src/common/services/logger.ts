import { appendFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface Logger {
    setFolder(folder: string): void;
    setModule(module?: string): void;
    configure(fn: (type: LogType) => string): LoggerConfig[];
    isConfigured(): boolean;
    info(message: any, type: LogType): void;
    error(message: any, type: LogType): void;
    warn(message: any, type: LogType): void;
    debug(message: any, type: LogType): void;
}

export enum LogType {
    API,
    BUSINESS,
}

interface LoggerConfig {
    logType: LogType;
    fileName: string;
}

export class _FileLogger implements Logger {
    private logConfig: LoggerConfig[] = [];
    private logFolder: string | undefined;
    private module: string = 'GENERIC';
    private types: LogType[] = [LogType.API, LogType.BUSINESS];

    configure(fn: (type: LogType) => string): LoggerConfig[] {
        this.logConfig = this.types.map((type: LogType) => ({
            logType: type,
            fileName: fn(type),
        }));

        return this.logConfig;
    }

    isConfigured(): boolean {
        return !!this.logConfig.length;
    }

    setModule(module?: string) {
        this.module = module || 'GENERIC';
    }

    setFolder(folder: string): void {
        try {
            mkdirSync(folder, { recursive: true });
            this.logFolder = folder;
        } catch (err) {
            console.log(
                this.error(
                    'An error has occured during log file generation. Logs : ',
                    LogType.BUSINESS
                )
            );
            console.log(err);
        }
    }

    log(message: any, type: LogType, level: string) {
        const log = `${this.formatTodayDateTime()} [${level}] Mod.${this.module} : ${message} \n`;

        if (!this.logFolder) console.log(log);

        const config = this.logConfig.find((log) => log.logType === type);

        if (!this.logFolder || !config) return;

        appendFileSync(join(this.logFolder, config.fileName), log);
    }

    formatTodayDateTime(): string {
        var tzoffset = new Date().getTimezoneOffset() * 60000;
        var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
        return localISOTime.replace(/T/, ' ').replace(/\..+/, '');
    }

    info(message: any, type: LogType) {
        this.log(message, type, 'INFO');
    }

    error(message: any, type: LogType) {
        this.log(message, type, 'ERROR');
    }

    warn(message: any, type: LogType) {
        this.log(message, type, 'WARN');
    }

    debug(message: any, type: LogType) {
        this.log(message, type, 'DEBUG');
    }
}
export const Logger: Logger = new _FileLogger();