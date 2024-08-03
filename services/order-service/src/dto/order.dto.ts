export interface OrderItemDto {
  productId: string;
  quantity: number;
}

export interface ShippingAddressDto {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrderDto {
  customerId: string;
  items: OrderItemDto[];
  shippingAddress: ShippingAddressDto;
}