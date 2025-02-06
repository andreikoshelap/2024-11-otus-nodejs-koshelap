import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import {Content, ContentSchema} from "./entities/content";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Content.name, schema: ContentSchema },
        ]),
    ],
  providers: [ContentService],
  controllers: [ContentController],
    exports: [ContentService],
})
export class ContentModule {}
