import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsSchema } from './schemas/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'List', schema: ListsSchema }])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
