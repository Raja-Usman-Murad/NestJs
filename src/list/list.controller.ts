import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ListService } from './list.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateListDto } from './dto/create-list.dto';

@Controller('list')
@ApiTags('List APIs')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getlist(): string {
    return this.listService.getList();
  }

  @Post()
  @ApiOperation({
    summary: 'create list',
    description: 'Create a new list',
  })
  @ApiResponse({
    status: 200,
    description: `MESSAGE.USER_REG_SUCCESS`,
  })
  @ApiResponse({
    status: 404,
    description: `MESSAGE.BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `MESSAGE.DB_OPERATION_FAILED`,
  })
  async createList(@Body() CreateListDto: CreateListDto) {
    return await this.listService.createList(CreateListDto);
  }
}
