import { LogType, Logger } from "../services/logger";

export class CommonError extends Error {
    constructor(public message: string, public options?: ErrorOptions) {
        super(message, options);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, CommonError.prototype);

        Logger.error(this.fullstack || message, LogType.API);
    }

    get fullstack(): string | undefined {
        if (!this.stack) return;

        let result = `${this.stack}\n`;
        let cause = this.cause as Error | undefined;

        while (cause) {
            result += `Caused by: ${cause.stack}\n`;
            cause = cause.cause as Error | undefined;
        }

        return result;
    }
}
