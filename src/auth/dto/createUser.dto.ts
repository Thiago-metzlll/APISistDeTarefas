import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../user/model/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
