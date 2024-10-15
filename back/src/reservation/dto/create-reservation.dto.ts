import { IsDateString, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
// import { ReservationStatus } from '../enumReservation';

export class CreateReservationDto {

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsString()
  @IsNotEmpty()
  table_id: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;  

  @IsNotEmpty()
  @IsString()
  time: string;  

  @IsEmpty()
  status: ReservationStatus.PENDING

}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}