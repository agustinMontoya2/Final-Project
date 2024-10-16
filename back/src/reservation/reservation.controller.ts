import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/preload')
  tablesPreloadController() {
    return this.reservationService.tablesPreloadService()
  }

  @Get()
  findAllReservationsController() {
    return this.reservationService.findAllReservationsService();
  }

  @Post('create')
  createReservationController(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservationService(createReservationDto);
  }

  @Get(':id')
  findOneReservationsController(@Param('id') id: string) {
    return this.reservationService.findOneReservationsService(id);
  }

  @Put(':id')
  updateReservationController(@Param('id') id: string) {
    return this.reservationService.updateReservationService(id);
  }

}
