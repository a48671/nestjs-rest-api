import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../users/user.model';
import { PostModel } from './post.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([UserModel, PostModel]),
    FilesModule
  ]
})
export class PostsModule {}
