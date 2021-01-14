import { Request } from 'express';

export type UserInterface = {
    username: string;
    _id: string;
};

export interface RequestWithUser extends Request {
    user: UserInterface;
}
