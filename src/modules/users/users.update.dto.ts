import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class UserUpdateDTO extends BaseEntityDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  github_username: string;

  @IsOptional()
  @IsString()
  github_id: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsBoolean()
  isBanned: boolean;

  @IsOptional()
  @IsNumber()
  phone_number: number;

  @IsOptional()
  @IsString()
  stripe_customer_token: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  image: string;
}

export { UserUpdateDTO };
