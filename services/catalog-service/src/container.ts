import prisma from './config/database';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { CatalogRepository } from './repositories/catalog.repository';


// Repositories
const catalogRepository = new CatalogRepository(prisma);


// Services
const catalogService = new CatalogService(catalogRepository);

// Controllers
export const catalogController = new CatalogController(catalogService);