import { IsString, IsOptional } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class AchievementUpdateDTO extends BaseEntityDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;
}

export { AchievementUpdateDTO };
