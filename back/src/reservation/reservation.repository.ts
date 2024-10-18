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
    const [hour, minutes] = timeStart.split(':').map(Number);
    const endTime = new Date(date);
    endTime.setHours(hour + 5, minutes);
    console.log(endTime.toTimeString());

    const timeEnd = endTime.toTimeString().slice(0, 5);

    const conflictingReservations =
      await this.getConflictingReservationsRepository(
        date,
        timeStart,
        timeEnd,
        ubication,
      );

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

    return 'Reservation made successfully';
  }

  async findAllReservationsRepository() {
    const reservations = await this.reservationRepository.find();

    if (!reservations || reservations.length === 0) {
      throw new BadRequestException('No se encontraron reservas.');
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
        `Reserva con ID ${reservation_id} no encontrada.`,
      );
    }
    return reservation;
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

  async getConflictingReservationsRepository(
    date,
    timeStart,
    timeEnd,
    ubication,
  ) {
    const reservationsToday = await this.reservationRepository.find({
      where: { date, table: { ubication }, status: true },
      relations: ['table'],
    });
    const conflictingReservations = reservationsToday.filter((reservation) => {
      const [startHours1, startMinutes1] = reservation.time
        .split(':')
        .map(Number);
      const [endHours1, endMinutes1] = reservation.timeEnd
        .split(':')
        .map(Number);
      const [startHours2, startMinutes2] = timeStart.split(':').map(Number);
      const [endHours2, endMinutes2] = timeEnd.split(':').map(Number);

      const start1 = startHours1 * 60 + startMinutes1;
      const end1 = endHours1 * 60 + endMinutes1;
      const start2 = startHours2 * 60 + startMinutes2;
      const end2 = endHours2 * 60 + endMinutes2;

      return end1 <= start2 || end2 <= start1;
    });

    return conflictingReservations;
  }
}
