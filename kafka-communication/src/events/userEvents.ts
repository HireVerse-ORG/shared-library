import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface UserCreatedMessage {
    id: string;
    email: string;
    fullName: string;
}

export function UserCreatedEvent(data: CustomMessage<UserCreatedMessage>): ServerEvent<UserCreatedMessage> {
    return {
        topic: KafkaTopics.USER_CREATED,
        message: data
    }
}