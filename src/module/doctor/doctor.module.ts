import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { DoctorController } from './doctor.controller';
import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorEntity } from './doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
