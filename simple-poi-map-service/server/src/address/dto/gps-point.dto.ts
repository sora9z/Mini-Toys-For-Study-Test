import { Type } from "@nestjs/class-transformer";
import { IsNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GpsPointDto {
    @ApiProperty({
        example: 127.034456,
        description: '경도',
        required: true,
    })
    @IsNumber()
    @Type(() => Number)
    longitude: number;

    @ApiProperty({
        example: 37.506833,
        description: '위도',
        required: true,
    })
    @IsNumber()
    @Type(() => Number)
    latitude: number;
}