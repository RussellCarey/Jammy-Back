import { IsNumber, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class FavouritedProjectDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  project_id: number;
}

export { FavouritedProjectDTO };
