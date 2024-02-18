import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class SearchAddressDto {
  query: string;
}

export class CustomAddressDto extends AddressDto {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  userId: number;

  @ApiProperty({
    example: '집',
    description: '주소 별칭',
  })
  name: string;

  @ApiProperty({
    example: '집',
    description: '메모',
  })
  memo: string;
}

export class ResponseCreateCustomAddressDto extends CustomAddressDto {}

export class ResponseSearchAddressDto extends AddressDto {}
