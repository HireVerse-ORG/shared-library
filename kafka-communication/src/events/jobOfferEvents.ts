import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

interface JobOfferMessage {
    job_application_id: string;
    job_id: string;
    applicantId: string;
    compnayId: string;
    timestamp: Date;   
}

export interface JobOfferedMessage extends JobOfferMessage {
}

export interface JobOfferAcceptedMessage extends JobOfferMessage {
}

export interface JobOfferRejectedMessage extends JobOfferMessage {
}

export function JobOfferedEvent(data: CustomMessage<JobOfferedMessage>): ServerEvent<JobOfferedMessage> {
    return {
        topic: KafkaTopics.JOB_OFFERED,
        message: data
    }
}

export function JobOfferAcceptedEvent(data: CustomMessage<JobOfferAcceptedMessage>): ServerEvent<JobOfferAcceptedMessage> {
    return {
        topic: KafkaTopics.JOB_OFFER_ACCEPTED,
        message: data
    }
}

export function JobOfferRejectedEvent(data: CustomMessage<JobOfferRejectedMessage>): ServerEvent<JobOfferRejectedMessage> {
    return {
        topic: KafkaTopics.JOB_OFFER_REJECTED,
        message: data
    }
}