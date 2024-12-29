import { PayloadRequest } from "../TokenService";
import { UserPayload } from "./userPayload";

export interface AuthRequest extends PayloadRequest<UserPayload>{}
