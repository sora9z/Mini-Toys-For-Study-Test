import { IsOptional, IsString } from 'class-validator';
import { CursorPagenationDto } from 'src/common/dto/cursor-pagenation.dto';
import { PagePagenationDto } from 'src/common/dto/page-pagenation.dto';

// export class GetMoviesDto extends PagePagenationDto {
//   @IsString()
//   @IsOptional()
//   title?: string;
// }
export class GetMoviesDto extends CursorPagenationDto {
  @IsString()
  @IsOptional()
  title?: string;
}
