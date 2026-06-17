import { Controller, Post, Body } from '@nestjs/common';
import { DemoRequestsService } from './demo-requests.service';
import { CreateDemoRequestDto } from './dto/create-demo-request.dto';

@Controller('demo-requests')
export class DemoRequestsController {
    constructor(private readonly demoRequestsService: DemoRequestsService) { }

    @Post()
    create(@Body() createDemoRequestDto: CreateDemoRequestDto) {
        return this.demoRequestsService.create(createDemoRequestDto);
    }
}
