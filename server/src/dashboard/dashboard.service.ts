import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
  
  // create(createDashboardDto: CreateDashboardDto) {
  //   return 'This action adds a new dashboard';
  // }

  // findAll() {
  //   return `This action returns all dashboard`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} dashboard`;
  // }

  // update(id: number, updateDashboardDto: UpdateDashboardDto) {
  //   return `This action updates a #${id} dashboard`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dashboard`;
  // }

  async user(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // async createPost(data: Prisma.PostCreateInput): Promise<Post> {
  //   return this.prisma.post.create({
  //     data,
  //   })
  // }

  async createPost(data: CreateDashboardDto): Promise<Post> {
    const quizzes = data.quiz.map((quiz) => ({
      ques: quiz.ques,
      img: quiz.img,
      ans: JSON.stringify(quiz.ans), // JSON 문자열로 변환
    }));

    return this.prisma.post.create({
      data: {
        title: data.title,
        des: data.des,
        emb: data.emb,
        quiz: {
          create: quizzes,
        },
      },
      include: {
        quiz: true,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        quiz: true,
      },
    });
  }
}
