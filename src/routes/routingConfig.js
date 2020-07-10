import Home from '../pages/home';
import Profile from '../pages/profile';
import Error404 from '../pages/error404';

export default [
    {
        path: '/',
        exact: true,
        page: Home
    },
    {
        path: '/perfil/:id',
        exact: true,
        page: Profile
    },
    {
        path: '*',
        page: Error404
    }
]