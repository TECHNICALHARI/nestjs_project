import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  controllers: [UploadController],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
