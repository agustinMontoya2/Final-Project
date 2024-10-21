import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/create-reservation.dto';
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
    findOneReservationsByUserIdController(@Param('id') user_id: string) {
      return this.reservationService.findOneReservationsByUserIdService(user_id);
    }
  

  // @Get(':id')
  // findOneReservationsController(@Param('id') id: string) {
  //   return this.reservationService.findOneReservationsService(id);
  // }

  @Put('cancel/:id')
  cancelReservationController(@Param('id') id: string) {
    return this.reservationService.cancelReservationService(id);
  }
  @Put(':id')
  updateReservationController(
    @Param('id') reservation_id: string,
    @Body() UpdateReservationDto: UpdateReservationDto,
  ) {
    // return 'this endpoint is not ready yet';
    return this.reservationService.updateReservationService(
      reservation_id,
      UpdateReservationDto,
    );
  }


}
