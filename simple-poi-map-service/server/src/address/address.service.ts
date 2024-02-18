import { Injectable } from '@nestjs/common';
import {
  CustomAddressDto,
  ResponseCreateCustomAddressDto,
  ResponseSearchAddressDto,
  SearchAddressDto,
} from './dto';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { DatabaseService } from 'src/libs/database';
import { entiryArray } from 'src/libs/database/entities';

type TSearchAddressItem = {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: object[];
  x: string;
  y: string;
  distance: number;
};

@Injectable()
export class AddressService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async searchAddress(
    searchAddressDto: SearchAddressDto,
  ): Promise<ResponseSearchAddressDto[]> {
    const url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'lrkhgh6gxw',
        'X-NCP-APIGW-API-KEY': 'KUasHmN0UYkF8A9BiHKBnTr8qABrYLcnWBVfWPLN',
      },
      params: { query: searchAddressDto.query },
    };

    let result: ResponseSearchAddressDto[];

    try {
      const { data } = await this.httpService.axiosRef.request(config);
      const searchResultsFromThirdParty: TSearchAddressItem[] = data.addresses;

      result = searchResultsFromThirdParty.map((address) => {
        const transformedAddress: ResponseSearchAddressDto = {
          originalLandAddress: address.jibunAddress,
          originalRoadAddress: address.roadAddress,
          point: {
            longitude: Number(address.x),
            latitude: Number(address.y),
          },
        };
        return transformedAddress;
      });

      return result;
    } catch (err) {
      throw err;
    }
  }

  async createCustomAddress(
    createCustomAddressDto: CustomAddressDto,
  ): Promise<ResponseCreateCustomAddressDto> {
    const index = 'address'; // index들을 어떻게 관리할지는 고민이 필요. 일단은 이렇게 하자 토이 트로젝트 프로토니까..
    const body = {
      ...createCustomAddressDto,
      point: {
        lat: createCustomAddressDto.point.latitude,
        lon: createCustomAddressDto.point.longitude,
      },
    };
    const creationResponse = await this.databaseService.createDocument(
      index,
      body,
    );

    // Retrieve the created document
    if (creationResponse.result === 'created') {
      const documentResponse = await this.databaseService.getAddressByIndex(
        index,
        creationResponse._id,
      );
      return documentResponse._source as ResponseCreateCustomAddressDto;
    }

    throw new Error('Failed to create a custom address');
  }

  async getAllCustomAddressByUserId(
    userId: number,
  ): Promise<ResponseCreateCustomAddressDto[]> {
    const index = 'address';
    const result = await this.databaseService.getCustomAddressByUserId(
      index,
      userId,
    );

    console.log(result);
    return result.hits.hits.map(
      (hit) => hit._source as ResponseCreateCustomAddressDto,
    );
  }
}
