import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSquareTwitter, faSquareFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";


function Footer() {
    function handleClickTop() {
        window.scrollTo(0, 0);
    }

    return (
        <footer>

            <article id="contact">
                <h3>Contact</h3>

                <address>
                     <NavLink to={"/"} onClick={handleClickTop}>
                        <img className="logoFooter" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                        <strong>Cinéma FUN</strong>
                    </NavLink>
                    <p>Adresse: <strong>330 Avenue des Cyprès</strong></p>
                    <p><strong>13190 Aix en Provence</strong></p>
                    <p>Tél: +33<strong>429496795</strong></p>
                    <p>Mail: <strong>cinema.fun@gmail.fr</strong></p>
                </address>
            </article>


            <nav>
                <h3>Infos</h3>

                <NavLink to="a-propos" onClick={handleClickTop}>à propos</NavLink>
                <NavLink to="CGU" onClick={handleClickTop}>CGU</NavLink>
                <NavLink to="CGV" onClick={handleClickTop}>CGV</NavLink>
                <NavLink to="politique-confidentialité" onClick={handleClickTop}>Politique de confidentialité</NavLink>
            </nav>

            <div>
                <h3>Réseaux sociaux</h3>
                <Link to="https://twitter.com/">
                    <FontAwesomeIcon className="icon" icon={faSquareTwitter} />
                </Link>
                <Link to="https://www.instagram.com">
                    <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
                </Link>
                <Link to="https://www.facebook.com/">
                    <FontAwesomeIcon className="icon" icon={faSquareFacebook} />
                </Link>
             
            </div>
            
        </footer>
    );
}

export default Footer;