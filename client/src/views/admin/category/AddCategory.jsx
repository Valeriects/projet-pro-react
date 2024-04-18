import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";
function AddCategory() {
    useMenuToggle();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name_cat: "" });

    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/category", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });

            if (res.ok) {
                navigate("/admin/categorie");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link className="aBack" to={"/admin/categorie"}>Retour à la liste des catégories</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création de la catégorie</legend>
                     

                        <label htmlFor="name_cat">Nom :
                            <input onChange={(e) => setCategory({...category, name_cat: e.target.value})} type="text" id="name_cat" name="name_cat"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link className="aBack" to={"/admin/categorie"}>Retour à la liste des catégories</Link>
        </>
    );
}

export default AddCategory;