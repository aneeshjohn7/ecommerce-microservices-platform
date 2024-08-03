import { CatalogRepository } from '../repositories/catalog.repository';
export class CatalogService {
  constructor(private catalogRepository: CatalogRepository) {}
  async getProduct(productId: string) {
    const product = await this.catalogRepository.getProduct(productId);
    return product;
  }
}
