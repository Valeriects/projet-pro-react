import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";
import { logout } from "../../store/slices/user";

function HeaderAd() {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);

    // const [listUsersOpen, setListUsersOpen] = useState(false);
    // function toggleListUsers() {
    //     setListUsersOpen(!listUsersOpen);
    // }

    const dispatch = useDispatch();
    const navigate = useNavigate();


    function toggleList() {
        setIsListOpen(!isListOpen);
    }


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
                        <NavLink to={"/admin"} >accueil administrateur</NavLink>

                        <button onClick={toggleList} aria-label="Menu de tableau des données">tableaux de données</button>

                        {isListOpen && (
                            <>
                                <NavLink to={"membre"}>membres</NavLink>
                                <NavLink to="">role</NavLink>
                                <NavLink to="">film</NavLink>
                                <NavLink to="">réservation</NavLink>
                                <NavLink to="">séance</NavLink>
                                <NavLink to="">salle</NavLink>
                                <NavLink to="">cinéma</NavLink>
                                <NavLink to="">catégorie</NavLink>
                                <NavLink to="">média</NavLink>
                            </>
                        )}

                        
                        <button onClick={userLogout} className="btnDeco" title="se déconnecter" aria-label="se déconnecter" >déconnexion</button>
                        
                    </nav>
                )}

            </div>

        </header>
    );
}


export default HeaderAd;
