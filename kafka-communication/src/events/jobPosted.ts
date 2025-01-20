import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface JobPostedMessage {
    job_id: string;
    user_id: string;
    company_id: string;
    title: string;
}

export default function JobPostedEvent(data: CustomMessage<JobPostedMessage>): ServerEvent<JobPostedMessage> {
    return {
        topic: KafkaTopics.JOB_POSTED,
        message: data
    }
}