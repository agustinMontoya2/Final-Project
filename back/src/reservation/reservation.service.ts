import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService implements OnApplicationBootstrap {
  constructor(private readonly repositoryReservation: ReservationRepository) {}

  async onApplicationBootstrap() {
    await this.tablesPreloadService();
  }

  tablesPreloadService() {
    return this.repositoryReservation.preloadTablesRepository();
  }

  createReservationService(createReservationDto: CreateReservationDto) {
    const { user_id, time, date, peopleCount, ubication } =
      createReservationDto;
    const { timeStart, timeEnd } = this.getTimes(time, date);
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
    if (hour >= 22 && hour < 24) {
      throw new BadRequestException(
        'Reservations are not allowed between 22:00 and 00:00',
      );
    }

    const endTime = new Date(date);
    endTime.setHours(hour + 2, minutes);
    const timeEnd = endTime.toTimeString().slice(0, 5);

    return {
      timeStart,
      timeEnd,
    };
  }
}
