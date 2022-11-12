import { IsString, IsNotEmpty } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class AchievementDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export { AchievementDTO };
