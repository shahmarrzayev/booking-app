import { AppointmentEntity } from './appointment.entity';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class AppointmentHelper {
  private readonly log = new Logger(AppointmentHelper.name);

  async checkAppointmentDate(
    doctorAppointments: AppointmentEntity[],
    appointment: AppointmentEntity,
  ): Promise<boolean> {
    this.log.debug('checkAppointmentDate -- start');
    if (!doctorAppointments || !appointment) {
      this.log.debug('checkAppointmentDate -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const nowDate = new Date(Date.now());
    if (appointment.date < nowDate) {
      return false;
    }

    const appointmentDateDay = appointment.date.getDay();
    const appointmentDateYear = appointment.date.getFullYear();

    let countDateInDoctorAppointments = 0;
    doctorAppointments.forEach((doctorAppointment) => {
      if (!doctorAppointment) return null;
      if (
        doctorAppointment.date.getDay() === appointmentDateDay &&
        doctorAppointment.date.getFullYear() === appointmentDateYear
      ) {
        countDateInDoctorAppointments++;
      }
    });
    if (countDateInDoctorAppointments >= 3) {
      this.log.debug('checkAppointmentDate -- doctor appointments limit reached');
      throw new InternalServerErrorException('doctor appointments limit reached');
    }
    this.log.debug('checkAppointmentDate -- success');
    return true;
  }
}
