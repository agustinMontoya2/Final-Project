import { Injectable } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "./entities/reservation.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class ReservationRepository {

    
constructor(@InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
            @InjectRepository(User) private readonly userRepository: Repository<User>) {}



async createReservation(createReservationDto: CreateReservationDto) {
    const { date, time, user_id, status } = createReservationDto;

    const user = await this.userRepository.findOne({where: {user_id}})

    const reservation = this.reservationRepository.create({
        user,
        date,
        time,
        status
    });

    console.log('save', reservation)

    // return this.reservationRepository.save(reservation);
  }



}