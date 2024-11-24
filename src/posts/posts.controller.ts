import {
  Controller,
  Get,
  Query
} from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  async getPosts(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ) {
    return await this.postsService.getPosts(Number(limit), Number(offset));
  }
}
