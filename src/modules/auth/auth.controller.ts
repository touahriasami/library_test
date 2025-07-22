import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'sign up a new user',
  })
  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({
    summary: 'login a user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signinDto: SignInDto) {
    return this.authService.login(signinDto);
  }

  @ApiOperation({
    summary: 'get all users',
  })
  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
}
