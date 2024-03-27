import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddRole() {
    useMenuToggle();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/role", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(role),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/role");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/role"}>Retour à la liste des rôles</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création du rôle</legend>
                     

                        <label htmlFor="name_role">Nom :
                            <input onChange={(e) => setRole({...role, name_role: e.target.value})} type="text" id="name_role" name="name_role"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/role"}>Retour à la liste des rôles</Link>
        </>
    );
}

export default AddRole;