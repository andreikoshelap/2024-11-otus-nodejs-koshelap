import {Exercise} from "../execsice.entity";
import {ExerciseDto} from "../dto/exercise.dto";


export interface IUserService {
	createExercise: (dto: ExerciseDto) => Promise<Exercise | null>;
	updateExercise: (dto: ExerciseDto) => Promise<Exercise | null>;
}
