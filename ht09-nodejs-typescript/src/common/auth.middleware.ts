import {IMiddleware} from "./interface/middleware.interface";
import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

export class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {
    }

    execute(req: Request, res: Response, next: NextFunction): void {
        if (req.headers.authorization) {
            verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
                console.log(payload);
                if (err) {
                    next();
                } else if (payload) {
                    if (typeof payload === "string") {
                        req.user = payload;
                    }
                    next();
                }
            });
        }
        next();
    }
}
