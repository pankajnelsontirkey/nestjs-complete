import { Module } from '@nestjs/common';

import { MessagesController } from './messages.controller';
import { MessageRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository], // thingsThatCanBeUsedAsDependenciesForOtherClasses
})
export class MessagesModule {}
