import { Router } from 'express';
import { BookRoutes } from './book.routes';
import { AuthorRoutes } from './author.routes';

const router = Router();

const routeConfig = [
    {
        path: '/book',
        routes: BookRoutes,
    },
    {
        path: '/authors',
        routes: AuthorRoutes,
    },
];

routeConfig.forEach((route) => {
    router.use(route.path, route.routes);
});

export default router;
