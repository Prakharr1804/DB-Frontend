import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Profile from './features/auth/pages/Profile';


export const router = createBrowserRouter([
    {
        path : "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/',
        element: <main>
            <h1>Home</h1>
        </main>
    }
]);