import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/auth/entities/credential.entity';
import { Repository } from 'typeorm';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly mailService: MailService,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

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
  async createReservationController(
    @Body() createReservationDto: CreateReservationDto,
  ) {
    console.log(createReservationDto);
    const user = await this.credentialRepository.findOne({
      where: { user: { user_id: createReservationDto.user_id } },
      relations: ['user'],
    });

    if (user) {
      await this.mailService.mailConfirm(user.email, 'Reservation');
    }

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
    return this.reservationService.updateReservationService(
      reservation_id,
      UpdateReservationDto,
    );
  }
}
