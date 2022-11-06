import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class ProjectDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  project_title: string;

  @IsNotEmpty()
  @IsString()
  project_description: string;

  @IsOptional()
  @IsString()
  youtube_url: string;

  @IsOptional()
  @IsString()
  github_url: string;

  @IsOptional()
  @IsString()
  live_site_url: string;

  @IsOptional()
  @IsString()
  header_image: string;

  @IsOptional()
  @IsString()
  background_image: string;

  @IsOptional()
  @IsString()
  text_color: string;

  @IsOptional()
  @IsString()
  link_color: string;

  @IsOptional()
  @IsString()
  Background_color: string;

  @IsOptional()
  @IsString()
  container_color: string;

  @IsNotEmpty()
  @IsNumber()
  team_id: number;
}

export { ProjectDTO };
