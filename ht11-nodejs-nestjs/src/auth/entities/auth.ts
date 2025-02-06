import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Auth {
    @Prop({ required: true })
    login: string;
    @Prop({ required: true })
    password: string;
}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);
