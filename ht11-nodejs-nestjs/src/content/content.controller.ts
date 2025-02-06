import {Body, Controller, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import {ContentService} from "./content.service";
import {Content} from "./entities/content";

@Controller('content')
export class ContentController {

    constructor(private readonly contentService: ContentService) {}

    @Post()
    create(@Body() content: Content): Promise<Content> {
        return this.contentService.create(content);
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Content> {
        const content = await this.contentService.findOneById(id);

        if (!content) {
            throw new NotFoundException(`Content with ID ${id} not found`);
        }
        return content;
    }

    @Get()
    async getAll(): Promise<Content[]> {
        return await this.contentService.findAll();
    }
}
