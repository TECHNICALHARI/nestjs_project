import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MyMedicineModule } from './my-medicine/my-medicine.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PrismaModule } from './prisma/prisma.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, MedicineModule, CartModule, WishlistModule, OrderModule, PrescriptionModule, MyMedicineModule, BrandModule, CategoryModule, InvoiceModule, SubCategoryModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
