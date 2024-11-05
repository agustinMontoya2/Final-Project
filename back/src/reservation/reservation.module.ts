import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { TableReservation } from './entities/table.entity';
import { ReservationRepository } from './reservation.repository';
import { Credential } from 'src/auth/entities/credential.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, TableReservation, Credential]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, MailService],
  exports: [ReservationService],
})
export class ReservationModule {}
