import { IsNumber, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { BaseEntityDTO } from 'src/dtos/base.dto';

class JamDTO extends BaseEntityDTO {
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
  @IsString()
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

  @IsNotEmpty()
  @IsBoolean()
  isAuthorized: boolean;
}

export { JamDTO };
