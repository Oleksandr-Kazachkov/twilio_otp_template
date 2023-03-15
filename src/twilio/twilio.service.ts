import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { UsersService } from 'src/user/user.service';

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly usersService: UsersService) {
    const accountSid = 'AC32d171f27299441e12f1002e707d589a';
    const authToken = '53db5a2c93f6b204af45c1373e99adea';

    this.twilioClient = new Twilio(accountSid, authToken);

  }

  initiatePhoneNumberVerification(phoneNumber: any) {
    const serviceSid = 'MG1b9e3e96b483cc7138cf339673102464';

    return this.twilioClient.verify
      .v2.services(serviceSid)
      .verifications.create({ to: phoneNumber.phoneNumber, channel: 'sms'  });
  }
}
