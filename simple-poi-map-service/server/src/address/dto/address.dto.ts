import { ApiProperty } from '@nestjs/swagger';
import { GpsPointDto } from './gps-point.dto';

export class AddressDto {
  @ApiProperty({
    example: '서울특별시 강남구 논현동 218-11',
    description: '지번 주소',
  })
  originalLandAddress: string;

  @ApiProperty({
    example: '서울특별시 강남구 언주로 631',
    description: '도로명 주소',
  })
  originalRoadAddress: string;

  @ApiProperty({
    example: '{"longitude":97.12321332,"latitude":137.00000123}',
    description: '검색 기준 중심 좌표',
    type: 'object',
  })
  point?: GpsPointDto;
}
