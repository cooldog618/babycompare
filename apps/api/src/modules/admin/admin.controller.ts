import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { parseListQuery } from './admin.dto';
import { AdminGuard } from './admin.guard';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('summary') getSummary() { return this.adminService.getSummary(); }
  @Get('products') listProducts(@Query() query: Record<string, string | undefined>) { return this.adminService.listProducts(parseListQuery(query)); }
  @Patch('products/:id') updateProduct(@Param('id') id: string, @Body() body: Record<string, unknown>) { return this.adminService.updateProduct(id, body); }
  @Patch('products/:id/visibility') updateVisibility(@Param('id') id: string, @Body() body: { isVisible: boolean }) { return this.adminService.updateVisibility(id, body.isVisible); }
}
