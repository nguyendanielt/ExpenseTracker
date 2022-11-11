import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.patch('/:id', categoryController.editCategory);

export default router;