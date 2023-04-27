import {
  Controller,
  Post,
  BadRequestException,
  Body,
} from '@nestjs/common';
import TwilioService from './twilio.service';
import VerificationChecksDto from './dto/verification.check.dto';

@Controller('/sms')
export default class SmsController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('/send-verification-code')
  async sendVerificationCode(@Body() phoneNumber: any) {
    if (!phoneNumber) {
      throw new BadRequestException('Phone number already confirmed');
    }
    return await this.twilioService.initiatePhoneNumberVerification(phoneNumber.phoneNumber);
  }

  @Post('/check-verification-code')
  async checkVerificationCode(@Body() verificationChecksDto: VerificationChecksDto) {

    return await this.twilioService.checkVerificationCode(verificationChecksDto);
  }
}
