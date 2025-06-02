import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterLoginDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  @IsString()
  @MinLength(3)
  @Matches(/^[A-Za-z\s.'-]+$/, {
    message: 'Name can only contain letters, spaces, periods, hyphens, and apostrophes',
  })
  name: string;
}

export class VerifyOtpDto {
  @IsPhoneNumber('IN')
  phone: string;
  @IsString()
  code?: string;
}
