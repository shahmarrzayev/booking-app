import { NotificationService } from './../notification/notification.service';
import { UserRepository } from './../user/user.repository';
import { UserService } from './../user/user.service';
import { AppointmentRepository } from './appointment.repository';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SaveAppointmentDto } from './dto/saveAppointment.dto';
import { AppointmentEntity } from './appointment.entity';
import { DoctorService } from '../doctor/doctor.service';
import { DoctorRepository } from '../doctor/doctor.repository';
import { AppointmentHelper } from './appointment.helper';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly appointmentHelper: AppointmentHelper,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly doctorService: DoctorService,
    private readonly doctorRepository: DoctorRepository,
    private readonly notificationService: NotificationService,
  ) {}

  private readonly log = new Logger(AppointmentService.name);

  async create(dto: SaveAppointmentDto): Promise<AppointmentEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const [user, doctor] = await Promise.all([
      this.userService.getById(dto.user),
      this.doctorService.getById(dto.doctor),
    ]);
    if (!user || !doctor) {
      this.log.debug('create -- could not get user or doctor');
      throw new InternalServerErrorException('could not get user or doctor');
    }

    const doctorAppointments = await this.getManyById(doctor.appointments_accepted);
    if (!doctorAppointments) {
      this.log.debug('create -- could not get doctor appointments');
      throw new InternalServerErrorException('could not get doctor appointments');
    }

    const appointmentEntity = SaveAppointmentDto.toEntity(dto);
    appointmentEntity.user = user._id;
    appointmentEntity.doctor = doctor._id;
    appointmentEntity.active = false;

    const appointment = await this.appointmentRepository.save(appointmentEntity);
    if (!appointment) {
      this.log.debug('create -- could not save appointment');
      throw new InternalServerErrorException('could not save appointment');
    }

    if ((await this.appointmentHelper.checkAppointmentDate(doctorAppointments, appointment)) && doctor.free) {
      doctor.appointments_accepted = doctor.appointments_accepted
        ? [...doctor.appointments_accepted, appointment._id]
        : [appointment._id];
      user.appointments = user.appointments ? [...user.appointments, appointment._id] : [appointment._id];
      appointment.active = true;
      this.notificationService.create(appointment._id, appointment.date);
    }

    const [updatedAppointment, updatedDoctor, updatedUser] = await Promise.all([
      this.appointmentRepository.findOneAndUpdate(appointment._id, appointment),
      this.doctorRepository.findOneAndUpdate(doctor._id, doctor),
      this.userRepository.findOneAndUpdate(user._id, user),
    ]);

    if (!updatedAppointment || !updatedDoctor || !updatedUser) {
      this.log.debug('create -- could not save entities');
      throw new InternalServerErrorException('could not save entities');
    }
    this.log.debug('create -- success');
    return appointment;
  }

  async getManyById(ids: string[]): Promise<AppointmentEntity[]> {
    this.log.debug('getManyById -- start');
    if (!ids) {
      this.log.debug('getManyById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }
    const appointments = await this.appointmentRepository.findByIds(ids);
    if (!appointments) {
      this.log.debug('getManyById -- appointments not found');
      throw new InternalServerErrorException('appointments not found');
    }
    this.log.debug('getManyById -- success');
    return appointments;
  }
}
