import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CursorPagenationDto {
  @IsString()
  @IsOptional()
  // id_52,likeCount_20
  cursor?: string;

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  // [id_ASC,likeCount_DESC]
  order: string[] = ['id_DESC'];

  @IsInt()
  @IsOptional()
  take: number = 5;
}
