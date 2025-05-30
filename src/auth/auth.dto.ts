import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class RegisterLoginDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  name: string;
}

export class VerifyOtpDto {
  @IsPhoneNumber('IN')
  phone: string;
  @IsString()
  code?: string;
}
