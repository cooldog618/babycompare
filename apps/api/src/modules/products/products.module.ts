import { Module } from '@nestjs/common';
import { NaverModule } from '../naver/naver.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [NaverModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository]
})
export class ProductsModule {}
