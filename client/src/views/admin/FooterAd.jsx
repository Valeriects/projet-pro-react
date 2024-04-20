
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";


function FooterAd() {

    function backPage() {
        window.history.back();  
    }

    return (
        <footer id="adFoot">

            <FontAwesomeIcon className="icon" icon={faAnglesLeft} onClick={backPage} />        

            <FontAwesomeIcon className="icon" icon={faGear} />

        </footer>
    )
}

export default FooterAd;