import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MESSAGE } from '../../../utils/constants/response.message';

export class CreateUserDto {
  @ApiProperty({ type: String, default: 'raja' })
  @IsNotEmpty({ message: `Name ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Name ${MESSAGE.MUST_BE_STRING}` })
  name: String;

  @ApiProperty({ type: String, default: 'abc@gamil.com' })
  @IsNotEmpty({ message: `Email ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsEmail({}, { message: `${MESSAGE.INVALID_EMAIL_FORMAT}` })
  email: string;

  @ApiPropertyOptional({ type: String, default: 'admin123' })
  @IsNotEmpty({ message: `Password ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Password ${MESSAGE.MUST_BE_STRING}` })
  password: string;
}
