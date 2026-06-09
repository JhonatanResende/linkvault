import { Router } from 'express';
import {
  getLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
} from '../controllers/linkController';

const router = Router();

// Define quem atende cada caminho
router.get('/', getLinks);
router.get('/:id', getLinkById);
router.post('/', createLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

export default router;