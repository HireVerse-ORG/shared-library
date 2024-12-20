import winston from "winston";
import LogstashTransport from "winston-logstash/lib/winston-logstash-latest.js";

export const createLogger = (level: string, enableLogstash: boolean, logstash = {host: 'localhost', port: 5044}) => {
    const transports = [
        new winston.transports.Console(),
    ];

    if (enableLogstash) {
        transports.push(new LogstashTransport({
            ...logstash,
            maxConnectRetries: 3,
            retryInterval: 5000,
            serializer: winston.format.json()
        }));
    }

    return winston.createLogger({
        level: level,
        transports: transports,
    });
};

export const customLogger = createLogger('info', false);