import { NextFunction, Request, Response } from 'express';

export interface ICourseController {
	new: (req: Request, res: Response, next: NextFunction) => void;
	update: (req: Request, res: Response, next: NextFunction) => void;
}
