import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './user.service';
import UserContoller from './user.controller';
import SmsService from 'src/twilio/twilio.service';
import SmsController from 'src/twilio/twilio.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserContoller, SmsController],
  providers: [UsersService, SmsService, ConfigService],
})
export class UsersModule {}
