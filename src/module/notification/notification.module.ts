import { NotificationHelper } from './notification.helper';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [NotificationService, NotificationHelper],
  exports: [NotificationService],
})
export class NotificationModule {}
