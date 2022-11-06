import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class TeamUpdateDTO extends BaseEntityDTO {
  @IsOptional()
  @IsString()
  team_name: string;

  @IsOptional()
  @IsString()
  team_description: string;

  @IsOptional()
  @IsString()
  team_image: string;

  @IsOptional()
  @IsNumber()
  jam_id: number;
}

export { TeamUpdateDTO };
