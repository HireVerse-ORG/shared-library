import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../protoLoader";


const profileProto = loadProto('profile/profile.proto');

export function SeekerProfileClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new profileProto.profile.SeekerProfileService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting profile service client at ${url}: ${error}`);
    }
};

export function CompanyProfileClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new profileProto.profile.CompanyProfileService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting profile service client at ${url}: ${error}`);
    }
};

export function FollowerClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new profileProto.profile.FollowerService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting profile service client at ${url}: ${error}`);
    }
};