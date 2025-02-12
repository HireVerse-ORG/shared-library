import { CustomMessage, ServerEvent } from "../types";
import { KafkaTopics } from "./topics";

export interface FollowRequestedMessage {
    requestId: string;       
    followerId: string,
    followerUserType: string;
    followedUserId: string;
    followedUserType: string;
    timestamp: Date;   
}
export interface FollowRequestAcceptedMessage {
    requestId: string;       
    followerId: string,
    followerUserType: string;
    followedUserId: string;
    followedUserType: string;    
    timestamp: Date;   
}
export interface FollowRequestRejectedMessage {
    requestId: string;       
    followerId: string,
    followerUserType: string;
    followedUserId: string;
    followedUserType: string;   
    timestamp: Date;   
}

export function FollowRequestedEvent(data: CustomMessage<FollowRequestedMessage>): ServerEvent<FollowRequestedMessage> {
    return {
        topic: KafkaTopics.FOLLOW_REQUESTED,
        message: data
    }
}

export function FollowRequestAcceptedEvent(data: CustomMessage<FollowRequestAcceptedMessage>): ServerEvent<FollowRequestAcceptedMessage> {
    return {
        topic: KafkaTopics.FOLLOW_ACCEPTED,
        message: data
    }
}

export function FollowRequestRejectedEvent(data: CustomMessage<FollowRequestRejectedMessage>): ServerEvent<FollowRequestRejectedMessage> {
    return {
        topic: KafkaTopics.FOLLOW_REJECTED,
        message: data
    }
}

