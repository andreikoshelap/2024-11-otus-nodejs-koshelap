import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";

@Schema()
export class ContentModel {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    body: string;
    @Prop({ required: true })
    published: boolean;
}

export type ContentDocument = ContentModel & Document;
export const ContentSchema = SchemaFactory.createForClass(ContentModel);
