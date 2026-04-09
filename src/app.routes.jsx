import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from './features/auth/components/Protected';
import Admin from './features/admin/pages/Admin';


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
        path: "/",
        element: <Protected><Admin /></Protected>
    },
    {
        path: '/admin',
        element: <Protected><main><h1>admin</h1></main></Protected>
    }
]);