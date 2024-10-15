import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "./entities/reservation.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { TableReservation } from "./entities/table.entity";

@Injectable()
export class ReservationRepository {

    
constructor(@InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
            @InjectRepository(User) private readonly userRepository: Repository<User>,
            @InjectRepository(TableReservation) private readonly tableRepository: Repository<TableReservation>) {}



            async createReservationRepository(createReservationDto: CreateReservationDto) {
              const { date, time, user_id, table_id, status } = createReservationDto;
          
              const user = await this.userRepository.findOne({ where: { user_id } });
              if (!user) {
                throw new BadRequestException('Usuario no encontrado');
              }
          
              const table = await this.tableRepository.findOneBy({table_id}); 
              if (!table) {
                throw new BadRequestException('Mesa no encontrada');
              }
          
              const reservation = this.reservationRepository.create({
                table, 
                user,   
                date,
                time,
                status,
              });
          
              return await this.reservationRepository.save(reservation);
            }

            async findAllReservationsRepository() {
              const reservations = await this.reservationRepository.find()

              if (!reservations || reservations.length === 0) {
                throw new BadRequestException('No se encontraron reservas.');
              }
              return reservations;
            }


            async findOneReservationRepository(id: string) {
              const reservation = await this.reservationRepository.findOneBy({reservation_id: id})
              
              if (!reservation) {
                throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
              }
              return reservation

            }

            async updateReservationRepository(id: string) {
                  const reservation = await this.reservationRepository.findOneBy({ reservation_id: id });
            
                  if (!reservation) {
                    throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
                  }
            
                  if (reservation.status === false) {
                    throw new BadRequestException(`La reserva con ID ${id} ya está cancelada.`);
                  }
            
                  reservation.status = false;
            
                  await this.reservationRepository.save(reservation);
            
                  return reservation;

              
            } 
          }

