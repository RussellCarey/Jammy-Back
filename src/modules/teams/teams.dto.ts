import { IsString, IsNotEmpty } from 'class-validator';
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
}

export { TeamDTO };
