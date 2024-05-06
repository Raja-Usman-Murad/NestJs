import { HttpException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './interfaces/list.interface';
import { errorResponse } from 'utils/error.message';
import { successResponse } from 'utils/success.message';

@Injectable()
export class ListService {
  constructor(@InjectModel('List') private readonly ListModel) {}
  getList(): string {
    return 'All list Here';
  }
  async createList(CreateListDto: CreateListDto) {
    try {
      const createdList = new this.ListModel({
        title: CreateListDto.title,
        description: CreateListDto.description,
        email: CreateListDto.email,
        createdAt: new Date().getTime(),
      });
      const savedCreatedList = await createdList.save();
      console.log(savedCreatedList, 'savedCreatedList');

      return successResponse(
        savedCreatedList,
        201,
        'list created successfully',
      );
    } catch (error) {
      console.log(error);
      return errorResponse(400, error?.message ?? 'Server Error');
    }
  }
}
