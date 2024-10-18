import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly repositoryReservation: ReservationRepository) {}

  tablesPreloadService() {
    return this.repositoryReservation.preloadTablesRepository();
  }

  createReservationService(createReservationDto: CreateReservationDto) {
    const { user_id, time, date, peopleCount, ubication } =
      createReservationDto;
    const timeStart = this.getTimes(time, date)[0];
    const timeEnd = this.getTimes(time, date)[1];
    return this.repositoryReservation.createReservationRepository(
      user_id,
      timeStart,
      timeEnd,
      date,
      peopleCount,
      ubication,
    );
  }

  findAllReservationsService() {
    return this.repositoryReservation.findAllReservationsRepository();
  }

  findOneReservationsService(id: string) {
    return this.repositoryReservation.findOneReservationRepository(id);
  }

  updateReservationService(user_id: string, UpdateReservationDto) {
    const { date, time, peopleCount, ubication } = UpdateReservationDto;
    const timeStart = this.getTimes(time, date)[0];
    const timeEnd = this.getTimes(time, date)[1];
    return this.repositoryReservation.updateReservationRepository(
      user_id,
      date,
      timeStart,
      timeEnd,
      peopleCount,
      ubication,
    );
  }
  cancelReservationService(id: string) {
    return this.repositoryReservation.cancelReservationRepository(id);
  }

  getTimes(timeStart, date) {
    const [hour, minutes] = timeStart.split(':').map(Number);
    const endTime = new Date(date);
    endTime.setHours(hour + 5, minutes);
    console.log(endTime.toTimeString());

    const timeEnd = endTime.toTimeString().slice(0, 5);

    return [timeStart, timeEnd];
  }
}
