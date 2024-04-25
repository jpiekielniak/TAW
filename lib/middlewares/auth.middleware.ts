import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';

export const auth = (request: Request, response: Response, next: NextFunction) => {
    let token = request.headers['x-access-token'] || request.headers.authorization;
    console.log(token);
    if (token && typeof token === "string") {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        try {
            jwt.verify(token, config.JwtSecret);
            next();
        } catch (ex) {
            return response.status(400).send('Invalid token.')
        }
    } else {
        return response.status(401).send('Access denied. No token provided.')
    }
}

