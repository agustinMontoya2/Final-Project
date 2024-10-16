import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
