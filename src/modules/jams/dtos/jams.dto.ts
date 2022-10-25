import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntityDTO } from 'src/dtos/base.dto';

class JamDTO extends BaseEntityDTO {
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
}

export { JamDTO };
