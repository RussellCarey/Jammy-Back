import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favourite } from './favourite.entity';
import { FavouriteController } from './favourite.controller';
import { FavouriteServices } from './favourite.service';
import { ProjectServices } from '../projects/projects.service';
import { Project } from '../projects/projects.entity';
import { Comment } from '../comments/comments.entity';
import { CommentService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite, Project, Comment])],
  controllers: [FavouriteController],
  providers: [FavouriteServices, ProjectServices, CommentService],
})
export class FavouriteModule {}
