import { IsString, IsNumber, IsObject, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  profit: number;

  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;
}
