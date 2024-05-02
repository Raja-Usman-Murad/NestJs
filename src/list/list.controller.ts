import { Controller, Get } from '@nestjs/common';
import { ListService } from './list.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('list')
@ApiTags('List APIs')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getlist(): string {
    return this.listService.getList();
  }
}
