import {Request, Response, NextFunction, request} from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import {IUser} from "../modules/models/user.model";

export const admin = (request: Request, response: Response, next: NextFunction) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'];

    if(token && typeof token === 'string'){
        if(token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        try {
            jwt.verify(token, config.JwtSecret, (error, decoded) => {
                const user: IUser = decoded as IUser;

                if(!user.isAdmin) {
                    return response.status(403).send('Access denied. You are not an admin.')
                }
                next();
            });
        } catch (ex) {
            return response.status(400).send('Invalid token.')
        }
    } else {
        return response.status(401).send('Access denied. No token provided.')
    }
}
