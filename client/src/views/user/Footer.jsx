import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSquareTwitter, faSquareFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import logoCinema from "../../../public/assets/images/logo-cinema_web02.png";





function Footer() {
 

    return (
        <footer>

            <article>
                <h3 id="contact">Contact</h3>

                <address>
                     <NavLink to={"/"}>
                        <img className="logoFooter" src={logoCinema} alt="Logo couleur du cinéma FUN" />
                        <strong>Cinéma FUN</strong>
                    </NavLink>
                    {/* <p><strong>Cinéma Fun</strong></p> */}
                    <p>Adresse: <strong>330 Avenue des Cyprès</strong></p>
                    <p><strong>13190 Aix en Provence</strong></p>
                    <p>Tél: +33<strong>429496795</strong></p>
                    <p>Mail: <strong>cinema.fun@gmail.fr</strong></p>
                </address>
            </article>


            <nav>
                <h3>Infos</h3>

                <NavLink to="">à propos</NavLink>
                <NavLink to="CGU">CGU</NavLink>
                <NavLink to="CGV">CGV</NavLink>
                <NavLink to="politique-confidentialité">Politique de confidentialité</NavLink>
            </nav>

            <div>
                <h3>Réseaux sociaux</h3>

                <FontAwesomeIcon className="icon" icon={faSquareTwitter} />
                <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
                <FontAwesomeIcon className="icon" icon={faSquareFacebook} />
            </div>
            
        </footer>
    );
}

export default Footer;