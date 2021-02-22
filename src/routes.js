import Dashboard from './containers/Dashboard/Dashboard'
import Login from "./pages/Login";


const authProtectedRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Dashboard },
]


const publicRoutes = [
    { path: '/login', component: Login }
]


export { authProtectedRoutes, publicRoutes }
