import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Post as PostModel } from '@prisma/client';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  // async createPost(
  //   @Body() postData: { title: string, des: string, emb: string, quiz: { ques: string, img: string, ans: string }[] }
  // ): Promise<PostModel> {
  //   return this.dashboardService.createPost(postData)
  // }
  async createPost(@Body() postData: CreateDashboardDto): Promise<PostModel> {
    return this.dashboardService.createPost(postData);
  }

  // @Get()
  // findOne() {
  //   return "어쩔"
  // }

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return this.dashboardService.findAll();
  }
  
  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @Get()
  // findAll() {
  //   return this.dashboardService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}
