import catalogClient from "../clients/catalog.client";

export class CatalogService {
  async getProduct(productId: string) {
    const response = await catalogClient.get(
      `/api/v1/products/${productId}`
    );

    return response.data;
  }

  async getProducts(productIds: string[]) {
    return Promise.all(
      productIds.map((id) => this.getProduct(id))
    );
  }
}