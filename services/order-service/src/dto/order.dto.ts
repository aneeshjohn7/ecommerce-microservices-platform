/** Data Transfer Object for an order item */
export interface OrderItemDto {
  productId: string;
  quantity: number;
}

/** Data Transfer Object for a shipping address */
export interface ShippingAddressDto {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}
/**
 * Data Transfer Object for an order.
 */
export interface OrderDto {
  items: OrderItemDto[];
}