import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class NotificationService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  private readonly log = new Logger(NotificationService.name);

  create(id: string, date: Date): void {
    this.log.debug('create -- start');

    try {
      const dateForAfterOneDay = new Date(date);
      dateForAfterOneDay.setDate(dateForAfterOneDay.getDate() - 1);
      const notificationForAfterOneDay = new CronJob(dateForAfterOneDay, () => {
        this.schedulerRegistry.deleteCronJob(id);
      });
      this.schedulerRegistry.addCronJob(id, notificationForAfterOneDay);
      notificationForAfterOneDay.start();

      const dateForAfterTwoHour = new Date(date);
      dateForAfterTwoHour.setHours(dateForAfterTwoHour.getHours() - 2);
      const notificationForAfterTwoHour = new CronJob(dateForAfterTwoHour, () => {
        this.schedulerRegistry.deleteCronJob(id);
      });
      this.schedulerRegistry.addCronJob(id, notificationForAfterTwoHour);
      notificationForAfterTwoHour.start();
    } catch (err) {
      this.log.error(`create -- ${err}`);
      throw new InternalServerErrorException();
    }

    this.log.debug('create -- success');
  }

  saveLogMessageAfter() {}
}
