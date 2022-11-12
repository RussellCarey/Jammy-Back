import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class CommentDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsString()
  project_id: number;

  @IsOptional()
  @IsNumber()
  commented_user_id: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export { CommentDTO };
