import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface JobAppliedMessage {
    user_id: string;
    job_application_id: string;
}

export interface JobApplicationRejectedMessage {
    user_id: string;
    job_application_id: string;
    reason: string;
}

export function JobAppliedEvent(data: CustomMessage<JobAppliedMessage>): ServerEvent<JobAppliedMessage> {
    return {
        topic: KafkaTopics.JOB_APPLIED,
        message: data
    }
}

export function JobAppliedAccepted(data: CustomMessage<JobAppliedMessage>): ServerEvent<JobAppliedMessage> {
    return {
        topic: KafkaTopics.JOB_APPLICATION_ACCEPTED,
        message: data
    }
}

export function JobAppliedRejected(data: CustomMessage<JobApplicationRejectedMessage>): ServerEvent<JobApplicationRejectedMessage> {
    return {
        topic: KafkaTopics.JOB_APPLICATION_REJECTED,
        message: data
    }
}