import Login from "./login";
import Home from "./home";
import StockDetails from "./stockDetails";

const publicRoutes = [
    { path: '/login', component: <Login /> },
]

const protectedRoutes = [
    { path: '/', component: <Home/> },
    { path: '/stock-details/:stockSymbol', component: <StockDetails/> },
]

export { publicRoutes, protectedRoutes };