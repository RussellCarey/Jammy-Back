import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class TeamDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  team_name: string;

  @IsNotEmpty()
  @IsString()
  team_description: string;

  @IsNotEmpty()
  @IsString()
  team_image: string;

  @IsOptional()
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsNumber()
  jam_id: number;
}

export { TeamDTO };
