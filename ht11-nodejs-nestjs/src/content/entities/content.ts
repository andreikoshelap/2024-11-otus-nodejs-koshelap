import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";

@Schema()
export class Content {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    body: string;
    @Prop({ required: true })
    published: boolean;
}

export type ContentDocument = Content & Document;
export const ContentSchema = SchemaFactory.createForClass(Content);
