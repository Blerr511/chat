import { UserInterface } from 'interfaces/RequestWithUser.interface';

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
            response?: object;
            fileKey?: string;
        }
    }
}
