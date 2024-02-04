import Router from 'koa-router';
import { authMiddleware, requireAuth } from './auth/auth.middleware';
import { errorHanlingMiddleware } from './error-handling.middleware';
import * as FormDataController from './formData/formData.controller';

const router = new Router();

router.use(errorHanlingMiddleware);
router.use(authMiddleware);

router.post('/form', FormDataController.create);
router.put('/form/:id', FormDataController.update);
router.get('/form', requireAuth, FormDataController.getAll);
router.get('/form/:id', FormDataController.getById);

export default router;
