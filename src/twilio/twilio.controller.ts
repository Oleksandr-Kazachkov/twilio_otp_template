import {
  Controller,
  Post,
  BadRequestException,
  Body,
} from '@nestjs/common';
import TwilioService from './twilio.service';

@Controller('sms')
export default class SmsController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('check-verification-code')
  async checkVerificationCode(@Body() phoneNumber: string) {
    if (!phoneNumber) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.twilioService.initiatePhoneNumberVerification(phoneNumber);
  }
}
