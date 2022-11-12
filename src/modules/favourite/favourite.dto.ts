import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class FavouriteDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  project_id: number;

  @IsNotEmpty()
  @IsNumber()
  comment_id: number;
}

export { FavouriteDTO };
