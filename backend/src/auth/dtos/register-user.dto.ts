import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  name: string;
}
