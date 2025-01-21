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
