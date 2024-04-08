import { useState } from "react";
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";
import { logout } from "../../store/slices/user";
import { toggleMenu } from "../../store/slices/menu";

function HeaderAd() {

    const { isMenuOpen } = useSelector((state) => state.menu);
    const [isListOpen, setIsListOpen] = useState(false);
    const { isLogged, user } = useSelector((state) => state.user);
 
    console.log(isLogged);
    console.log("user :",user);
    console.log("userRole :",user.roleUser);

    const dispatch = useDispatch();


    function toggleList() {
        setIsListOpen(!isListOpen);
    }


    function toggleBurger() {
         dispatch(toggleMenu());
    }

    async function userLogout() {
        const response = await fetch("/api/v1/authentication/logout", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            dispatch(logout());
            window.location.href = "/";
        }
    }

    return (

        <header id="adHead">

            <NavLink to={"/admin"} className="logoTitle">
                <img className="logo" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                <span>Cinéma FUN</span>
            </NavLink>
    

            <div id="wrapIcon">
        
                <FontAwesomeIcon onClick={toggleBurger} id="iconUser" className="icon" icon={faBars} />
            
                {isMenuOpen && (
                    <nav className="menu" aria-label="Menu de connexion">
                        <NavLink to={"/admin"} >accueil administrateur</NavLink>

                        <button onClick={toggleList} className="btnList" aria-label="Menu de tableau des données">Tableaux de données</button>

                        {isListOpen && (
                            <>
                                <NavLink to={"membre"}>membres</NavLink>
                                <NavLink to={"role"}>role</NavLink>
                                <NavLink to={"film"}>film</NavLink>
                                <NavLink to={"réservation"}>réservation</NavLink>
                                <NavLink to={"séance"}>séance</NavLink>
                                <NavLink to={"salle"}>salle</NavLink>
                                <NavLink to={"cinéma"}>cinéma</NavLink>
                                <NavLink to={"categorie"}>catégorie</NavLink>
                                <NavLink to={"média"}>média</NavLink>
                                <NavLink to={"média-film"}>média-film</NavLink>
                                <NavLink to={"catégorie-film"}>catégorie-film</NavLink>
                                <NavLink to={"horaire"}>horaire</NavLink>
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
