import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(address: string): Promise<User | null> {
    const user = await this.userModel.findOne({ address });
    if (user) {
      return user;
    }
    return null;
  }

  async login(address: string) {
    const payload = { address };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(address: string): Promise<User> {
    const newUser = new this.userModel({ address });
    return newUser.save();
  }
}
