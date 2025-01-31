import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface JobAppliedMessage {
    user_id: string;
    job_application_id: string;
}

export interface JobApplicationViewedMessage {
    viewer_user_id: string;
    applicant_id: string;
    job_application_id: string;
}

export interface JobApplicationViewUpdatedMessage {
    viewer_user_id: string;
    applicant_id: string;
    job_application_id: string;
}

export interface JobApplicationRejectedMessage {
    user_id: string;
    job_application_id: string;
    reason: string;
}

export interface ResumeCommentMessage {
    commenter_user_id: string;
    job_application_id: string;
    applicant_user_id: string;
    comment: string;
    title: string;
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

export function JobApplicationViewedEvent(data: CustomMessage<JobApplicationViewedMessage>): ServerEvent<JobApplicationViewedMessage> {
    return {
        topic: KafkaTopics.JOB_APPLICATION_VIEWED,
        message: data
    }
}

export function JobApplicationViewUpdatedEvent(data: CustomMessage<JobApplicationViewUpdatedMessage>): ServerEvent<JobApplicationViewUpdatedMessage> {
    return {
        topic: KafkaTopics.JOB_APPLICATION_VIEW_UPDATED,
        message: data
    }
}

export function ResumeCommentEvent(data: CustomMessage<ResumeCommentMessage>): ServerEvent<ResumeCommentMessage> {
    return {
        topic: KafkaTopics.RESUME_COMMENTED,
        message: data
    }
}