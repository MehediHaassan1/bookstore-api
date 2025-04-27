import { Router } from 'express';
import { BookRoutes } from '../modules/book/book.routes';
import { AuthorRoutes } from '../modules/author/author.routes';

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
