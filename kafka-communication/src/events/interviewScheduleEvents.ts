import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

interface InterviewScheduleMessage {
    id: string;       
    job: string;
    application: string;
    applicantId: string;
    interviewerId: string;
    scheduledTime: Date;
    type: string;
    timestamp: Date;   
}

export interface InterviewScheduledMessage extends InterviewScheduleMessage{}
export interface InterviewScheduleAcceptedMessage extends InterviewScheduleMessage{}
export interface InterviewScheduleRejectedMessage extends InterviewScheduleMessage{}
export interface InterviewScheduleCancelledMessage extends InterviewScheduleMessage{}

export function InterviewScheduledEvent(data: CustomMessage<InterviewScheduledMessage>): ServerEvent<InterviewScheduledMessage> {
    return {
        topic: KafkaTopics.INTERVIEW_SCHEDULED,
        message: data
    }
}

export function InterviewScheduleAcceptedEvent(data: CustomMessage<InterviewScheduleAcceptedMessage>): ServerEvent<InterviewScheduleAcceptedMessage> {
    return {
        topic: KafkaTopics.INTERVIEW_SCHEDULE_ACCEPTED,
        message: data
    }
}

export function InterviewScheduleRejectedEvent(data: CustomMessage<InterviewScheduleRejectedMessage>): ServerEvent<InterviewScheduleRejectedMessage> {
    return {
        topic: KafkaTopics.INTERVIEW_SCHEDULE_REJECTED,
        message: data
    }
}

export function InterviewScheduleCancelledEvent(data: CustomMessage<InterviewScheduleCancelledMessage>): ServerEvent<InterviewScheduleCancelledMessage> {
    return {
        topic: KafkaTopics.INTERVIEW_SCHEDULE_CANCELLLED,
        message: data
    }
}