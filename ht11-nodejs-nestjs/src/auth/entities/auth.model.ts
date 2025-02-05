import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class AuthModel {
    @Prop({ required: true })
    login: string;
    @Prop({ required: true })
    password: string;
}

export type AuthDocument = AuthModel & Document;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
