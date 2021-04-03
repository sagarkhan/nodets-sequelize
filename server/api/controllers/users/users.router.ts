import express from 'express';
import UsersController from './users.controller';
import { controllerWrapper } from '../../middlewares/response.handler';
import Auth from '../../middlewares/auth.handler';

const UsersRouter = express.Router();

UsersRouter.get('/', Auth, controllerWrapper(UsersController.all));
UsersRouter.get('/:userId', Auth, controllerWrapper(UsersController.get));
UsersRouter.post('/', Auth, controllerWrapper(UsersController.create));

export default UsersRouter;
