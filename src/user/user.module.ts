// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // exporta para que o AuthModule possa usar
})
export class UsersModule {}
