import { Injectable } from '@nestjs/common';
import { ContentDocument, Content} from "./entities/content";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(Content.name)
        private contentModel: Model<ContentDocument>,
    ) {}

    async findAll(): Promise<Content[]> {
        return await this.contentModel.find().exec();
    }

    async findOneById(id: string): Promise<Content | null> {
        return await this.contentModel.findById(new Types.ObjectId(id)).exec();
    }

    create(content: Content): Promise<Content> {
        const createdContent = new this.contentModel(content);
        return createdContent.save();
    }
}
