import { Controller, Post, Get, Body, UsePipes, ValidationPipe, UseGuards, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from './guards/guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cad')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const token = this.authService.login(loginUserDto);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    return { message: 'Login realizado' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logout realizado' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
