import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TableReservation } from './entities/table.entity';
import { isUUID } from 'class-validator';
import * as tables from '../utils/Tables.json';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(TableReservation)
    private readonly tableRepository: Repository<TableReservation>,
  ) {}

  async createReservationRepository(
    user_id,
    timeStart,
    timeEnd,
    date,
    peopleCount,
    ubication,
  ) {
    console.log('creating reservation');

    if (!isUUID(user_id)) {
      throw new BadRequestException('User ID not valid');
    }

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log('searching tables...');

    const tablesAvailable = await this.getTablesAvailablesRepository(
      date,
      timeStart,
      timeEnd,
      ubication,
    );
    console.log(tablesAvailable);

    if (tablesAvailable.length === 0)
      throw new BadRequestException(`No tables available in ${ubication}`);

    const tableForPeoples = Math.ceil(peopleCount / 4);
    if (tablesAvailable.length < tableForPeoples)
      throw new BadRequestException(
        `No tables available for ${peopleCount} people in ${ubication}`,
      );

    const reservation = new Reservation();

    reservation.user = user;
    reservation.date = date;
    reservation.time = timeStart;
    reservation.timeEnd = timeEnd;
    reservation.peopleCount = peopleCount;
    reservation.table = [];
    for (let i = 0; i < tableForPeoples; i++) {
      reservation.table.push(tablesAvailable[i]);
    }
    await this.reservationRepository.save(reservation);

    return { message: 'Reservation made successfully' };
  }

  async findAllReservationsByUserIdRepository(user_id: string) {
    if (!isUUID(user_id)) {
      throw new BadRequestException('user_id is not UUID');
    }

    const user = await this.userRepository.findOneBy({ user_id });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found.`);
    }

    const reserve = await this.reservationRepository.find({
      where: { user },
      relations: ['table'],
    });

    if (!reserve) {
      throw new NotFoundException(
        `Reservation not found for user with ID ${user_id}.`,
      );
    }

    return reserve;
  }

  async findAllReservationsRepository() {
    const reservations = await this.reservationRepository.find({
      relations: ['table', 'user'],
    });

    if (!reservations) {
      throw new BadRequestException('Reservations not found');
    }
    return reservations;
  }

  async findOneReservationRepository(reservation_id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { reservation_id },
      relations: ['table', 'user'],
    });

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with id ${reservation_id} not found`,
      );
    }
    return reservation;
  }

  async updateReservationRepository(
    reservation_id: string,
    date,
    timeStart,
    timeEnd,
    peopleCount,
    ubication,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { reservation_id },
      relations: ['table'],
    });

    if (!reservation) throw new NotFoundException('Reservation not found');
    const newReservation = {
      ...reservation,
      date,
      timeStart,
      timeEnd,
      peopleCount,
      ubication,
    };
    return newReservation;

    const tablesAvailable = await this.getTablesAvailablesRepository(
      newReservation.date,
      newReservation.timeStart,
      newReservation.timeEnd,
      newReservation.ubication,
    );

    if (tablesAvailable.length === 0)
      throw new BadRequestException(
        `No tables available in ${newReservation.ubication}`,
      );

    const tableForPeoples = Math.ceil(peopleCount / 4);
    if (tablesAvailable.length < tableForPeoples)
      throw new BadRequestException(
        `No tables available for ${peopleCount} people in ${newReservation.ubication}`,
      );

    return newReservation;
  }
  async cancelReservationRepository(reservation_id: string) {
    const reservation = await this.reservationRepository.findOneBy({
      reservation_id,
    });

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservation_id} not found.`,
      );
    }

    if (reservation.status === false) {
      throw new BadRequestException(
        `Reservation with ID ${reservation_id} already cancelled.`,
      );
    }

    reservation.status = false;

    await this.reservationRepository.save(reservation);

    return reservation;
  }

  async preloadTablesRepository() {
    for (const element of tables) {
      const existingTable = await this.tableRepository.findOneBy({
        table_number: element.table_number,
      });

      let table: TableReservation;

      if (existingTable) {
        existingTable.ubication = element.ubication;
        table = existingTable;
      } else {
        table = this.tableRepository.create({
          table_number: element.table_number,
          ubication: element.ubication,
        });
      }

      await this.tableRepository.save(table);
    }

    return 'Tables added';
  }

  async getTablesAvailablesRepository(date, timeStart, timeEnd, ubication) {
    const reservationsToday = await this.reservationRepository.find({
      where: { date, table: { ubication }, status: true },
      relations: ['table'],
    });

    const conflictingReservations = reservationsToday.filter(
      (reservationToday) => {
        const [startHoursReservationToday, startMinutesReservationToday] =
          reservationToday.time.split(':').map(Number);
        const [endHoursReservationToday, endMinutesReservationToday] =
          reservationToday.timeEnd.split(':').map(Number);
        const [startHoursNew, startMinutesNew] = timeStart
          .split(':')
          .map(Number);
        const [endHoursNew, endMinutesNew] = timeEnd.split(':').map(Number);

        const startToday =
          startHoursReservationToday * 60 + startMinutesReservationToday;
        let endToday =
          endHoursReservationToday * 60 + endMinutesReservationToday;
        const startNew = startHoursNew * 60 + startMinutesNew;
        let endNew = endHoursNew * 60 + endMinutesNew;
        return !(endToday <= startNew || endNew <= startToday);
      },
    );
    console.log(conflictingReservations);

    const tablesOccupied: TableReservation[] = conflictingReservations
      .map((reservation) => reservation.table)
      .flat();

    const allTables = await this.tableRepository.find();

    if (!allTables || allTables.length === 0)
      throw new BadRequestException('No tables found');

    let tablesAvailable = allTables.filter(
      (table) =>
        table.ubication === ubication &&
        !tablesOccupied.some(
          (occupiedTable) => occupiedTable.table_id === table.table_id,
        ),
    );
    console.log(tablesAvailable);

    return tablesAvailable;
  }
}
