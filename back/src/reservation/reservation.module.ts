import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { TableReservation } from './entities/table.entity';
import { ReservationRepository } from './reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, TableReservation])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
