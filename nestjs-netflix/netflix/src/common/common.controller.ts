import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RBAC } from 'src/auth/decorator/rbac.decorator';
import { Role } from 'src/user/entity/user.entity';

@Controller('common')
export class CommonController {
  @Post('video')
  @RBAC(Role.admin)
  @UseInterceptors(
    FileInterceptor('video', {
      limits: {
        fileSize: 20000000, // 20mb 파일 자체가 업로드 안된다
      },
      fileFilter(req, file, callback) {
        // 필터를 자유롭게 넣어줄 수 있음
        if (file.mimetype !== 'video/mp4') {
          return callback(
            new BadRequestException('MP4 타입만 업로드 가능합니다!'),
            false,
          );
        }
        return callback(null, true);
      },
    }),
  )
  async createVideo(@UploadedFile() video: Express.Multer.File) {
    console.log(video);
    return { fileName: video.filename };
  }
}

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
