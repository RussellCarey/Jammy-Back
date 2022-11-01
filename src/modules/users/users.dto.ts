import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class UserDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  github_username: string;

  @IsNotEmpty()
  @IsString()
  github_id: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  image: string;
}

export { UserDTO };
