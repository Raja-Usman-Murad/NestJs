import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { log } from 'console';

@Injectable()
export class ListService {
  getList(): string {
    return 'All list Here';
  }
  createList(CreateListDto: CreateListDto) {
    // Here create new entry in database and return the data
    return 'List is created successfully';
  }
}
