import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto/appointment.dto';
import { SaveAppointmentDto } from './dto/saveAppointment.dto';

@Controller('/api/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/')
  async create(@Body() dto: SaveAppointmentDto): Promise<AppointmentDto> {
    const appointment = await this.appointmentService.create(dto);
    return AppointmentDto.fromEntity(appointment);
  }
}
