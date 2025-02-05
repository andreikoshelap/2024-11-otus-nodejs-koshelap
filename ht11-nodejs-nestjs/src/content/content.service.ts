import { Injectable } from '@nestjs/common';
import { ContentDocument, ContentModel} from "./entities/content.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(ContentModel.name)
        private contentModel: Model<ContentDocument>,
    ) {}

    async findAll(): Promise<ContentModel[]> {
        return await this.contentModel.find().exec();
    }

    async findOneById(id: string): Promise<ContentModel | null> {
        return await this.contentModel.findById(new Types.ObjectId(id)).exec();
    }

    create(content: ContentModel): Promise<ContentModel> {
        const createdContent = new this.contentModel(content);
        return createdContent.save();
    }
}
