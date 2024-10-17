import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/preload')
  @ApiTags('Reservation')
  tablesPreloadController() {
    return this.reservationService.tablesPreloadService();
  }

  @Get()
  findAllReservationsController() {
    return this.reservationService.findAllReservationsService();
  }

  @Post()
  createReservationController(
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.createReservationService(
      createReservationDto,
    );
  }

  @Get(':id')
  findOneReservationsController(@Param('id') id: string) {
    return this.reservationService.findOneReservationsService(id);
  }

  @Put(':id')
  cancelReservationController(@Param('id') id: string) {
    return this.reservationService.cancelReservationService(id);
  }
}
