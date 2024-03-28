import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddCinema() {
    useMenuToggle();
    const navigate = useNavigate();
    const [cine, setCine] = useState("");
    
    const handleChange = (e) => {
        setCine({
            ...cine,
            [e.target.name]: e.target.value
        });
    }


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/cinema", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(cine),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/cinéma");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/cinéma"}>Retour à la liste des cinémas</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création des données d&apos;un cinéma</legend>
                        
                        <label htmlFor="name_cinema">Nom :
                            <input onChange={handleChange} type="text" id="name_cinema" name="name_cinema" value={cine.name_cinema}/>
                        </label>

                        <label htmlFor="email_cine">Email :
                            <input onChange={handleChange} type="email" id="email_cine" name="email_cine" value={cine.email_cine}/>
                        </label>

                        <label htmlFor="address_cine">Adresse :
                            <input onChange={handleChange} type="text" id="address_cine" name="address_cine" value={cine.address_cine}/>
                        </label>

                        <label htmlFor="city">Ville :
                            <input onChange={handleChange} type="text" id="city" name="city" value={cine.city}/>
                        </label>

                        <label htmlFor="phone_cine">Téléphone :
                            <input onChange={handleChange} type="tel" id="phone_cine" name="phone_cine" value={cine.phone_cine}/>
                        </label>

                        <label htmlFor="manager">Manager :
                            <input onChange={handleChange} type="text" id="manager" name="manager" value={cine.manager}/>
                        </label>

                        <label htmlFor="nbr_theater">Nombre de salles :
                            <input onChange={handleChange} type="number" id="nbr_theater" name="nbr_theater" value={cine.nbr_theater}/>
                        </label>

                        <label htmlFor="disabled_access">Accès handicapé :
                            <input onChange={handleChange} type="text" id="disabled_access" name="disabled_access" value={cine.disabled_access}/>
                            {/* <textarea onChange={handleChange} name="disabled_access" id="disabled_access" cols="30" rows="10"></textarea> */}
                        </label>

                        <label htmlFor="infos_cine">Infos :
                        {/* <input onChange={handleChange} type="text" id="infos_cine" name="infos_cine" value={cine.infos_cine} /> */}
                        <textarea onChange={handleChange} name="infos_cine" id="infos_cine" cols="30" rows="10"></textarea>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/cinéma"}>Retour à la liste des cinémas</Link>
        </>
    );
}

export default AddCinema;