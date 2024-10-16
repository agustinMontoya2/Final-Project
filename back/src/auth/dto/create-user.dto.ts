import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Match } from 'src/custom-validators/match.decorator';
// import { Match } from 'src/custom-validators/match.decorator';

export class SignUpDto {
  /**
   * Name of the user must have at least 3 characters and at most 80
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;

  /**
   * Email of the user must be a valid email
   * @example 'mail@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Password of the user must have at least 8 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number and at least 1 symbol
   * @example 'Password123!'
   */
  @IsString()
  @IsStrongPassword()
  password: string;

  /**
   * Confirm password must match the password
   * @example 'Password123!'
   */
  @Match('password')
  confirmPassword: string;

  /**
   * Address of the user must have at least 3 characters and at most 80
   * @example '123 Main Street'
   */
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * Phone of the user must be a valid phone number
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
export class LogInDto extends PickType(SignUpDto, ['email', 'password']) {}
