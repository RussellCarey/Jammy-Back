import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { BaseEntityDTO } from 'src/dtos/base.dto';

class JamUpdateDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  jam_title: string;

  @IsNotEmpty()
  @IsString()
  jam_description: string;

  @IsNotEmpty()
  @IsString()
  jam_image: string;

  @IsNotEmpty()
  @IsNumber()
  jam_brief: string;

  @IsNotEmpty()
  @IsNumber()
  launch_date: number;

  @IsNotEmpty()
  @IsNumber()
  start_date: number;

  @IsNotEmpty()
  @IsNumber()
  end_date: number;
}

export { JamUpdateDTO };
