import { Routes, Route } from "react-router-dom";

import UserLayout from "../views/layout/UserLayout";
import Home from "../views/user/Home";
import MovieDetail from "../views/user/Movie/MovieDetail.jsx";
import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";
import Dashboard from "../views/user/Dashboard/Dashboard.jsx";
// import "../assets/styles/index.scss";


function UserRoutes() {
    //todo mettre le hoc de protection des routes

    return (
        <Routes>

            <Route path="/" element={<UserLayout />} >
                
                <Route>
                    <Route index element={<Home />} />
                    
                    <Route path="film/:id" element={<MovieDetail />} />

                    <Route path="authentification/connexion" element={<Login />} />

                    <Route path="authentification/inscription" element={<Register />} />

                    {/* route d'un membre vers son dashboard */}
                    <Route path="utilisateur/compte" element={<Dashboard />} />
                    
                </Route>

            </Route>

            {/* todo affiche 404 sur la page /admin */}
            {/* <Route path="*" element={<h1>404</h1>} /> */}

        </Routes>
    );
}

export default UserRoutes;