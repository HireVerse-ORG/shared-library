import { UserRole } from "./userPayload";
import { AuthRequest } from "./userRequest";
import { Response, NextFunction, RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = ((req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.isTokenExpired) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    next();
}) as RequestHandler;

export function allowedRoles(...allowedRoles: UserRole[]): RequestHandler[] {
    return [
        isAuthenticated, 
        ((req: AuthRequest, res: Response, next: NextFunction) => {
            if (req.payload?.role && allowedRoles.includes(req.payload.role)) {
                return next();
            }

            if(req.payload?.isBlocked){
                return res.status(403).json({ message: 'You are blocked' });
            }

            return res.status(403).json({ message: 'Access denied' });
        }) as RequestHandler,
    ];
}