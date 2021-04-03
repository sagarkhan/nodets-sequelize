import { Application } from 'express';
import UsersRouter from './api/controllers/users/users.router';
import environments from './common/env';

export default function initRoutes(app: Application): void {
  const routes = [
    {
      path: '/v1/users',
      router: UsersRouter,
    },
  ];
  routes.forEach(item => {
    app.use(`${environments.BASE_URL}${item.path}`, item.router);
  });
}
