/*
  Warnings:

  - You are about to drop the column `discount` on the `MedicineAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `MedicineAttribute` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `MedicineAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleRate` to the `MedicineAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicineAttribute" DROP COLUMN "discount",
DROP COLUMN "price",
ADD COLUMN     "mrp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "saleRate" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
