import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../protoLoader";


const jobProto = loadProto('job/job.proto');

export function JobskillServiceClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new jobProto.job.SkillService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting job skill service client at ${url}: ${error}`);
    }
};

export function JobsInterviewServiceClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new jobProto.job.InterviewService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting jobs interview service client at ${url}: ${error}`);
    }
};