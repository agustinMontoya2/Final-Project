import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from '../../auth/dto/create-user.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
