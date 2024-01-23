import React  from "react"; 
import { Route,Navigate } from "react-router-dom"; 
function ProtectedRoute({ isAuth: isAuth, Component: Component, ...rest }:any) {
return (
<Route
{...rest}
  render = {(props:any) => {
if (isAuth) {
return <Component />;
} else {
return (
<Navigate to={{ pathname: "/"}} />
);
}
}}
/>
);
}
export default ProtectedRoute;



// import {Navigate, Outlet} from "react-router-dom";
// import Home from "./pages/Home";
// const useAuth = () => {
// const user = { loggedIn: false };
// return user && user.loggedIn;
// };
// const ProtectedRoutes = () => {
// const isAuth = useAuth();
// return isAuth? <Outlet /> : <Navigate to="/"/>;
// };
// export default ProtectedRoutes;