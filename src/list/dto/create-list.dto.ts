import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MESSAGE } from 'utils/constants/response.message';

// import config from '../../../config/config';

export class CreateListDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: `Title ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Title ${MESSAGE.MUST_BE_STRING}` })
  title: String;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: `Email ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsEmail({}, { message: `${MESSAGE.INVALID_EMAIL_FORMAT}` })
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: `Password ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Password ${MESSAGE.MUST_BE_STRING}` })
  // @Matches(config.regex.passwordRegex, {
  //   message: `${MESSAGE.PASSWORD_REQUIREMENTS}`,
  // })
  description: string;
}
