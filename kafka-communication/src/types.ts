import { IHeaders } from "kafkajs";
import { KafkaTopics } from "./events/topics";

export interface CustomMessage<T = string> {
    key: string;
    value: T;
    headers?: IHeaders;
    partition?: number;
    timestamp?: string;
};

export interface ServerEvent<T = any> {
    topic: KafkaTopics,
    message: CustomMessage<T>
}