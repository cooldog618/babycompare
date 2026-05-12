import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { NaverModule } from './modules/naver/naver.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [PrismaModule, HealthModule, NaverModule, ProductsModule, AdminModule]
})
export class AppModule {}
