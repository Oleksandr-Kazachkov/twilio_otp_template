
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { UsersService } from 'src/user/user.service';
import VerificationChecksDto from './dto/verification.check.dto';
 
@Injectable()
export default class SmsService {
  private twilioClient: Twilio;
 
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
   }
 
  async initiatePhoneNumberVerification(phoneNumber: string) {
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    const twilioClient = new Twilio(accountSid, authToken);

    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
 
    return await twilioClient.verify.v2.services(serviceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms'})
  }

  async checkVerificationCode(verificationChecksDto: VerificationChecksDto) {
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    const twilioClient = new Twilio(accountSid, authToken);

    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
 
    return await twilioClient.verify.v2.services(serviceSid)
      .verificationChecks
      .create({ to: verificationChecksDto.phoneNumber, code: verificationChecksDto.code })
  }
}