import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddCategoryMovie() {
    useMenuToggle();
    const navigate = useNavigate();
    const [catMovie, setCatMovie] = useState("");
    
    const handleChange = (e) => {
        setCatMovie({
            ...catMovie,
            [e.target.name]: e.target.value
        });
    }

    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/category-movie", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(catMovie),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/catégorie-film");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
            <form onSubmit={submitAdd} >
                 <fieldset>
                        <legend>Création des données d&apos;un lien entre une catégorie et un film</legend>
                        
                       
                        <label htmlFor="movies_id">Id du film :
                            <input onChange={handleChange} type="text" id="movies_id" name="movies_id" value={catMovie.movies_id}/>
                        </label>

                        <label htmlFor="categories_id">Id de la catégorie :
                            <input onChange={handleChange} type="text" id="categories_id" name="categories_id" value={catMovie.categories_id}/>
                        </label>
                       
                       
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
        </>
    );
}

export default AddCategoryMovie;