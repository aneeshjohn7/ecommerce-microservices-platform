import e from 'express';
import { z } from 'zod';
/**
 * Schema for creating an order. using the below dtos
 * OrderDto, OrderItemDto, ShippingAddressDto
 */
export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().nonempty('Product ID is required'),
      quantity: z.number().int().positive('Quantity must be a positive integer'),
    })
  ),
  shippingAddress: z.object({
    name: z.string().nonempty('Name is required'),
    phone: z.string().nonempty('Phone number is required'),
    address: z.string().nonempty('Address is required'),
    city: z.string().nonempty('City is required'),
    province: z.string().nonempty('Province is required'),
    postalCode: z.string().nonempty('Postal code is required'),
    country: z.string().nonempty('Country is required'),
  }),
}); 


