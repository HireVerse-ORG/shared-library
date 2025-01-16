import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../protoLoader";

const paymentProto = loadProto('payment/payment.proto');

export function SeekerPaymentClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new paymentProto.payment.SeekerPaymentService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting Seeker PaymentClient service client at ${url}: ${error}`);
    }
};

export function CompanyPaymentClient(url: string, credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()) {
    try {
        const client = new paymentProto.payment.CompanyPaymentService(
            url,
            credentials
        );

        return client;
    }
    catch (error) {
        throw new Error(`Error connecting Seeker PaymentClient service client at ${url}: ${error}`);
    }
};