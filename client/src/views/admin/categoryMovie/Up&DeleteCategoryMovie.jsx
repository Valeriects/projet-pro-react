
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchCategoryMovies } from "../../../store/slices/categoryMovie";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchMovies } from "../../../store/slices/movie.js";
import { fetchCategory } from "../../../store/slices/category.js";

function UpDeleteCategoryMovie() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [catMovie, setCatMovie] = useState(null);

    const { list } = useSelector((state) => state.categoryMovie);
    const listMovie = useSelector((state) => state.movie.list);
    const { listCategory } = useSelector((state) => state.category);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchCategoryMovies());
        dispatch(fetchMovies());
        dispatch(fetchCategory());
        if (!catMovie) {
            setCatMovie(list.find((catMovie) => catMovie.id === Number(id)));
        }

    }, [dispatch]);

    const handleChange = (e) => {
        setCatMovie({
            ...catMovie,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/category-movie/${catMovie.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/catégorie-film");
              }
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/category-movie/${catMovie.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(catMovie),
            });

            if (res.ok) {
                navigate("/admin/catégorie-film/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!catMovie) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link  className="aBack" to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
            <form className="datas" onSubmit={btnUp}>
                {catMovie && (
                
                    <fieldset>
                        <legend>Données du lien tentre un film et sa catégorie n°{ catMovie?.id }</legend>
                        
                        
                        <label htmlFor="movies_id">Modifier l&apos;id du film: &quot;<span>{catMovie?.title}</span>&quot;
                            <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {listMovie.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        </label>

                        <label htmlFor="categories_id">Modifier l&apos;id de la catégorie: <span>&quot;{catMovie?.name_cat}&quot;</span>
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
                )}
            </form>

            <button onClick={toggleMsgDelete} className="btnDelete" ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer ce lien entre catégorie et film ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link  className="aBack" to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
        </main>
    )
}

export default UpDeleteCategoryMovie;