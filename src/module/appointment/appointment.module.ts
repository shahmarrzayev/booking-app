import { NotificationModule } from './../notification/notification.module';
import { AppointmentHelper } from './appointment.helper';
import { DoctorModule } from './../doctor/doctor.module';
import { UserModule } from './../user/user.module';
import { AppointmentEntity } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]), UserModule, DoctorModule, NotificationModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, AppointmentHelper],
  exports: [AppointmentService],
})
export class AppointmentModule {}
