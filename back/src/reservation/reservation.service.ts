import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {

  constructor(private readonly repositoryReservation: ReservationRepository) {}

  createReservation(createReservation: CreateReservationDto) {
    return this.repositoryReservation.createReservation(createReservation)
  }

  // findAll() {
  // }

  // findOne(id: number) {
  // }

  // remove(id: number) {
  // }
}
