import {
  IsUUID,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  peopleCount: number;

  @IsNotEmpty()
  @IsString()
  ubication: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  peopleCount: number;

  @IsOptional()
  @IsString()
  ubication: string;
}
