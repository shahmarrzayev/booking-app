import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationHelper {
  private readonly log = new Logger(NotificationHelper.name);
}
