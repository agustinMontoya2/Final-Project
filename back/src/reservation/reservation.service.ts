import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {

  constructor(private readonly repositoryReservation: ReservationRepository) {}

  createReservationService(createReservation: CreateReservationDto) {
    return this.repositoryReservation.createReservationRepository(createReservation)
  }

  findAllReservationsService() {
   return this.repositoryReservation.findAllReservationsRepository()

  }

  findOneReservationsService(id: string) {
    return this.repositoryReservation.findOneReservationRepository(id)
  }

  updateReservationService(id: string) {
    return this.repositoryReservation.updateReservationRepository(id)
  }
}
