import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";


function Footer() {
    return (
        <footer>

            <FontAwesomeIcon className="icon" icon={faAnglesLeft} />
            
            <nav>

                <NavLink to="">nous contacter</NavLink>
                <NavLink to="">à propos</NavLink>
                <NavLink to="">CGV</NavLink>
                <NavLink to="">CGU</NavLink>
                <NavLink to="">Politique de confidentialité</NavLink>
            </nav>
          

            <FontAwesomeIcon className="icon" icon={faGear} />

        </footer>
    )
}

export default Footer;