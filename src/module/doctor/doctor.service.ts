import { SaveDoctorDto } from './dto/saveDoctor.dto';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DoctorEntity } from './doctor.entity';
import { DoctorRepository } from './doctor.repository';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  private readonly log = new Logger(DoctorService.name);

  async create(dto: SaveDoctorDto): Promise<DoctorEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.warn('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    if (await this.emailExists(dto.email)) {
      this.log.warn('create -- email already exists');
      throw new InternalServerErrorException('email already exists');
    }

    const entity = SaveDoctorDto.toEntity(dto);
    entity.type = 'doctor';
    entity.appointments_accepted = [];

    const doctor = await this.doctorRepository.save(entity);
    if (!doctor) {
      this.log.warn('create -- could not save doctor');
      throw new InternalServerErrorException('could not save doctor');
    }
    this.log.debug('create -- success');
    return doctor;
  }

  async getById(id: string): Promise<DoctorEntity> {
    this.log.debug('getById -- start');
    if (!id) {
      this.log.warn('getById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      this.log.warn('getById -- doctor not found');
      throw new InternalServerErrorException('doctor not found');
    }
    this.log.debug('getById -- success');
    return doctor;
  }

  private async emailExists(email: string): Promise<boolean> {
    const exists = await this.doctorRepository.findByEmail(email);
    return !!exists;
  }
}
