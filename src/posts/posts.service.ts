import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostModel } from './post.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private postsRepository: typeof PostModel,
    private readonly filesService: FilesService
  ) {}

  async createPost(dto: CreatePostDto, image: any): Promise<PostModel> {
    const fileName: string = await this.filesService.createFile(image);

    const post = await this.postsRepository.create({ ...dto, image: fileName });

    return post;
  }
}
