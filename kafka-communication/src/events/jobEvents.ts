import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface JobValidationMessage {
    job_id: string;
    user_id: string;
    company_id: string;
    title: string;
}

export interface JobStatusMessage {
    job_id: string;
    status: string;
    reason: string | null;
}

export interface JobJobPostAcceptedMessage {
    job_id: string;
    user_id: string;
    company_id: string;
    title: string;
}

export interface JobJobPostRejectedMessage {
    job_id: string;
    user_id: string;
    company_id: string;
    title: string;
    reason: string;
}

export function JobValidationRequestEvent(data: CustomMessage<JobValidationMessage>): ServerEvent<JobValidationMessage> {
    return {
        topic: KafkaTopics.JOB_VALIDATION_REQUESTED,
        message: data
    }
}

export function JobStatusUpdatedEvent(data: CustomMessage<JobStatusMessage>): ServerEvent<JobStatusMessage> {
    return {
        topic: KafkaTopics.JOB_STATUS_UPDATED,
        message: data
    }
}

export function JobPostAcceptedEvent(data: CustomMessage<JobJobPostAcceptedMessage>): ServerEvent<JobJobPostAcceptedMessage> {
    return {
        topic: KafkaTopics.JOB_POST_ACCEPTED,
        message: data
    }
}

export function JobPostRejectedEvent(data: CustomMessage<JobJobPostRejectedMessage>): ServerEvent<JobJobPostRejectedMessage> {
    return {
        topic: KafkaTopics.JOB_POST_REJECTED,
        message: data
    }
}
