import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class JamUpdateDTO extends BaseEntityDTO {
  @IsOptional()
  @IsString()
  jam_title: string;

  @IsOptional()
  @IsString()
  jam_description: string;

  @IsOptional()
  @IsString()
  jam_image: string;

  @IsOptional()
  @IsString()
  jam_brief: string;

  @IsOptional()
  @IsNumber()
  launch_date: number;

  @IsOptional()
  @IsNumber()
  start_date: number;

  @IsOptional()
  @IsNumber()
  end_date: number;

  @IsOptional()
  @IsBoolean()
  is_authorized: boolean;

  @IsOptional()
  @IsBoolean()
  has_started: boolean;
}

export { JamUpdateDTO };
