import { IsString } from 'class-validator';

export class createBrandDto {
  @IsString()
  name: string;
}
