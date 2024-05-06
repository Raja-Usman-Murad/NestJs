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
  @ApiOperation({
    summary: 'Get full list',
    description: 'Get a full list of lists',
  })
  @ApiResponse({
    status: 200,
    description: `Lists fetched successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `MESSAGE.BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `MESSAGE.DB_OPERATION_FAILED`,
  })
  getAlllist() {
    return this.listService.getAlllist();
  }

  @Post()
  @ApiOperation({
    summary: 'Create new list',
    description: 'Create a new list',
  })
  @ApiResponse({
    status: 201,
    description: `List created successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `DB_OPERATION_FAILED`,
  })
  async createList(@Body() CreateListDto: CreateListDto) {
    return await this.listService.createList(CreateListDto);
  }
}
