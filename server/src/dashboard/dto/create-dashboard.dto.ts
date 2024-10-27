// export class CreateDashboardDto {}

import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuizDto {
  @IsString()
  ques: string;

  @IsString()
  img: string;

  @IsString()
  ans: string; // JSON 문자열로 저장
}

export class CreateDashboardDto {
  @IsString()
  title: string;

  @IsString()
  des: string;

  @IsString()
  emb: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizDto)
  quiz: CreateQuizDto[];
}
