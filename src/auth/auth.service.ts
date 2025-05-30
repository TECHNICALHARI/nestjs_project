import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Twilio } from 'twilio';
import { Role } from 'src/common/enums/role.enum';
import { RegisterLoginDto, VerifyOtpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  private twilio = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );
  private twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  private generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  private async sendOtpToPhone(phone: string, code: string) {
    await this.twilio.messages.create({
      body: `Your OTP code is ${code}`,
      to: phone,
      from: this.twilioPhone,
    });
  }
  private async cleanupExpiredOtps(phone: string) {
    await this.prisma.otp.deleteMany({
      where: { phone, expiresAt: { lt: new Date() } },
    });
  }
  async requestOtp(dto: RegisterLoginDto) {
    const { phone, name, email } = dto;
    if (!phone) throw new BadRequestException('Phone number is required');

    await this.cleanupExpiredOtps(phone);
    const code = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await this.prisma.otp.create({
      data: {
        phone,
        code,
        expiresAt,
        verified: false,
        name,
        email,
      },
    });

    await this.sendOtpToPhone(phone, code);
    return 'OTP sent successfully';
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const { phone, code } = dto;
    if (!phone || !code) {
      throw new BadRequestException('Phone and OTP code are required');
    }

    await this.cleanupExpiredOtps(phone);
    const otp = await this.prisma.otp.findFirst({
      where: { phone, code, verified: false, expiresAt: { gte: new Date() } },
    });
    if (!otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.prisma.otp.update({
      where: { id: otp.id },
      data: { verified: true },
    });
    if (!otp.phone) {
      throw new BadRequestException('Phone number is missing in OTP record');
    }
    let user = await this.prisma.user.findUnique({
      where: { phone: otp.phone },
    });

    if (!user) {
      if (!otp.name) {
        throw new BadRequestException('Name is required for new users');
      }

      user = await this.prisma.user.create({
        data: {
          name: otp.name,
          email: otp.email,
          phone: otp.phone,
          role: Role.USER,
        },
      });

      const token = this.jwtService.sign({
        sub: user.id,
        role: user.role,
      });
      return {
        message: 'Authentication successful',
        data: {
          token,
          user,
        },
      };
    }
  }
}
