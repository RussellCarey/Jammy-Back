import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

class BaseEntityDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived: boolean;

  @IsOptional()
  created_at: Date;

  @IsOptional()
  updated_at: Date;

  @IsOptional()
  @IsString()
  internal_comment: string;
}

export { BaseEntityDTO };
