import { NextFunction, Request, Response } from 'express';

export interface IExerciseController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	update: (req: Request, res: Response, next: NextFunction) => void;
}
