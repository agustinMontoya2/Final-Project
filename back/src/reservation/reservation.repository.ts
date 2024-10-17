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
    time,
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

    const [hour, minutes] = time.split(':').map(Number);
    const endTime = new Date(date);
    endTime.setHours(hour + 2, minutes);
    const timeEnd = endTime.toTimeString().slice(0, 5);

    console.log('first date');

    console.log(date);

    const reservationsToday = await this.reservationRepository.find({
      where: { date, table: { ubication } },
      relations: ['table'],
    });
    console.log('reservated today');
    console.log(reservationsToday);
    console.log(
      await this.reservationRepository.find({
        where: { date },
        relations: ['table'],
      }),
    );

    const conflictingReservations = reservationsToday.filter((reservation) => {
      const [startHours1, startMinutes1] = reservation.time
        .split(':')
        .map(Number);
      const [endHours1, endMinutes1] = reservation.timeEnd
        .split(':')
        .map(Number);
      const [startHours2, startMinutes2] = time.split(':').map(Number);
      const [endHours2, endMinutes2] = timeEnd.split(':').map(Number);

      const start1 = startHours1 * 60 + startMinutes1;
      const end1 = endHours1 * 60 + endMinutes1;
      const start2 = startHours2 * 60 + startMinutes2;
      const end2 = endHours2 * 60 + endMinutes2;

      return !(end1 <= start2 || end2 <= start1); // Verificar solapamiento
    });
    console.log('conflicting reservations');
    console.log(conflictingReservations);

    const tablesOccupied: TableReservation[] = conflictingReservations.map(
      (reservation) => reservation.table,
    );
    console.log('tables occupied');
    console.log(tablesOccupied);

    const allTables = await this.tableRepository.find();
    console.log('all tables');
    console.log(allTables);

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
    console.log(
      '*****************************************************************',
    );

    const tableAvailable = tablesAvailable[0];
    console.log('table available');
    console.log(tableAvailable);

    await this.tableRepository.save(tableAvailable);

    const reservation = new Reservation();
    reservation.user = user;
    reservation.date = date;
    reservation.time = time;
    reservation.timeEnd = timeEnd;
    reservation.peopleCount = peopleCount;
    reservation.table = tableAvailable;

    console.log('reservation to save');
    console.log(reservation);

    console.log('date saved');

    console.log(date);

    console.log('reservation date');

    console.log(reservation.date);

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

  async findOneReservationRepository(id: string) {
    const reservation = await this.reservationRepository.findOneBy({
      reservation_id: id,
    });

    if (!reservation) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }
    return reservation;
  }

  async updateReservationRepository(id: string) {
    const reservation = await this.reservationRepository.findOneBy({
      reservation_id: id,
    });

    if (!reservation) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }

    if (reservation.status === false) {
      throw new BadRequestException(
        `La reserva con ID ${id} ya está cancelada.`,
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
        existingTable.status = element.status;
        table = existingTable;
      } else {
        table = this.tableRepository.create({
          table_number: element.table_number,
          capacity: element.capacity,
          ubication: element.ubication,
          status: element.status,
        });
      }

      await this.tableRepository.save(table);
    }

    return 'Tables added';
  }
}
