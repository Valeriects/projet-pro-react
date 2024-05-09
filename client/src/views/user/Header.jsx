import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faMagnifyingGlass, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../store/slices/user";
import { fetchMovies } from "../../store/slices/movie";
import { toggleMenu, toggleMenuMember, closeMenu } from "../../store/slices/menu";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isMenuOpen, isUserOpen } = useSelector((state) => state.menu);
    const { isLogged} = useSelector((state) => state.user);
    const { list } = useSelector((state) => state.movie);
    
    const [msg, setMsg] = useState("");
    const [useSearch, setUseSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const ref = useRef(null);
    
    useEffect(() => {
        if (!list.length) {
            dispatch(fetchMovies());
        }
    }, []);
    
    function toggleBurger() {
        dispatch(toggleMenu());
        setIsSearching(false);//quand le menu burger s'ouvre, la barre de recherche se ferme
    }
    
    function toggleMember() {
        dispatch(toggleMenuMember());
        setIsSearching(false);
    }
    
    async function userLogout() {
        const response = await fetch("/api/v1/authentication/logout", {
            method: "GET",
            credentials: "include"
        })
        
        if (response.ok) {
            dispatch(logout());
            dispatch(closeMenu());
            navigate("/");
        }
    }

    function toggleSearch() {
        if (isSearching) {
            setIsSearching(false);
            setUseSearch([]); // Effacez les résultats de recherche
            setMsg(""); // Effacez le message d'erreur
        } else {
            setIsSearching(true); // Sinon, activez la recherche
            dispatch(closeMenu()); // quand la barre de recherche s'ouvre, les menus se ferment
        }
    }

    function searchMovie(e) {
        const valueInput = e.target.value.toLowerCase();

        if (valueInput.length > 0) { 
            setIsSearching(true);
        } else if (valueInput.length === 0) {
            setIsSearching(false);
            setUseSearch([]);
            setMsg(""); 
            return;
        }

        const useSearch = list.filter((item) => {
            return item.title.toLowerCase().includes(valueInput);
        });

        if (!useSearch.length) {
            setMsg("Aucun résultat");
            setUseSearch([]);
            return;
        } 
            setMsg("");
            setUseSearch([...useSearch]);
    }

    function handleSearchClick() {
        setIsSearching(false);
        ref.current.value = "";
    }

    const ancrage = () => {
        window.history.replaceState(null, '', '/#contact');

        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });dispatch(toggleMenuMember());
    }

    return (        
        <header>
            <button onClick={toggleBurger} className={`btnBurger ${isMenuOpen ? "open" : ""}`} title="Accéder au menu de navigation" aria-label="Accéder au menu de navigation">
                <FontAwesomeIcon className="icon menuBurger" icon={faBars} />    
            </button>

            <NavLink to={"/"} className="logoTitle">
                <img className="logo" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                <span>Cinéma FUN</span>
            </NavLink>


            <nav id="menu" className={isMenuOpen ? 'open' : ''} aria-label="Menu de navigation">
                <NavLink to={"/"}>accueil</NavLink>
                {isLogged ? (
                    <NavLink to={"utilisateur/compte"} >votre compte</NavLink>
                ): (
                    <NavLink to={"authentification/connexion"}>connexion</NavLink>
                )}
                <NavLink to={"a-propos"}>infos pratiques</NavLink>
                <NavLink to="#contact" onClick={ancrage}>contact</NavLink>
                
                {isLogged && (
                    <button onClick={userLogout} className="btnDeco burgerDeco" title="se déconnecter" aria-label="se déconnecter" >déconnexion</button>
                )}
            </nav>


            {/* début input de recherche */}
            {isSearching && (
                <div className="divSearch">

                    <input ref={ref} className="inputSearch" type="search" onChange={searchMovie} placeholder="Rechercher un film" />
                    
                        <div className="searchList">
                            <ul>
                                {msg && !useSearch.length && <li className="msgSearch">{msg}</li>}
                                {isSearching && useSearch &&
                                useSearch.map((item) => (
                                    <li key={item.id} onClick={handleSearchClick}>
                                        <Link to={`/film/${item.id}`}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                </div>
            )} 
            {/* Fin input recherche */}

            <div id="wrapIcon">
                <FontAwesomeIcon onClick={toggleSearch} id="iconGlass" className="icon" icon={faMagnifyingGlass} />

                {isLogged ? (
                    <div>
                        <FontAwesomeIcon onClick={toggleMember} id="iconUser" className="icon" icon={faCircleUser} />
                    
                        {isUserOpen && (
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
