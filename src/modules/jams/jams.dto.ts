import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class JamDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  jam_title: string;

  @IsString()
  jam_title_slug: string;

  @IsNotEmpty()
  @IsString()
  jam_description: string;

  @IsString()
  jam_image: string;

  @IsNotEmpty()
  @IsString()
  jam_brief: string;

  @IsNotEmpty()
  @IsString()
  launch_date: Date;

  @IsNotEmpty()
  @IsString()
  start_date: Date;

  @IsNotEmpty()
  @IsString()
  end_date: Date;

  @IsOptional()
  @IsBoolean()
  isAuthorized: boolean;
}

export { JamDTO };
