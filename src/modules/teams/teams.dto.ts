import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { BaseEntityDTO } from 'src/dtos/base.dto';

class TeamDTO extends BaseEntityDTO {
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
}

export { TeamDTO };
