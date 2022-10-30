import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

class BaseEntityDTO {
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
