import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface UserCreatedMessage {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    timeStamp: Date;
}

export function UserCreatedEvent(data: CustomMessage<UserCreatedMessage>): ServerEvent<UserCreatedMessage> {
    return {
        topic: KafkaTopics.USER_CREATED,
        message: data
    }
}