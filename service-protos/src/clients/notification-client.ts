import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../protoLoader";


const notificationProto = loadProto('notification/notification.proto');

export default function geClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new notificationProto.notification.NotificationService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting notification service client at ${url}: ${error}`);
    }
};