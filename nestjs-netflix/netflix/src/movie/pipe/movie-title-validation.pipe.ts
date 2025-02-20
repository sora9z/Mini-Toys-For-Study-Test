import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MovieTitleValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      return value;
    }
    // 만약 글자 길이가 1보다 작으면 애러 던지기!
    if (value.length <= 1) {
      throw new BadRequestException('영화의 제목은 3자 이상 작성해주세요');
    }
    return value;
  }
}
