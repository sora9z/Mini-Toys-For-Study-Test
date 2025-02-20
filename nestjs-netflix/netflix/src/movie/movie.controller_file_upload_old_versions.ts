import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  BadRequestException,
  Request,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { RBAC } from 'src/auth/decorator/rbac.decorator';
import { Role } from 'src/user/entity/user.entity';
import { GetMoviesDto } from './dto/get-movies.dto';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { MovieFilePipe } from './pipe/movie-file.pipe';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Public()
  getMovies(@Query() dto: GetMoviesDto) {
    return this.movieService.findAll(dto);
  }

  @Get(':id')
  @Public()
  getMovie(
    @Param(
      'id',
      // @Param('id', ParseIntPipe) 이런식으로 제공할 수도 있는데 메시지를 변경한다던지 하고 싶은 경우엔 new ParseIntPipe
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요!');
        },
      }),
    )
    id: number,
  ) {
    return this.movieService.findOne(id);
  }

  @Post()
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  // @UseInterceptors(FileInterceptor('movie')) // file upload받을 키값
  // @UseInterceptors(FilesInterceptor('movies')) // 복수 파일
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     {
  //       name: 'movie',
  //       maxCount: 1,
  //     },
  //     {
  //       name: 'poster',
  //       maxCount: 2,
  //     },
  //   ]),
  // ) // 복수 필드는
  @UseInterceptors(
    FileInterceptor('movie', {
      limits: {
        fileSize: 20000000, // 20mb 파일 자체가 업로드 안된다
      },
      fileFilter(req, file, callback) {
        // 필터를 자유롭게 넣어줄 수 있음
        console.log(file);
        if (file.mimetype !== 'video/mp4') {
          return callback(
            new BadRequestException('MP4 타입만 업로드 가능합니다!'),
            false,
          );
        }

        return callback(null, true);
      },
    }),
  ) // 복수 파일
  createMovie(
    @Body() body: CreateMovieDto,
    @Request() req,
    // @UploadedFile() file: Express.Multer.File,
    // @UploadedFiles() files: Express.Multer.File[], // 복수 파일
    @UploadedFile(
      new MovieFilePipe({
        maxSize: 20,
        mimetype: 'video/mp4',
      }),
    )
    movie: Express.Multer.File,
  ) {
    return this.movieService.create(body, req.queryRunner);
  }

  @Patch(':id')
  @RBAC(Role.admin)
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  @RBAC(Role.admin)
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
