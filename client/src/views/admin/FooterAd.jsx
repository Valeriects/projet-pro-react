
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";


function FooterAd() {
    return (
        <footer id="adFoot">

            <FontAwesomeIcon className="icon" icon={faAnglesLeft} />        

            <FontAwesomeIcon className="icon" icon={faGear} />

        </footer>
    )
}

export default FooterAd;