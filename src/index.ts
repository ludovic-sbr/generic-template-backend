import { resolve } from "path";
import { LogType, Logger } from "./common/services/logger";
import { apiBuilder } from "./api/APIBuilder";


// LOGGER CONFIGURATION ----------
Logger.configure((type) => {
    if (type === LogType.API) return 'api.log';
    if (type === LogType.BUSINESS) return 'business.log';
    return 'other.log';
});

Logger.setModule("CORE");

Logger.setFolder(resolve(process.env.LOGS_FOLDER!, String(Date.now())));

if (Logger.isConfigured()) Logger.info("Logging system set up.", LogType.API);


// API RUN ------------------------
apiBuilder.build();