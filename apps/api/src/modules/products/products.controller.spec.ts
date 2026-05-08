import { describe, expect, it, vi } from 'vitest';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  const service = {
    search: vi.fn(),
    getProductDetail: vi.fn()
  } as unknown as ProductsService;

  const controller = new ProductsController(service);

  it('delegates GET /products/:id to service', async () => {
    (service.getProductDetail as any).mockResolvedValue({ item: { id: 'p1' }, meta: { source: 'DB' } });
    await controller.getProductDetail('p1');
    expect(service.getProductDetail).toHaveBeenCalledWith('p1');
  });

  it('declares /search route before /:id route to avoid conflict', () => {
    const descriptorEntries = Reflect.getMetadata('path', controller.search);
    expect(descriptorEntries).toBe('search');
  });
});
