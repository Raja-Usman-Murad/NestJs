import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { UpdateListDto } from './dto/update-list.dto';

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

  @Get('/:id')
  @ApiOperation({
    summary: 'Get specific list',
    description: 'Get a specific list',
  })
  @ApiResponse({
    status: 200,
    description: `List fetched successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `MESSAGE.BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `MESSAGE.DB_OPERATION_FAILED`,
  })
  getList(@Param('id') id: string) {
    console.log(id, 'id');
    return this.listService.getList(id);
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

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update list',
    description: 'Update an existing list',
  })
  @ApiResponse({
    status: 200,
    description: `List updated successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `DB_OPERATION_FAILED`,
  })
  async updateList(
    @Body() UpdateListDto: UpdateListDto,
    @Param('id') id: string,
  ) {
    return await this.listService.updateList(UpdateListDto, id);
  }
}
