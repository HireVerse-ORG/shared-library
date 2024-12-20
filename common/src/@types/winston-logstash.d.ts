import winston from "winston";

declare module 'winston-logstash/lib/winston-logstash-latest.js' {
    import TransportStream from "winston-transport";

    interface LogstashTransportOptions {
        host: string;
        port: number;
        maxConnectRetries?: number;
        retryInterval?: number;
        serializer?: winston.Logform.Format;
    }

    class LogstashTransport extends TransportStream {
        constructor(options: LogstashTransportOptions);
    }

    export = LogstashTransport;
}
