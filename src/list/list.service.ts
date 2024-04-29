import { Injectable } from '@nestjs/common';

@Injectable()
export class ListService {
  getList(): string {
    return 'All list Here';
  }
}
