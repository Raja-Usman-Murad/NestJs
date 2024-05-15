import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
@ApiTags('Auth APIs')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: `User created successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `DB_OPERATION_FAILED`,
  })
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.createUser(CreateUserDto);
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'Signin user',
    description: 'Signin a user',
  })
  @ApiResponse({
    status: 201,
    description: `User signin successfully`,
  })
  @ApiResponse({
    status: 404,
    description: `BAD_REQUEST`,
  })
  @ApiInternalServerErrorResponse({
    status: 502,
    description: `DB_OPERATION_FAILED`,
  })
  async signinUser(@Body() SigninUserDto: SigninUserDto) {
    return await this.authService.signinUser(SigninUserDto);
  }
}
