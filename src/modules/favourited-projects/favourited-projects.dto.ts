import { IsNumber, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class FavouritedProjectDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}

export { FavouritedProjectDTO };
