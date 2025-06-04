import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('medicine')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedicineImage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.cloudinaryService.uploadImage(file, 'medicines');
    return { url };
  }

  @Post('prescription')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPrescriptionImage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.cloudinaryService.uploadImage(file, 'prescriptions');
    return { url };
  }
}
