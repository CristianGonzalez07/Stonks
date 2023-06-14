import Login from "./login";


const publicRoutes = [
    { path: '/login', title: "Login", component: <Login /> },
]

const protectedRoutes = [
    { path: '/login', title: "Login", component: <Login /> },
]

export { publicRoutes, protectedRoutes };