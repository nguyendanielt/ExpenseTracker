import { Router } from 'express';
import passport from 'passport';
import * as expenseController from '../controllers/expenseController.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), expenseController.index);
router.post('/', expenseController.createExpense);
router.delete('/:id', expenseController.deleteExpense);
router.patch('/:id', expenseController.updateExpense);

export default router;