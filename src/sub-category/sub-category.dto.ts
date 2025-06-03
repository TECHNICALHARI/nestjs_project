import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class createSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

export class updateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
