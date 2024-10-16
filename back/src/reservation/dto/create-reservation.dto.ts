import { IsUUID, IsDateString, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  table_id: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  mealType: string;

  @IsNotEmpty()
  @IsString()
  ubication: string;

  @IsNotEmpty()
  @IsNumber()
  peopleCount: number;
}