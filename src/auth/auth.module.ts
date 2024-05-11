import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthsSchema } from './schemas/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthsSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
