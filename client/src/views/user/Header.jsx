import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faMagnifyingGlass, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";
import { logout } from "../../store/slices/user";

function Header() {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLogged } = useSelector((state) => state.user);
    console.log(isLogged);
    
    function toggleBurger() {
        setIsBurgerOpen(!isBurgerOpen);
    }

    function toggleMember() {
        setIsMemberOpen(!isMemberOpen);
    }

    async function userLogout() {
        const response = await fetch("/api/v1/authentication/logout", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            dispatch(logout());
            dispatch(toggleBurger());
            dispatch(toggleMember());
            navigate("/");
        }
    }

    return (

        <header>
            <button onClick={toggleBurger} className="btnBurger" title="Accéder au menu de navigation" aria-label="Accéder au menu de navigation">
                <FontAwesomeIcon className="icon menuBurger" icon={faBars} />    
            </button>

            <NavLink to={"/"} className="logoTitle">
                <img className="logo" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                <span>Cinéma FUN</span>
            </NavLink>

            {isBurgerOpen && (

                <nav id="menu"aria-label="Menu de navigation">
                    <NavLink to={"/"}>accueil</NavLink>
                    {isLogged ? (
                        <NavLink to={"utilisateur/compte"} >votre compte</NavLink>
                    ): (
                        <NavLink to={"/authentification/connexion"}>connexion</NavLink>
                    )}
                    <NavLink to={""}>films à l&rsquo;affiche</NavLink>
                    <NavLink to={""}>infos pratiques</NavLink>
                    <NavLink to={""}>nous contacter</NavLink>
                    <NavLink to={""}>à propos</NavLink>
                    <NavLink to={""}>paramètres</NavLink>
                    {isLogged && (
                        <button onClick={userLogout} className="btnDeco burgerDeco" title="se déconnecter" aria-label="se déconnecter" >déconnexion</button>
                    )}
                </nav>

            ) }

            <div id="wrapIcon">
                <FontAwesomeIcon id="iconGlass" className="icon" icon={faMagnifyingGlass} />

                {isLogged ? (
                    <div>
                        <FontAwesomeIcon onClick={toggleMember} id="iconUser" className="icon" icon={faCircleUser} />
                    
                        {isMemberOpen && (
                            <nav className="menu" aria-label="Menu de connexion">
                                <NavLink to={"utilisateur/compte"} >votre compte</NavLink>
                                <button onClick={userLogout} className="btnDeco" title="se déconnecter" aria-label="se déconnecter" >déconnexion</button>
                            </nav>
                        )}
                    </div>
                    

                ) : (
                    <NavLink to={"authentification/connexion"}>
                        <FontAwesomeIcon id="iconUser" className="icon" icon={faCircleUser} />
                    </NavLink>
                        
                )}

            </div>

        </header>
    );
}


export default Header;
