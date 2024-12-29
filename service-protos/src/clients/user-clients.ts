import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../protoLoader";

const userProto = loadProto('user/user.proto');

export function getUserServiceClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new userProto.user.UserService(
            url,
            credentials
        );

        return client;        
    }

    catch (error) {
        throw new Error(`Error connecting user service client at ${url}: ${error}`);
    }
};