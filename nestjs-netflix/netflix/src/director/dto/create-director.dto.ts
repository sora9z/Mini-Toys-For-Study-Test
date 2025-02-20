import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date; // 생년월일

  @IsNotEmpty()
  nationality: string;
}
