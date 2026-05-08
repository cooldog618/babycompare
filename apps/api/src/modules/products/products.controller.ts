import { Controller, Get, Query } from '@nestjs/common';
import { type SearchProductsResponse } from '@babycompare/shared';
import { parseSearchProductsQuery } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  search(@Query() query: Record<string, unknown>): Promise<SearchProductsResponse> {
    return this.productsService.search(parseSearchProductsQuery(query));
  }
}
