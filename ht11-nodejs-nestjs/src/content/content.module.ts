import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import {ContentModel, ContentSchema} from "./entities/content.model";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ContentModel.name, schema: ContentSchema },
        ]),
    ],
  providers: [ContentService],
  controllers: [ContentController]
})
export class ContentModule {}
