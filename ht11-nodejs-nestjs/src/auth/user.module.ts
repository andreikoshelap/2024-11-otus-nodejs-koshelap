import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export interface UserModel {
}

@Schema()
export class UserModel {
    @Prop({unique: true})
    email: string;

    @Prop()
    passwordHash: string;
}

export type UserDocument = UserModel & Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);
