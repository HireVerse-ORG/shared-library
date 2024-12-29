import { BasePayload } from "../TokenService";

export type UserRole = "admin" | "seeker" | "company";

export interface UserPayload extends BasePayload {
    userId: string;
    role: UserRole;
    isVerified: boolean;
    isBlocked: boolean;
}
