import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MedicineAttributeDto {
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  mrp: number;

  @IsNotEmpty()
  @IsNumber()
  saleRate: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

export class CreateMedicineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  subcategoryId: string;

  @IsNotEmpty()
  @IsUUID()
  brandId: string;

  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isTopProduct?: boolean;

  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicineAttributeDto)
  attributes: MedicineAttributeDto[];
}
