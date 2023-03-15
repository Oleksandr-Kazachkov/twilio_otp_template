import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import createUserDto from './dto/createUserDto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto: createUserDto): Promise<User> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  markPhoneNumberAsConfirmed(userId: number) {
    return this.userModel.updateOne(
      { id: userId },
      {
        isPhoneNumberConfirmed: true,
      },
    );
  }
}
