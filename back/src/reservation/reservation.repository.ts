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

  async createReservationRepository(user_id, time, date, peopleCount, ubication) {

    console.log("creating reservation");
    
    if (!isUUID(user_id)) {
      throw new BadRequestException('User ID not valid');
    }
   

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // searching reservation occupied tables
    const reservationsToday = await this.reservationRepository.find({where: {date: date, status: true}, relations: ['table']});
    const reservationsTime: Reservation[] = reservationsToday.filter(reservation => reservation.time === time);
    /**
     * Reservation:
     * {
     * Table: {
     * table_number: 1,
     * capacity: 4,
     * ubication: exterior,
     * }
     * User: *****
     * Date: 17/10/2024
     * time: 02:00hs
     * PeopleCount: 4
     * status: true
     * }
     */
    const tablesOccupied: TableReservation[] = reservationsTime.map( reservation => reservation.table)
    if (tablesOccupied.length < 0) {

    const allTables = await this.tableRepository.find();
    if (!allTables || allTables.length === 0) throw new BadRequestException('No tables found');

    const tablesAvailable = allTables.filter ( table => !tablesOccupied.some(occupiedTable => occupiedTable.table_id === table.table_id)); 

    if (tablesAvailable.length === 0) throw new BadRequestException('No tables available');
}
    await this.reservationRepository.save({
      user,
      date,
      time,
      peopleCount,
      status: true
    });

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
