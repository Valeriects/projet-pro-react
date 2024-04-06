import { Routes, Route } from "react-router-dom";

import UserLayout from "../views/layout/UserLayout";
import Home from "../views/user/Home";
import MovieDetail from "../views/user/Movie/MovieDetail.jsx";
import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";
import Dashboard from "../views/user/Dashboard/Dashboard.jsx";
import Cgu from "../views/user/Infos/Cgu.jsx";
import Confidentiality from "../views/user/Infos/Confidentiality.jsx";
import Cgv from "../views/user/Infos/Cgv.jsx";
import Session from "../views/user/Movie/Session.jsx";
import Apropos from "../views/user/Infos/Apropos.jsx";

import requireAuth from "../HOC/ProtectedUserRoutes";
// import "../assets/styles/index.scss";


function UserRoutes() {
    //todo mettre le hoc de protection des routes
     const DashboardWithAuth = requireAuth(Dashboard);

    return (
        <Routes>

            <Route path="/" element={<UserLayout />} >
               
                    <Route path="" index element={<Home />} />
                    
                    <Route path="film/:id" element={<MovieDetail />} />
                
                    <Route path="/film/:id/seance/:idSession" element={<Session />} />

                    <Route path="authentification/connexion" element={<Login />} />

                    <Route path="authentification/inscription" element={<Register />} />

                    {/* route d'un membre vers son dashboard */}
                    {/* <Route path="utilisateur/compte" element={<Dashboard />} /> */}
                    <Route path="utilisateur/compte" element={<DashboardWithAuth />} />

                    <Route path="CGU" element={<Cgu />} />
                    
                    <Route path="CGV" element={<Cgv />} />
                
                    <Route path="a-propos" element={<Apropos />} />
                    
                    <Route path="politique-confidentialité" element={ <Confidentiality/>} />

            </Route>

            {/* todo affiche 404 sur la page /admin */}
            {/* <Route path="*" element={<h1>404</h1>} /> */}

        </Routes>
    );
}

export default UserRoutes;