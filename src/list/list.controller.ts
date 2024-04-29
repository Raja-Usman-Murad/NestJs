import { Controller, Get } from '@nestjs/common';
import { ListService } from './list.service';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('list')
  getlist(): string {
    return this.listService.getList();
  }
}
