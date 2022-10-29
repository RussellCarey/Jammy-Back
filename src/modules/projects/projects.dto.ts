import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseEntityDTO } from 'src/dtos/base.dto';

class ProjectDTO extends BaseEntityDTO {
  @IsNotEmpty()
  @IsString()
  project_title: string;

  @IsNotEmpty()
  @IsString()
  project_description: string;

  @IsNotEmpty()
  @IsString()
  youtube_url: string;

  @IsNotEmpty()
  @IsString()
  github_url: string;

  @IsNotEmpty()
  @IsString()
  live_site_url: string;

  @IsNotEmpty()
  @IsString()
  header_image: string;

  @IsNotEmpty()
  @IsString()
  background_image: string;

  @IsNotEmpty()
  @IsString()
  text_color: string;

  @IsNotEmpty()
  @IsString()
  link_color: string;

  @IsNotEmpty()
  @IsString()
  Background_color: string;

  @IsNotEmpty()
  @IsString()
  container_color: string;

  @IsNotEmpty()
  @IsNumber()
  views: number;
}

export { ProjectDTO };
