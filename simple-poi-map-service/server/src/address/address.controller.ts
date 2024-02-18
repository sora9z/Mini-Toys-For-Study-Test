import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CustomAddressDto,
  ResponseCreateCustomAddressDto,
  ResponseSearchAddressDto,
  SearchAddressDto,
} from './dto';
import { AddressService } from './address.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('address API')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/search')
  @ApiOperation({
    summary: '주소(구 주소, 도로명주소)와 국가관심지점(명칭/장소) 검색',
  })
  async searchAddress(
    @Query() searchAddressDto: SearchAddressDto,
  ): Promise<ResponseSearchAddressDto[]> {
    const searchAddress =
      await this.addressService.searchAddress(searchAddressDto);
    return searchAddress;
  }

  @Post('/custom')
  @ApiOperation({
    summary: '사용자 정의 주소 저장',
  })
  async createCustomAddress(
    @Body() createCustomAddressDto: CustomAddressDto,
  ): Promise<ResponseCreateCustomAddressDto> {
    const customAddressResult = await this.addressService.createCustomAddress(
      createCustomAddressDto,
    );
    return customAddressResult;
  }

  @Get('/custom/:userId')
  @ApiOperation({
    summary: '사용자 정의 주소 조회',
  })
  async getAllCustomAddress(
    @Param('userId') userId: string,
  ): Promise<ResponseCreateCustomAddressDto[]> {
    const result = await this.addressService.getAllCustomAddressByUserId(
      Number(userId),
    );
    return result;
  }
}
