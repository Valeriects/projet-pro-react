import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchMovies } from "../../../store/slices/movie.js";
import {fetchCategory} from "../../../store/slices/category.js";


function AddCategoryMovie() {
    useMenuToggle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [catMovie, setCatMovie] = useState("");

    const { list } = useSelector((state) => state.movie);
    const { listCategory } = useSelector((state) => state.category);
     
    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchCategory());
     }, []);
    
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
                navigate("/admin/catégorie-film");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link className="aBack" to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
            <form onSubmit={submitAdd} >
                 <fieldset>
                        <legend>Création des données d&apos;un lien entre une catégorie et un film</legend>
                        
                       
                        <label htmlFor="movies_id">Id du film :
                            <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {list.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        
                        </label>

                        <label htmlFor="categories_id">Id de la catégorie :
                        
                            <select onChange={handleChange} name="categories_id" id="categories_id">
                                <option value="">Choisir la catégorie</option>
                            
                                {listCategory.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.name_cat}</option>
                                    
                                ))}
                            </select>
                        </label>
                       
                       
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link className="aBack" to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
        </>
    );
}

export default AddCategoryMovie;