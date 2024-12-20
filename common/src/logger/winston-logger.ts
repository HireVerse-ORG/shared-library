import winston from "winston";
import LogstashTransport  from "winston-logstash/lib/winston-logstash-latest.js";

export const createLogger = (level: string, logstash = {host: 'localhost', port: 5044}) => {
    return winston.createLogger({
        level: level,
        transports: [
            new winston.transports.Console(),
            new LogstashTransport({
                ...logstash,
                maxConnectRetries: 3,
                retryInterval: 5000,
                serializer: winston.format.json()
            }),
        ],
    });
};

export const customLogger = createLogger('info');