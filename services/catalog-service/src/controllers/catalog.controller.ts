import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { CatalogService } from '../services/catalog.service';
export class CatalogController {
    constructor(private catalogService: CatalogService) {}
    getProduct = asyncHandler(async (req: Request, res: Response) => {
        const productId = req.body;
        const product = await this.catalogService.getProduct(productId);
        res.status(200).json(product); 
    });
}