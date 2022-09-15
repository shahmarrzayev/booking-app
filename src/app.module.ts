import { NotificationModule } from './module/notification/notification.module';
import { AppointmentModule } from './module/appointment/appointment.module';
import { DoctorModule } from './module/doctor/doctor.module';
import { UserModule } from './module/user/user.module';
import { getConfig } from './common/util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EConfig } from './common/config.enum';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: getConfig(EConfig.MONGO_DB_URL),
      ssl: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    UserModule,
    DoctorModule,
    AppointmentModule,
    NotificationModule,
  ],
  providers: [],
})
export class AppModule {}
