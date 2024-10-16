import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {

  constructor(private readonly repositoryReservation: ReservationRepository) {}

  tablesPreloadService() {
    return this.repositoryReservation.preloadTablesRepository()
  }

  createReservationService(createReservationDto: CreateReservationDto) {
    return this.repositoryReservation.createReservationRepository(createReservationDto)
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
