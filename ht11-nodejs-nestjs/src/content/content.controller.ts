import {Body, Controller, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import {ContentService} from "./content.service";
import {ContentModel} from "./entities/content.model";

@Controller('content')
export class ContentController {

    constructor(private readonly contentService: ContentService) {}

    @Post()
    create(@Body() content: ContentModel): Promise<ContentModel> {
        return this.contentService.create(content);
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<ContentModel> {
        const content = await this.contentService.findOneById(id);

        if (!content) {
            throw new NotFoundException(`Content with ID ${id} not found`);
        }
        return content;
    }

    @Get()
    async getAll(): Promise<ContentModel[]> {
        return await this.contentService.findAll();
    }
}
