import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  phone: string;
  
  @IsString()
  @MinLength(3)
  @Matches(/^[A-Za-z\s.'-]+$/, {
    message:
      'Name can only contain letters, spaces, periods, hyphens, and apostrophes',
  })
  name: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
