import { HttpException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './interfaces/list.interface';
import { errorResponse } from 'utils/error.message';
import { successResponse } from 'utils/success.message';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel('List') private readonly ListModel) {}

  async getAlllist() {
    try {
      const lists = await this.ListModel.find({});

      console.log(lists);
      return successResponse(lists, 200, 'list fetched successfully');
    } catch (error) {
      console.log(error);
      return errorResponse(400, error?.message ?? 'Server Error');
    }
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

  async findlist(id: string) {
    let list;
    try {
      list = await this.ListModel.findById(id).exec();
      return list || null;
    } catch (error) {
      return null;
    }
  }

  async getList(listId: string) {
    const list = await this.findlist(listId);
    if (!list) {
      return successResponse(null, 200, 'list not found');
    }
    return successResponse(list, 200, 'list found successfully');
  }

  async updateList(UpdateListDto: UpdateListDto, listId: string) {
    try {
      const list = await this.findlist(listId);
      if (!list) {
        return successResponse(null, 200, 'list not found');
      }
      const updatedList = await this.ListModel.findByIdAndUpdate(
        listId,
        UpdateListDto,
        {
          new: true,
          runValidators: true,
        },
      );
      return successResponse(updatedList, 200, 'list updated successfully');
    } catch (error) {
      console.log(error);
      return errorResponse(400, error?.message ?? 'Server Error');
    }
  }
}
