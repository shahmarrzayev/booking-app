import { DoctorDto } from './dto/doctor.dto';
import { SaveDoctorDto } from './dto/saveDoctor.dto';
import { DoctorService } from './doctor.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/register')
  async create(@Body() dto: SaveDoctorDto): Promise<DoctorDto> {
    const doctor = await this.doctorService.create(dto);
    return DoctorDto.fromEntity(doctor);
  }
}
