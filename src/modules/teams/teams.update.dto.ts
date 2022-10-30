import { IsString } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class TeamUpdateDTO extends BaseEntityDTO {
  @IsString()
  team_name: string;

  @IsString()
  team_description: string;

  @IsString()
  team_image: string;
}

export { TeamUpdateDTO };
