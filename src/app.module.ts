import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './list/list.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ListModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/listcrudnest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
