import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";
import { logout } from "../../store/slices/user";

function HeaderAd() {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listUser } = useSelector((state) => state.user);
    console.log(listUser);

    function toggleBurger() {
        setIsBurgerOpen(!isBurgerOpen);
    }

    async function userLogout() {
        const response = await fetch("/api/v1/authentication/logout", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            dispatch(logout());
            dispatch(toggleBurger());
            navigate("/");
        }
    }

    return (

        <header id="adHead">

            <NavLink to={"/"} className="logoTitle">
                <img className="logo" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                <span>Cinéma FUN</span>
            </NavLink>
    

            <div id="wrapIcon">
        
                <FontAwesomeIcon onClick={toggleBurger} id="iconUser" className="icon" icon={faBars} />
            
                {isBurgerOpen && (
                    <nav className="menu" aria-label="Menu de connexion">
                        <NavLink to={"/admin"} >accueil</NavLink>

                        <button onClick={userLogout} className="btnDeco" title="se déconnecter" aria-label="se déconnecter" >déconnexion</button>
                    </nav>
                )}

            </div>

        </header>
    );
}


export default HeaderAd;
