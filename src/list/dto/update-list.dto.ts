import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MESSAGE } from '../../../utils/constants/response.message';

// import config from '../../../config/config';

export class UpdateListDto {
  @ApiProperty({ type: String, default: 'Match' })
  @IsNotEmpty({ message: `Title ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Title ${MESSAGE.MUST_BE_STRING}` })
  title: String;

  @ApiProperty({ type: String, default: 'abc@gamil.com' })
  @IsNotEmpty({ message: `Email ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsEmail({}, { message: `${MESSAGE.INVALID_EMAIL_FORMAT}` })
  email: string;

  @ApiPropertyOptional({ type: String, default: 'Today is my _ match' })
  //   @IsOptional()
  @IsNotEmpty({ message: `Description ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Description ${MESSAGE.MUST_BE_STRING}` })
  // @Matches(config.regex.passwordRegex, {
  //   message: `${MESSAGE.PASSWORD_REQUIREMENTS}`,
  // })
  description: string;

  @ApiProperty({
    type: String,
    default:
      'https://res.cloudinary.com/dvrhjqoxc/image/upload/v1717327421/nextjs-nestjs-practice-project/ld5gzkmslgrkqlg2m0nb.jpg',
  })
  @IsNotEmpty({ message: `Image URL ${MESSAGE.MUST_BE_PROVIDED}` })
  @IsString({ message: `Image URL ${MESSAGE.MUST_BE_STRING}` })
  image: String;
}
