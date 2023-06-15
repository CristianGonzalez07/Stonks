import Login from "./login";
import Home from "./home";

const publicRoutes = [
    { path: '/login', title: "Login", component: <Login /> },
]

const protectedRoutes = [
    { path: '/', title: "HOME", component: <Home/> },
]

export { publicRoutes, protectedRoutes };