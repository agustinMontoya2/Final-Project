import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, Table } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TableReservation } from './entities/table.entity';
import { IsUUID } from 'class-validator';
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

  async createReservationRepository(date, time, user_id, table_id) {
    if (!IsUUID(user_id)) {
      throw new BadRequestException('User ID not valid');
    }
    if (!IsUUID(table_id)) {
      throw new BadRequestException('Table ID not valid');
    }
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const table = await this.tableRepository.findOneBy({ table_id });
    if (!table || !table.status) {
      throw new NotFoundException('Table not found or not available');
    }

    const reservation = await this.reservationRepository.save({
      table,
      user,
      date,
      time,
    });

    return reservation;
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

  preloadTables() {
    //   tables?.map(async (element) => {
    //     const table = new TableReservation();
    //     table.table_number = element.table_number;
    //     table.capacity = element.capacity;
    //     table.ubication = element.ubication;
    //     table.status = element.status;

    //     await this.tableRepository
    //       .createQueryBuilder()
    //       .insert()
    //       .into(TableReservation)
    //       .values(table)
    //       .orUpdate(['ubication', 'status'], ['capacity'])
    //       .execute();
    //   });
    return 'Tables added';
  }
}
