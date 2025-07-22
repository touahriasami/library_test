import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';
import { HashingService } from './hashing/hashing.service';
import { SignInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signup(signupDto: SignUpDto) {
    try {
      const hashedPassword = await this.hashingService.hash(signupDto.password);

      const createUser = new this.userModel({
        ...signupDto,
        password: hashedPassword,
      });

      return createUser.save();
    } catch (err) {
      throw err;
    }
  }

  async login(signinDto: SignInDto) {
    const user = await this.userModel.findOne({ email: signinDto.email });

    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const isEqual = await this.hashingService.compare(
      signinDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('password doest not match');
    }

    return true;
  }

  getUsers() {
    return this.userModel.find({}, { email: 1 });
  }
}
